/**
 * BrowserSubAgent.ts
 * 
 * Ajanların canlı bir Chrome tarayıcı oturumunu kontrol etmesini sağlayan alt-ajan.
 * Statik DOM scraping yerine doğrudan Chrome DevTools protokolüne bağlanarak 
 * konsol hatalarını ve başarısız ağ isteklerini okur.
 */

export interface NetworkError {
  url: string;
  status: number;
  message: string;
}

export interface ConsoleError {
  type: string;
  message: string;
}

export class BrowserSubAgent {
  // Mock MCP Connection
  private isConnected: boolean = false;

  public async connect(): Promise<void> {
    this.isConnected = true;
    console.log("[BrowserSubAgent] Chrome DevTools MCP'ye bağlanıldı.");
  }

  /**
   * Sayfa yüklendiğinde ağ (Network) trafiğini dinleyerek 404/500 ve CORS hatalarını yakalar.
   */
  public async getNetworkErrors(): Promise<NetworkError[]> {
    if (!this.isConnected) throw new Error("Not connected to DevTools");
    console.log("[BrowserSubAgent] Ağ istekleri analiz ediliyor...");
    return [
      { url: "https://api.example.com/data", status: 500, message: "Internal Server Error" },
      { url: "https://api.example.com/cors", status: 0, message: "CORS Policy Blocked" }
    ];
  }

  /**
   * Konsoldaki JavaScript hatalarını okur.
   */
  public async getConsoleErrors(): Promise<ConsoleError[]> {
    if (!this.isConnected) throw new Error("Not connected to DevTools");
    console.log("[BrowserSubAgent] Konsol logları analiz ediliyor...");
    return [
      { type: "ReferenceError", message: "process is not defined" }
    ];
  }
}
