/**
 * AIGatewayService.ts
 * 
 * Sistemdeki 100'den fazla LLM modelini (Claude, Gemini, Qwen vb.)
 * OpenAI formatında birleştirilmiş tek bir uç noktaya (endpoint) bağlar.
 * Faz 10 (RTX 3090) Güncellemesi: vLLM ve ExLlamaV2 yerel sunucularına bağlanır.
 */

import { generateText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';

export class AIGatewayService {
  
  // vLLM endpoint for Maker/Debugger (Port 8000)
  private vllmProvider = createOpenAI({
    baseURL: 'http://localhost:8000/v1',
    apiKey: 'dummy-vllm-key' // Local vLLM requires a dummy key
  });

  // ExLlamaV2 (TabbyAPI) endpoint for Lead Architect (Port 5000)
  private exl2Provider = createOpenAI({
    baseURL: 'http://localhost:5000/v1',
    apiKey: 'dummy-exl2-key' // Local TabbyAPI requires a dummy key
  });

  /**
   * Tüm LLM çağrılarını standart OpenAI API formatında paketler.
   */
  public async unifiedCall(engine: string, modelName: string, prompt: string, phantomKey: string): Promise<string> {
    console.log(`[AIGateway] İstek yönlendiriliyor -> Motor: ${engine.toUpperCase()}, Model: ${modelName}`);
    
    if (!phantomKey) throw new Error("Security Exception: Geçersiz Phantom Token!");

    try {
      const activeProvider = engine === "vllm" ? this.vllmProvider : this.exl2Provider;
      
      const { text } = await generateText({
        model: activeProvider(modelName),
        prompt: prompt,
      });

      return text;
    } catch (e: any) {
      console.warn(`[AIGateway] Uyarı: Yerel AI Sunucusuna (${engine}) ulaşılamadı. Sunucuyu başlattınız mı?`);
      return `[Mock Response] (Not: Gerçek ${engine.toUpperCase()} sunucusu kapalı. Beklenen Model: ${modelName})`;
    }
  }
}
