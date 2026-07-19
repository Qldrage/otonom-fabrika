import { db } from '../db';
import { workflows } from '../db/schema';
import { eq } from 'drizzle-orm';
import { fileTools } from '../tools/FileTools';
import { commandRunnerTool } from '../tools/CommandRunnerTool';
import { generateText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import { ModelOffloadManager } from '../llm/ModelOffloadManager';

export class CoalitionOrchestrator {
  private vllmProvider = createOpenAI({
    baseURL: process.env.VLLM_BASE_URL ?? 'http://localhost:8000/v1',
    apiKey: 'sk-local',
  });

  public async startCoalition(userPrompt: string): Promise<number> {
    const [workflow] = await db.insert(workflows).values({
      userPrompt,
      status: 'running',
    }).returning({ id: workflows.id });

    this.executeCoalition(workflow.id, userPrompt).catch(err => {
      console.error(`[Coalition] Workflow ${workflow.id} hata verdi:`, err);
      db.update(workflows).set({ status: 'failed' }).where(eq(workflows.id, workflow.id)).execute();
    });

    return workflow.id;
  }

  private async executeCoalition(workflowId: number, userPrompt: string): Promise<void> {
    let retryCount = 0;
    const MAX_RETRY = 3;

    try {
      // 1. STEP: LLaMA ARCHITECT
      console.log(`[Coalition] STEP 1: LLaMA (Architect) Planlıyor...`);
      await ModelOffloadManager.loadArchitect((msg) => console.log(`[ModelOffload] ${msg}`));
      
      let architectPlan = await this.runArchitect(userPrompt);

      while (retryCount < MAX_RETRY) {
        // 2. STEP: DeepSeek-R1 (TDD)
        console.log(`[Coalition] STEP 2: DeepSeek-R1 (TDD Engineer) Testleri Yazıyor...`);
        await ModelOffloadManager.loadTDD((msg) => console.log(`[ModelOffload] ${msg}`));
        const r1Output = await this.runTDD(architectPlan);
        
        const testResult = await commandRunnerTool.execute({ command: 'npm test' }) as any;
        console.log(`[Coalition] R1 Test Sonucu: ${testResult.success ? 'GREEN' : 'RED'}`);

        // 3. STEP: Qwen-32B (CODER)
        console.log(`[Coalition] STEP 3: Qwen-32B (Coder) Üretim Kodunu Yazıyor...`);
        await ModelOffloadManager.loadCoder((msg) => console.log(`[ModelOffload] ${msg}`));
        await this.runCoder(r1Output, testResult.output);

        // 4. STEP: Testlerin tekrar koşulması (Verifying GREEN)
        const verifyResult = await commandRunnerTool.execute({ command: 'npm test' }) as any;
        
        if (!verifyResult.success) {
          console.log(`[Coalition] Testler hala RED! (Deneme ${retryCount + 1}/${MAX_RETRY})`);
          retryCount++;
          continue; // R1'e geri dön (veya loop'u tekrarla)
        }

        // 5. STEP: Qwen-VL (Vision QA)
        console.log(`[Coalition] STEP 4: Qwen-VL (Vision QA) UI Kontrolü Yapıyor...`);
        await ModelOffloadManager.loadVision((msg) => console.log(`[ModelOffload] ${msg}`));
        const visionResult = await this.runVision();

        if (visionResult.includes('VISUAL_INSPECTION_FAILED')) {
          console.log(`[Coalition] Görsel Hata Bulundu! (Deneme ${retryCount + 1}/${MAX_RETRY})`);
          retryCount++;
          // Görsel hatayı r1Output'a ekleyip döngüyü tekrarla (Gerçek implementasyonda daha kompleks olabilir)
          continue; 
        }

        console.log(`[Coalition] Tüm testler ve görsel kontroller BAŞARILI! (GREEN)`);
        break;
      }

      if (retryCount >= MAX_RETRY) {
        throw new Error("MAX_RETRY_EXCEEDED: Hatalar 3 denemede çözülemedi.");
      }

      await db.update(workflows).set({ status: 'completed' }).where(eq(workflows.id, workflowId)).execute();
      console.log(`[Coalition] Workflow ${workflowId} başarıyla tamamlandı.`);

    } catch (e: any) {
      console.error(`[Coalition] CIRCUIT BREAKER DEVREDE!`, e.message);
      // Eskalasyon veya Durdurma
      await db.update(workflows).set({ status: 'failed' }).where(eq(workflows.id, workflowId)).execute();
    }
  }

  private async runArchitect(prompt: string): Promise<string> {
    const res = await generateText({
      model: this.vllmProvider('qwen-2.5-coder-32b-awq'), // Placeholder for LLaMA
      system: `Sen LLaMA (System Architect)'sin. Doğrudan kod yazamazsın. Sadece JSON formatında mimari plan üret.
Format:
{
  "agent_target": "R1",
  "component_name": "Proje",
  "architecture_type": "frontend",
  "dependencies": ["react", "vite"],
  "state_management_or_db": "none",
  "tdd_instructions": "Kesin test sınırları"
}`,
      prompt: prompt,
    });
    return res.text;
  }

  private async runTDD(architectPlan: string): Promise<string> {
    const res = await generateText({
      model: this.vllmProvider('qwen-2.5-coder-32b-awq'), // Placeholder for R1
      system: `Sen DeepSeek-R1 (TDD Engineer)'sın. Qwen'e sadece kod değiştirmesi için JSON talimatları gönder. Testleri yaz.
Format:
{
  "agent_target": "Qwen-32B",
  "action": "CREATE_TEST | MODIFY_CODE",
  "file_target": "App.test.tsx",
  "root_cause_analysis": "...",
  "coder_instruction": "...",
  "expected_test_state": "GREEN",
  "retry_count": 0
}`,
      prompt: `Mimar Planı: ${architectPlan}\n\nTestleri yaz.`,
      tools: fileTools as any,
    });
    return res.text;
  }

  private async runCoder(r1Instruction: string, testError: string): Promise<string> {
    const res = await generateText({
      model: this.vllmProvider('qwen-2.5-coder-32b-awq'),
      system: `Sen Qwen-32B (Coder)'sın. Sadece R1'in sana gönderdiği dosyaları güncelle ve testleri geçecek kodu yaz. JSON çıktısı ver.`,
      prompt: `R1 Talimatı: ${r1Instruction}\n\nMevcut Test Çıktısı:\n${testError}`,
      tools: fileTools as any,
    });
    return res.text;
  }

  private async runVision(): Promise<string> {
    const res = await generateText({
      model: this.vllmProvider('qwen-2.5-coder-32b-awq'), // Placeholder for Qwen-VL
      system: `Sen Qwen-VL (Vision QA)'sin. DOM referansları ve görsel uyuşmazlıkları tespit edersin. Sadece JSON çıktısı üret.`,
      prompt: `Sistemi kontrol et. (Simülasyon)`,
    });
    return res.text;
  }
}
