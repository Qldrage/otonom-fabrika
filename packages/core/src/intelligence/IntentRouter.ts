/**
 * IntentRouter.ts
 * 
 * Müşterinin sektörünü analiz ederek arayüzün (UI) ana stratejisini belirler.
 * Aciliyet (Tesisatçı) veya Estetik (Perdeci) durumlarına göre UI bileşen ağacını seçer.
 */

export class IntentRouter {
  
  public determineBlueprint(sector: string): string {
    console.log(`[IntentRouter] Sektör analizi yapılıyor: ${sector}`);

    const urgencySectors = ['tesisatçı', 'çilingir', 'çekici'];
    const aestheticSectors = ['perdeci', 'iç mimar', 'peyzaj'];

    if (urgencySectors.includes(sector.toLowerCase())) {
      console.log(`[IntentRouter] Zihinsel Model: Fonksiyonel Hayatta Kalma (Aciliyet). Bilişsel yükü düşük 'Hemen Ara' şablonu seçildi.`);
      return "URGENCY_BLUEPRINT"; // Büyük butonlar, az metin, net CTA
    }

    if (aestheticSectors.includes(sector.toLowerCase())) {
      console.log(`[IntentRouter] Zihinsel Model: Estetik ve Deneyim. 'İlham Al' odaklı görsel şablon seçildi.`);
      return "AESTHETIC_BLUEPRINT"; // HD görseller, stil rehberleri
    }

    return "STANDARD_BLUEPRINT";
  }
}
