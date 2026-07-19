/**
 * ImperativeAPI.ts
 * 
 * Chrome 149/150 WebMCP standardına göre, uygulamanın karmaşık işlevlerini
 * `document.modelContext` nesnesi üzerinden dışarıya aranabilir (callable) 
 * araçlar olarak açar.
 */

export class ImperativeAPI {
  /**
   * Bir fonksiyonu dış AI ajanlarının kullanabilmesi için tarayıcı API'sine kaydeder.
   */
  public exportTool(name: string, description: string, executeFn: Function): void {
    console.log(`[ImperativeAPI] Araç dışa aktarılıyor: ${name}`);
    
    // document.modelContext mock
    if (typeof globalThis !== 'undefined') {
      (globalThis as any).modelContext = (globalThis as any).modelContext || {};
      (globalThis as any).modelContext[name] = {
        description,
        execute: executeFn
      };
    }
  }
}
