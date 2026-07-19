import { db } from './index';
import { agentMemories } from './schema';
import { embed } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import { cosineDistance, desc, gt, sql } from 'drizzle-orm';

/**
 * MemoryService.ts
 * Otonom Fabrika'nın Kurumsal Hafıza (RAG) Katmanı.
 * Vercel AI SDK ve PGVector kullanarak kodları matematiksel vektörlere çevirip saklar
 * ve ajanlar kod yazmadan önce "Benzerlik (Cosine Similarity)" araması yaparak geçmişi hatırlar.
 */

// Yerel embedding modeli için OpenAI uyumlu (Local vLLM/TabbyAPI) istemci
// (Gerçek hayatta bu port, Nomic-Embed-Text gibi bir modeli barındıracak)
// ✅ DÜZELTME: Port 8000 vLLM tarafından kullanılıyor. Embedding servisi için ayrı port (8001).
const localOpenAI = createOpenAI({
  baseURL: 'http://127.0.0.1:8001/v1',
  apiKey: 'sk-local-dev',
});

// Varsayılan Embedding modeli (VLLM'de çalışan herhangi bir embedding modeli)
const embeddingModel = localOpenAI.embedding('nomic-embed-text');

export class MemoryService {
  /**
   * Yeni bir bilgiyi veya onaylanmış kodu "Hafızaya" kaydeder.
   */
  static async saveMemory(content: string, metadata: Record<string, any> = {}) {
    console.log(`[RAG] Hafızaya yeni bilgi işleniyor... Boyut: ${content.length} karakter`);
    
    // 1. İçeriği matematiksel vektöre (Embedding) çevir
    const { embedding } = await embed({
      model: embeddingModel,
      value: content,
    });

    // 2. PGVector Veritabanına kaydet
    const [inserted] = await db.insert(agentMemories).values({
      content,
      embedding,
      metadata,
    }).returning();

    return inserted;
  }

  /**
   * Ajanların yeni bir koda başlamadan önce "Patron eskiden bunu nasıl istemişti?"
   * diye RAG yapmasını sağlayan arama motoru (Hybrid Vector Search).
   */
  static async retrieveMemory(query: string, limit: number = 3) {
    // 1. Ajanın sorgusunu vektöre çevir
    const { embedding } = await embed({
      model: embeddingModel,
      value: query,
    });

    // 2. Drizzle ORM ve Cosine Similarity ile veritabanında en yakın eşleşmeleri bul
    const similarity = sql<number>`1 - (${cosineDistance(agentMemories.embedding, embedding)})`;
    
    const results = await db
      .select({
        id: agentMemories.id,
        content: agentMemories.content,
        metadata: agentMemories.metadata,
        similarity,
      })
      .from(agentMemories)
      // Sadece benzerlik oranı %60'ın üzerinde olan (mantıklı) geçmiş hafızaları getir
      .where(gt(similarity, 0.6))
      .orderBy(desc(similarity))
      .limit(limit);

    return results;
  }
}
