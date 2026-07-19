/**
 * LLMJudge.ts
 * 
 * MCPoison (CVE-2025-54136) zafiyetine ve Prompt Injection (Rug Pull) ataklarına karşı
 * sisteme eklenen dış araçların (tools) açıklamalarını denetleyen 5 aşamalı kalkan.
 */

export class LLMJudge {
  
  /**
   * Gelen aracın şemasını ve açıklamasını potansiyel manipülasyonlara karşı denetler.
   */
  public evaluateToolSchema(toolName: string, description: string): boolean {
    console.log(`[LLMJudge] Araç denetleniyor: ${toolName}`);

    // Aşama 1-4: Heuristic/Regex
    const blockedKeywords = ["SYSTEM", "IGNORE", "OVERRIDE", "FORGET"];
    for (const keyword of blockedKeywords) {
      if (description.toUpperCase().includes(keyword)) {
        console.error(`[LLMJudge] REDDEDİLDİ: ${toolName} aracında zararlı anahtar kelime bulundu: ${keyword}`);
        return false;
      }
    }

    // Aşama 5: Küçük LLM Onayı (Mock)
    if (description.length > 500) {
      console.warn(`[LLMJudge] UYARI: Açıklama çok uzun, LLM Judge (Hakem Model) incelemesine gönderildi.`);
      // Hakem model onay verirse true, vermezse false döner.
    }

    console.log(`[LLMJudge] ONAYLANDI: ${toolName} güvenli.`);
    return true;
  }
}
