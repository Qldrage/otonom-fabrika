import { db } from '../db';
import { workflows } from '../db/schema';
import { eq } from 'drizzle-orm';
import { LLMRouterActor } from '../llm/LLMRouterActor';
import { fileTools } from '../tools/FileTools';
import { generateText, streamText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import { ModelOffloadManager } from '../llm/ModelOffloadManager';

export class WorkflowOrchestrator {
  private vllmProvider = createOpenAI({
    baseURL: process.env.VLLM_BASE_URL ?? 'http://localhost:8000/v1',
    apiKey: 'sk-local',
  });

  private tabbyProvider = createOpenAI({
    baseURL: process.env.EXL2_BASE_URL ?? 'http://localhost:5000/v1',
    apiKey: 'sk-local',
  });

  /**
   * Yeni bir siparişi alır ve iş akışını başlatır
   */
  public async startWorkflow(userPrompt: string): Promise<number> {
    const [workflow] = await db.insert(workflows).values({
      userPrompt,
      status: 'running',
    }).returning({ id: workflows.id });

    // İşlemi arka planda başlat (bloklama)
    this.executeWorkflow(workflow.id, userPrompt).catch(err => {
      console.error(`[Orchestrator] Workflow ${workflow.id} hata verdi:`, err);
      db.update(workflows).set({ status: 'failed' }).where(eq(workflows.id, workflow.id)).execute();
    });

    return workflow.id;
  }

  /**
   * İş akışının Llama 70B -> Qwen 32B Coder aşamalarını yönetir
   */
  private async executeWorkflow(workflowId: number, planPrompt: string): Promise<void> {
    console.log(`[Orchestrator] Workflow ${workflowId} çalışıyor: Qwen 32B (Coder) kodluyor...`);

    // Modeli VRAM'e yükle (Llama 70B'den Qwen 32B'ye geçiş)
    await ModelOffloadManager.loadCoder((msg) => {
      console.log(`[ModelOffloadManager] ${msg}`);
    });

    // 2. Kodlama (Qwen 32B - Coder)
    const coderResponse = await generateText({
      model: this.vllmProvider('qwen-2.5-coder-32b-awq'),
      system: `Sen Otonom Fabrika'nın Baş Yazılımcısısın. Sana verilen mimari plana uygun olarak kodları yaz ve dosya sistemine kaydet. 
Dosyaları yazmak için ŞU JSON FORMATINI BİREBİR KULLAN ve her dosya için ayrı bir satırda JSON çıktısı ver. Başka hiçbir şey yazma.
Format:
{"name": "writeFile", "arguments": {"filePath": "apps/test-site/index.html", "content": "<HTML KODUNUN TAMAMI>"}}
{"name": "writeFile", "arguments": {"filePath": "apps/test-site/css/style.css", "content": "<CSS KODUNUN TAMAMI>"}}
{"name": "writeFile", "arguments": {"filePath": "apps/test-site/js/script.js", "content": "<JS KODUNUN TAMAMI>"}}
DİKKAT: JSON içinde "content" alanını BOŞ BIRAKMA! Yazdığın tüm kodu content içine koy! Dosya yolları her zaman göreceli olmalıdır.`,
      prompt: planPrompt,
      tools: fileTools as any,
    });

    console.log(`[Orchestrator] Coder Yanıtı Text:`, coderResponse.text);
    // Araç çağrılarını manuel olarak çalıştır
    let toolCalls = coderResponse.toolCalls && coderResponse.toolCalls.length > 0 ? coderResponse.toolCalls : [];
    
    if (toolCalls.length === 0) {
      // Fallback: Metin içindeki JSON araç çağrılarını yakala
      const lines = coderResponse.text.split('\n');
      for (const line of lines) {
        if (line.trim().startsWith('{"name":') && line.includes('"arguments":')) {
          try {
            const parsed = JSON.parse(line.trim());
            toolCalls.push({
              toolName: parsed.name,
              args: parsed.arguments,
            } as any);
          } catch(e) {}
        }
      }
    }

    if (toolCalls && toolCalls.length > 0) {
      console.log(`[Orchestrator] ${toolCalls.length} araç çağrısı bulundu, çalıştırılıyor...`);
      for (const call of toolCalls) {
        console.log(`[Orchestrator] Çalıştırılıyor: ${call.toolName}`, (call as any).args);
        try {
          if (call.toolName === 'writeFile') {
            const result = await fileTools.writeFile.execute((call as any).args);
            console.log(`[Orchestrator] Sonuç:`, result);
          } else if (call.toolName === 'readFile') {
            const result = await fileTools.readFile.execute((call as any).args);
            console.log(`[Orchestrator] Sonuç:`, result);
          }
        } catch (e) {
          console.error(`[Orchestrator] Araç çalıştırma hatası (${call.toolName}):`, e);
        }
      }
    } else {
      console.log(`[Orchestrator] Uyarı: Model hiçbir araç çağırmadı.`);
    }

    console.log(`[Orchestrator] Kodlama Tamamlandı. Workflow ${workflowId} bitti.`);

    // 3. Durumu Güncelle
    await db.update(workflows)
      .set({ status: 'completed' })
      .where(eq(workflows.id, workflowId));
  }
}
