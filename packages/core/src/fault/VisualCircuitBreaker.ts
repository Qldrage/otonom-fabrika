/**
 * VisualCircuitBreaker.ts
 * 
 * Ajanların görsel (CSS/UI) hataları düzeltirken sonsuz döngüye girmesini önleyen,
 * B.A.R.T sistemine entegre 5-deneme sert sınır devre kesicisi.
 */

export class VisualCircuitBreaker {
  private fixAttempts: Map<string, number> = new Map();

  /**
   * UI düzeltmesi başarısız olduğunda deneme sayısını artırır.
   * 5 denemeyi geçerse işlemi zorunlu durdurur.
   */
  public recordAttempt(elementId: string): 'CONTINUE' | 'TERMINATE' {
    const attempts = (this.fixAttempts.get(elementId) || 0) + 1;
    this.fixAttempts.set(elementId, attempts);

    console.log(`[VisualBreaker] Eleman '${elementId}' için düzeltme denemesi: ${attempts}/5`);

    if (attempts >= 5) {
      console.error(`[VisualBreaker] 5-DENEME SINIRI AŞILDI! Otonom düzeltme durduruluyor.`);
      this.generateStuckBrief(elementId);
      return 'TERMINATE';
    }

    return 'CONTINUE';
  }

  /**
   * Kilitlenme durumunda insan müdahalesi için rapor hazırlar.
   */
  private generateStuckBrief(elementId: string): void {
    console.log(`\n================ VISUAL STUCK BRIEF ================`);
    console.log(`Ajan '${elementId}' bileşeninin görsel yerleşimini 5 denemede düzeltemedi.`);
    console.log(`Sistem askıya alındı (Human-in-the-loop bekleniyor).`);
    console.log(`Öneri: Flex/Grid container yapılarını manuel inceleyin.`);
    console.log(`====================================================\n`);
  }
}
