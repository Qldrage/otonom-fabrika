/**
 * BehavioralUX.ts
 * 
 * Sitenin dönüşüm (conversion) oranını artırmak için Fogg Davranış Modeli (B=MAP)
 * ve Seçim Paradoksu kurallarına göre UI bileşenlerine psikolojik tetikleyiciler enjekte eder.
 */

export class BehavioralUX {
  
  /**
   * Bir forma güven çapaları ve sosyal kanıt ekler.
   */
  public injectTrustAnchors(formConfig: any): any {
    console.log("[BehavioralUX] Forma psikolojik güven çapaları (Trust Anchors) ekleniyor...");
    
    // Kademeli Keşif (Progressive Disclosure)
    formConfig.layout = "3_STEP_WIZARD"; 
    
    // Güven Rozeti
    formConfig.badges = ["Hatalı ölçüde %100 değişim garantisi", "SSL Güvenli Ödeme"];
    
    // Sosyal Kanıt (Social Proof)
    formConfig.socialProofText = "Son 24 saatte bölgenizden 5 kişi rezervasyon yaptı.";
    
    // Pain of Paying (Acı) sinyalini düşüren Mikro-Kopya
    formConfig.submitButtonText = "Hatasız Ölçü Rehberini Gör"; 

    return formConfig;
  }
}
