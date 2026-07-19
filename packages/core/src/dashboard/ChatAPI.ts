import 'dotenv/config';
import http from 'http';
import { createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { ModelOffloadManager } from '../llm/ModelOffloadManager';

/**
 * ChatAPI.ts
 * Dashboard ChatView'inin gerçek vLLM sunucusuna bağlandığı API katmanı.
 * Server-Sent Events (SSE) ile streaming yanıt döner.
 */

const vllmProvider = createOpenAI({
  baseURL: process.env.VLLM_BASE_URL ?? 'http://localhost:8000/v1',
  apiKey: 'sk-local',
});

const tabbyProvider = createOpenAI({
  baseURL: process.env.TABBY_BASE_URL ?? 'http://localhost:8000/v1',
  apiKey: 'sk-local',
});

export function createChatHandler() {
  return async (req: http.IncomingMessage, res: http.ServerResponse) => {
    if (req.method !== 'POST' || req.url !== '/api/chat') return false;

    // CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    let body = '';
    for await (const chunk of req) body += chunk;
    
    const systemPrompt = `Sen LLaMA (System Architect)'sın. Doğrudan kod yazamazsın.
Kullanıcının siparişini analiz edip R1 (Test Mühendisi) için sadece JSON formatında mimari iskelet tasarlamalısın.
Format:
{
  "agent_target": "R1",
  "component_name": "Proje Adi",
  "architecture_type": "frontend | backend",
  "dependencies": ["list"],
  "state_management_or_db": "...",
  "tdd_instructions": "R1'e yönelik test sinirlari"
}`;

    try {
      const { messages } = JSON.parse(body);
      // Modeli VRAM'e yükle ve ilerlemeyi arayüze bildir
      await ModelOffloadManager.loadArchitect((msg) => {
        res.write(`data: ${JSON.stringify({ text: `[SİSTEM] ${msg}\n` })}\n\n`);
      });

      const result = streamText({
        model: tabbyProvider('qwen-2.5-coder-32b-awq'), // Geçici olarak Qwen 32B üzerinden çalışır
        system: systemPrompt,
        messages,
        onFinish: async (event) => {
          // Yanıt tamamlandığında arka planda kodlayıcı ajanı tetikle
          const { CoalitionOrchestrator } = await import('../coordination/CoalitionOrchestrator');
          const orchestrator = new CoalitionOrchestrator();
          
          // Son kullanıcı mesajını bul
          const lastUserMsg = messages[messages.length - 1].content;
          
          // Arka planda çalıştır (await etmeden)
          orchestrator.startCoalition(`Kullanıcı İsteği: ${lastUserMsg}\n\nSenin Planın:\n${event.text}`);
        }
      });

      // SSE olarak stream et
      for await (const textPart of result.textStream) {
        res.write(`data: ${JSON.stringify({ text: textPart })}\n\n`);
      }

      res.write('data: [DONE]\n\n');
      res.end();
    } catch (err: any) {
      console.error('[ChatAPI] LLM Hatası:', err.message);
      res.write(`data: ${JSON.stringify({ error: 'LLM sunucusuna ulaşılamadı. Sunucu başlatılamadı.' })}\n\n`);
      res.end();
    }

    return true;
  };
}
