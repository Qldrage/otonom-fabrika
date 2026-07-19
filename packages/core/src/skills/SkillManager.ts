/**
 * SkillManager.ts
 * 
 * Ajan yeteneklerini (Agent Skills) Kademeli Keşif (Progressive Disclosure) prensibiyle yükleyen sınıf.
 * Sistemin token bütçesini ve bağlam penceresini (context window) korumak için 3 aşamalı çalışır:
 * 1. Discovery: Sadece yetenek adları ve açıklamaları (~100 token) yüklenir.
 * 2. Activation: Tetiklendiğinde SKILL.md yüklenir (<5000 token).
 * 3. Execution: Scriptler veya ek dosyalar sadece ihtiyaç halinde çağrılır.
 */

export interface SkillManifest {
  name: string;
  description: string;
  triggerKeywords: string[];
}

export class SkillManager {
  private activeSkills: Map<string, string> = new Map(); // Sadece ad ve açıklamaları tutar (Discovery)

  /**
   * Aşama 1: Keşif (Discovery)
   * Başlangıçta tüm yeteneklerin (skills) sadece minimal bilgilerini bağlama enjekte eder.
   */
  public getDiscoveryPrompt(manifests: SkillManifest[]): string {
    return manifests.map(m => `- ${m.name}: ${m.description}`).join('\n');
  }

  /**
   * Aşama 2: Etkinleştirme (Activation)
   * Ajan 'load_skill' aracıyla bunu çağırdığında, ilgili yeteneğin tam SKILL.md dosyasını okur.
   */
  public async loadSkill(skillName: string): Promise<string> {
    console.log(`[SkillManager] Activation: ${skillName} yeteneğinin SKILL.md dosyası belleğe alınıyor.`);
    // fs.readFileSync(`.agents/skills/${skillName}/SKILL.md`, 'utf-8');
    return `Mock SKILL.md Content for ${skillName}`; 
  }

  /**
   * Aşama 3a: Yürütme (Execution - Script)
   * Ajan 'run_skill_script' aracıyla çağırdığında ilgili scripti çalıştırır.
   */
  public async runSkillScript(skillName: string, scriptName: string, args: any[]): Promise<string> {
    console.log(`[SkillManager] Execution: ${skillName} -> ${scriptName} çalıştırılıyor.`);
    return "Script executed successfully.";
  }

  /**
   * Aşama 3b: Yürütme (Execution - Kaynak Okuma)
   * Ajan 'read_skill_resource' aracıyla çağırdığında ek dokümanı/şablonu okur.
   */
  public async readSkillResource(skillName: string, resourcePath: string): Promise<string> {
    console.log(`[SkillManager] Resource: ${skillName} -> ${resourcePath} okunuyor.`);
    return "Resource content mock";
  }
}
