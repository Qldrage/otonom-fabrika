/**
 * BartBreaker.ts
 * 
 * B.A.R.T. (Branch Alternative Retry Trees) Devre Kesicisi.
 * Ajanların aynı hata etrafında sonsuz döngüye girmesini (Ralphing) engeller.
 */

export class BartBreaker {
  // Hata Haritası (Fail Map / Graveyard)
  private failMap: Map<string, number> = new Map();

  /**
   * Bir hata alındığında (veya bir test başarısız olduğunda) B.A.R.T protokolünü işletir.
   * @param issueKey Hatanın veya hedefin benzersiz anahtarı (örn: 'UI_ALIGNMENT_BUG')
   */
  public evaluateFailure(issueKey: string): 'CONVENTIONAL' | 'STRATEGIC_PIVOT' | 'HAIL_MARY' | 'TERMINATE' {
    const attempts = (this.failMap.get(issueKey) || 0) + 1;
    this.failMap.set(issueKey, attempts);

    console.log(`[B.A.R.T.] Sorun: ${issueKey} | Deneme: ${attempts}`);

    if (attempts <= 5) {
      console.info(`[B.A.R.T.] Aşama 1 (1-5 Deneme): Konvansiyonel düzeltmelere (linter/syntax) izin verildi.`);
      return 'CONVENTIONAL';
    } 
    else if (attempts <= 10) {
      console.warn(`[B.A.R.T.] Aşama 2 (6-10 Deneme): STRATEJİK PİVOT zorunlu! Farklı bir kütüphane veya yaklaşım deneyin.`);
      return 'STRATEGIC_PIVOT';
    } 
    else if (attempts === 11) {
      console.error(`[B.A.R.T.] Aşama 3 (11. Deneme): HAIL MARY modu! Radikal refaktör veya mocklama deneyin.`);
      return 'HAIL_MARY';
    } 
    else {
      console.error(`[B.A.R.T.] KİLİTLENME TESPİT EDİLDİ! Döngü kırılıyor. (Terminate)`);
      this.generateStuckBrief(issueKey);
      return 'TERMINATE';
    }
  }

  /**
   * 11+ denemeden sonra Proje Yöneticisi/İnsan için kilitlenme raporu üretir.
   */
  private generateStuckBrief(issueKey: string): void {
    console.log(`\n================ STUCK BRIEF ================`);
    console.log(`Ajan '${issueKey}' konusunda kilitlendi.`);
    console.log(`Lütfen stratejiyi değiştirin veya gereksinimleri güncelleyin.`);
    console.log(`=============================================\n`);
  }
}
