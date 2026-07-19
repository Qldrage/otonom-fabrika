/**
 * LLMRouterActor.ts
 * 
 * Güvenlik ve Bütçe (FinOps) katmanıdır.
 * Faz 10: RTX 3090 Asimetrik Güç Dağıtımı Matrisi
 * Modelleri vLLM (AWQ) ve ExLlama (EXL2) üzerine yönlendirerek Tensör çekirdeklerini %100 verimle kullanır.
 */

import { AIGatewayService } from "./AIGatewayService";

export class LLMRouterActor {
  private gateway = new AIGatewayService();
  private secureKV = new Map<string, string>(); // Gerçek API Key kasası
  private failureCount = 0;

  constructor() {
    // Kurulum sırasında şifreler sadece bu kasada durur. (Lokal için dummy key izni)
    this.secureKV.set("PHANTOM_LEAD_DEV", "LOCAL_RTX_PERMISSION");
  }

  public async executeTask(complexity: "COMPLEX" | "MEDIUM" | "SIMPLE", prompt: string, phantomToken: string): Promise<string> {
    
    // 1. Phantom Token Kontrolü
    const realKey = this.secureKV.get(phantomToken);
    if (!realKey) throw new Error("Security Exception: Geçersiz Phantom Token!");

    // 2. Yönlendirme Matrisi (RTX 3090 High-End Local Matrix)
    let selectedEngine = "vllm";
    let selectedModel = "qwen-2.5-coder-32b-awq"; // Varsayılan Maker İşçisi
    
    if (complexity === "COMPLEX") {
      // Mimari Görevler -> Llama 3.3 70B (EXL2 2.4bpw via TabbyAPI/ExLlamaV2)
      // RAM'e taşırma yaparak (Partial Offload) zekayı kullanır.
      selectedEngine = "exl2"; // ✅ DÜZELTME: "exllama2" → "exl2" (AIGatewayService ile eşleştirildi)
      selectedModel = "llama-3.3-70b-instruct-exl2";
    } else if (complexity === "MEDIUM") {
      // Orta-İleri Hata Ayıklama -> DeepSeek R1 32B (AWQ via vLLM)
      selectedEngine = "vllm";
      selectedModel = "deepseek-r1-distill-32b-awq";
    }

    // 3. Devre Kesici (Circuit Breaker) ve Cloud Fallback
    if (this.failureCount >= 3) {
      console.warn("[LLMRouter] Devre Kesici Aktif! Yerel RTX sistemi cevap vermiyor, Cloud AI'ye geçiliyor.");
      return await this.cloudFallback(prompt);
    }

    try {
      console.log(`[LLMRouter] Görev (${complexity}) -> RTX Motoru: ${selectedEngine.toUpperCase()}, Model: ${selectedModel}`);
      const response = await this.gateway.unifiedCall(selectedEngine, selectedModel, prompt, realKey);
      this.failureCount = 0; // Başarılıysa hatayı sıfırla
      return response;
    } catch (e) {
      this.failureCount++;
      throw e;
    }
  }

  /**
   * Yerel RTX sistemi 3 kez ardışık başarısız olursa devreye giren bulut yedeklemesi.
   * OpenRouter aracılığıyla Anthropic Claude veya Gemini'ye bağlanır.
   */
  private async cloudFallback(prompt: string): Promise<string> {
    const { generateText } = await import("ai");
    const { createOpenAI } = await import("@ai-sdk/openai");

    const cloudProvider = createOpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: process.env.OPENROUTER_API_KEY ?? "",
    });

    try {
      const { text } = await generateText({
        model: cloudProvider("anthropic/claude-3-5-haiku"),
        prompt,
      });
      console.log("[LLMRouter] Cloud Fallback başarılı (Anthropic Claude 3.5 Haiku via OpenRouter).");
      this.failureCount = 0;
      return text;
    } catch {
      throw new Error("[LLMRouter] KRITIK: Hem yerel RTX sistemi hem de bulut yedeklemesi başarısız!");
    }
  }
}
