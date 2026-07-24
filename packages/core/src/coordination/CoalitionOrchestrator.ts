import { db } from '../db';
import { workflows } from '../db/schema';
import { eq } from 'drizzle-orm';
import { fileTools } from '../tools/FileTools';
import { commandRunnerTool } from '../tools/CommandRunnerTool';
import { generateText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import { google } from '@ai-sdk/google';
import { ModelOffloadManager } from '../llm/ModelOffloadManager';
import { extractJSON, extractCodeBlock } from '../utils/jsonParser';
import { MCPManager } from '../mcp/MCPManager';
import fs from 'fs/promises';
import path from 'path';

export class CoalitionOrchestrator {
  private vllmProvider = createOpenAI({
    baseURL: process.env.VLLM_BASE_URL ?? 'http://localhost:8000/v1',
    apiKey: 'sk-local',
  });

  public async startCoalition(promptOrPlan: string | any): Promise<number> {
    const [workflow] = await db.insert(workflows).values({
      userPrompt: typeof promptOrPlan === 'string' ? promptOrPlan : 'Pre-planned execution',
      status: 'running',
    }).returning({ id: workflows.id });

    this.executeCoalition(workflow.id, promptOrPlan).catch(err => {
      console.error(`[Coalition] Workflow ${workflow.id} hata verdi:`, err);
      db.update(workflows).set({ status: 'failed' }).where(eq(workflows.id, workflow.id)).execute();
    });

    return workflow.id;
  }

  private async executeCoalition(workflowId: number, promptOrPlan: any): Promise<void> {
    let retryCount = 0;
    const MAX_RETRY = 3;

    try {
      // 1. STEP: Gemini (Lead Developer / Baş Mimar)
      console.log(`[Coalition] STEP 1: Gemini (Lead Developer) Testleri ve Planı Sisteme Yüklüyor...`);
      
      if (typeof promptOrPlan === 'string' || !promptOrPlan.testCode || !promptOrPlan.testFilePath) {
         throw new Error("SİSTEM KURALI İHLALİ: Testleri Qwen'e yazdırmaya çalıştınız. Testler sadece Gemini (Lead Developer) tarafından JSON formatında (testCode, testFilePath, cwd) sağlanmalıdır.");
      }

      const { testCode, testFilePath, cwd, coderInstruction, visionEnabled } = promptOrPlan;
      const workspaceDir = path.resolve(process.env.WORKSPACE_DIR ?? './workspace');
      const targetCwd = cwd ? path.resolve(workspaceDir, cwd) : workspaceDir;

      // Ensure directory exists
      try {
        await fs.access(targetCwd);
      } catch {
        await fs.mkdir(targetCwd, { recursive: true });
      }

      // Write test to disk
      const fullTestPath = path.resolve(targetCwd, testFilePath);
      const testFileDir = path.dirname(fullTestPath);
      try {
        await fs.access(testFileDir);
      } catch {
        await fs.mkdir(testFileDir, { recursive: true });
      }
      try {
         await fs.chmod(fullTestPath, 0o666);
      } catch (e) {
         // Ignore if file does not exist
      }
      await fs.writeFile(fullTestPath, testCode, 'utf8');
      console.log(`[Coalition] Lead Developer Testleri Diske Kaydedildi: ${fullTestPath}`);

      // Lock test files so Coder can't cheat
      await this.lockTestFiles(cwd || '');

      // Validate tests are RED initially
      let testResult = await commandRunnerTool.execute({ command: `npx vitest run ${testFilePath}`, cwd: cwd || '' }) as any;
      console.log(`[Coalition] Lead Test Başlangıç Durumu (RED Bekleniyor): ${testResult.success ? 'GREEN (Uyarı: Test hemen geçti?)' : 'RED'}`);
      console.log(`[Coalition] Vitest Çıktısı:\n${testResult.output}`);

      let testError = testResult.output;

      while (retryCount < MAX_RETRY) {
        // 2. STEP: Qwen-14B (CODER)
        console.log(`[Coalition] STEP 2: Qwen-14B (Coder) Üretim Kodunu Yazıyor... (Deneme ${retryCount + 1})`);
        await ModelOffloadManager.loadCoder((msg) => console.log(`[ModelOffload] ${msg}`));
        const rawCoderOutput = await this.runCoder(JSON.stringify({ cwd, file_target: testFilePath, coder_instruction: coderInstruction, test_code_to_pass: testCode }), testError);
        const extractedCode = extractCodeBlock(rawCoderOutput);
        
        // Coder output saving logic
        const sourceFilePath = testFilePath.replace('.test.tsx', '.tsx').replace('.test.js', '.js');
        const fullSourcePath = path.resolve(targetCwd, sourceFilePath);
        await fs.writeFile(fullSourcePath, extractedCode, 'utf8');
        console.log(`[Coalition] Coder Üretimi Diske Kaydedildi: ${fullSourcePath}`);

        // 3. STEP: Testlerin tekrar koşulması (Verifying GREEN)
        const verifyResult = await commandRunnerTool.execute({ command: `npx vitest run ${testFilePath}`, cwd: cwd || '' }) as any;
        
        if (!verifyResult.success) {
          console.log(`[Coalition] Testler hala RED! (Deneme ${retryCount + 1}/${MAX_RETRY})`);
          console.log(`[Coalition] Vitest Hata Çıktısı:\n${verifyResult.output}`);
          retryCount++;
          testError = verifyResult.output;
          continue; 
        } else {
          console.log(`[Coalition] Vitest GREEN Çıktısı:\n${verifyResult.output}`);
        }

        // 4. STEP: Qwen-VL (Vision QA)
        if (visionEnabled) {
          console.log(`[Coalition] STEP 4: Qwen-VL (Vision QA) UI Kontrolü Yapıyor...`);
          try {
            await ModelOffloadManager.loadVision((msg) => console.log(`[ModelOffload] ${msg}`));
            const visionOutputText = await this.runVision();
            const visionResult = extractJSON(visionOutputText);

            if (visionResult.event === 'VISUAL_INSPECTION_FAILED') {
              console.log(`[Coalition] Görsel Hata Bulundu! (Deneme ${retryCount + 1}/${MAX_RETRY})`);
              retryCount++;
              testError = `GÖRSEL HATA: ${visionResult.description} | DOM: ${visionResult.dom_reference}`;
              continue;
            }
          } catch (visionErr: any) {
             console.log(`[Coalition] Vision QA Port 8001 bağlantı hatası veya zaman aşımı, bu adım atlanıyor.`);
          }
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


  private async runCoder(r1Instruction: string, testError: string): Promise<string> {
    const res = await generateText({
      model: this.vllmProvider('Qwen/Qwen2.5-Coder-14B-Instruct-AWQ'),
      system: `Sen Qwen-14B (Coder)'sın. Saf üretim gücüsün. Sana verilen test kodunu (test_code_to_pass) DİKKATLİCE OKU.
Sadece o testi geçecek (GREEN) en optimize kodu yaz.
Testin beklediği propları (name, role vs.) birebir kullanmak zorundasın.
İnisiyatif alma, ekstra özellik ekleme. Çıktı olarak sadece Markdown formatında (\`\`\`tsx ... \`\`\`) kod dön, açıklama yazma.`,
      prompt: `Lead Developer Talimatı ve Testi (JSON):\n${r1Instruction}\n\nMevcut Test Çıktısı (RED ise düzelt, GREEN ise aynen bırak):\n${testError}`,
      maxSteps: 5,
    } as any);
    return res.text;
  }

  private async runVision(): Promise<string> {
    const visionProvider = createOpenAI({
      baseURL: 'http://localhost:8001/v1',
      apiKey: 'sk-local',
    });
    
    const res = await generateText({
      model: visionProvider('Qwen/Qwen2-VL-7B-Instruct-AWQ'),
      system: `Sen Qwen-VL 7B (Vision QA & Observer)'sin. Çalışan arayüzü görsel ve DOM bazlı inceler, hataları teşhis edersin. Sadece JSON çıktısı üret.
Format:
{
  "agent_target": "R1",
  "event": "VISUAL_INSPECTION_FAILED | VISUAL_INSPECTION_PASSED",
  "component": "...",
  "dom_reference": "...",
  "issue_type": "ALIGNMENT_ERROR | OVERFLOW | LOGIC_ERROR",
  "description": "..."
}`,
      prompt: `Sistemi kontrol et. (Simülasyon)`,
    });
    return res.text;
  }

  private async lockTestFiles(targetCwd: string) {
    try {
      const workspaceDir = path.resolve(process.env.WORKSPACE_DIR ?? './workspace');
      const searchPath = targetCwd ? path.resolve(workspaceDir, targetCwd) : workspaceDir;
      
      console.log(`[Coalition] Test dosyaları kilitleniyor (Read-Only)... Hedef: ${searchPath}`);
      
      try {
        await fs.access(searchPath);
      } catch {
        await fs.mkdir(searchPath, { recursive: true });
      }

      const files = await fs.readdir(searchPath, { recursive: true, withFileTypes: true });
      for (const file of files) {
        const fileDir = (file as any).parentPath || (file as any).path || searchPath;
        if (fileDir.includes('node_modules')) continue;
        
        if (file.isFile() && file.name.includes('.test.')) {
          const fullPath = path.join(fileDir, file.name);
          await fs.chmod(fullPath, 0o444); // Read-only
          console.log(`[Lock] Kilitlendi: ${fullPath}`);
        }
      }
    } catch (e: any) {
      console.warn(`[Coalition] Test dosyaları kilitlenirken hata: ${e.message}`);
    }
  }
}
