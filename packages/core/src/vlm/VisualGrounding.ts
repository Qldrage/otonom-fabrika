import { QwenVLMService } from './QwenVLMService';

/**
 * VisualGrounding.ts
 * 
 * VLM'lerin "Beyaz Dikdörtgen Problemi" (uzamsal muhakeme hatası) yaşamasını engelleyen
 * Set-of-Marks (SoM) ve Grounded Chain-of-Thought (G-CoT) tekniklerini uygulayan modül.
 */

export class VisualGrounding {
  private vlm: QwenVLMService;

  constructor(vlm: QwenVLMService) {
    this.vlm = vlm;
  }

  /**
   * Set-of-Marks (SoM): Ekran görüntüsü üzerine DOM elemanlarını temsil eden
   * tıklanabilir, benzersiz sayısal etiketler bindirir.
   */
  public applySetOfMarks(imagePath: string, domElements: any[]): string {
    console.log(`[VisualGrounding] ${imagePath} üzerine SoM sayısal etiketleri bindiriliyor...`);
    // Görüntü işleme mock. Orijinal resme 1, 2, 3 gibi markörler çizer.
    return `${imagePath}_som_annotated.png`;
  }

  /**
   * Grounded Chain-of-Thought (G-CoT): Modelin UI üzerinde bir eylem yapmadan önce
   * görsel kanıtı sesli (sözel) olarak onaylamasını zorunlu kılan bağlam enjeksiyonu.
   */
  public generateGCoTPrompt(task: string): string {
    return `
    GÖREV: ${task}
    ZORUNLU KURAL (G-CoT): Bir eylemi gerçekleştirmeden veya düzeltme önermeden önce, hedeflenen öğeyi sözel olarak tanımlayın ve koordinatlarını [x1, y1, x2, y2] formatında belirtin.
    Örnek: "Sağ üstte yer alan yeşil 'Sepete Ekle' butonunu [1200, 50, 1350, 90] koordinatlarında tespit ettim. Butonun sola kaydığını gözlemliyorum, ilgili CSS sınıfını düzeltiyorum."
    `;
  }

  public async evaluateUI(imagePath: string, task: string): Promise<string> {
    const annotatedImage = this.applySetOfMarks(imagePath, []);
    const prompt = this.generateGCoTPrompt(task);
    
    console.log(`[VisualGrounding] VLM, G-CoT promptu ve SoM görseliyle tetikleniyor...`);
    const response = await this.vlm.analyzeScreenshot(annotatedImage);
    
    return `VLM Analizi: ${response.description}`;
  }
}
