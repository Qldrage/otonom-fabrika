/**
 * DashboardServer.ts
 * 
 * Yöneticinin (Proje Yöneticisi) fabrikayı tarayıcı üzerinden 
 * yönetebilmesi için oluşturulan lokal arayüz sunucusu (localhost:3000).
 * ✅ DÜZELTME: Gerçek HTTP sunucusu eklendi (önceden sadece console.log vardı).
 */

import http from 'http';
import { createChatHandler } from './ChatAPI';

export class DashboardServer {
  private server: http.Server | null = null;
  private port = parseInt(process.env.DASHBOARD_PORT ?? '3001');

  public start(): void {
    const chatHandler = createChatHandler();

    this.server = http.createServer(async (req, res) => {
      // CORS ve temel sağlık kontrolü için endpoint
      res.setHeader('Access-Control-Allow-Origin', '*');

      // OPTIONS istekleri için CORS yanıtı (Preflight)
      if (req.method === 'OPTIONS') {
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        res.writeHead(204);
        res.end();
        return;
      }

      // 1. Önce ChatAPI handler'a sor (eğer işlerse true döner)
      if (await chatHandler(req, res)) return;

      res.setHeader('Content-Type', 'application/json');

      if (req.url === '/health') {
        res.writeHead(200);
        res.end(JSON.stringify({ status: 'ok', timestamp: new Date().toISOString() }));
      } else if (req.url === '/api/status') {
        res.writeHead(200);
        res.end(JSON.stringify({
          factory: 'Otonom Fabrika',
          status: 'running',
          agents: ['LLMRouter', 'MemoryService', 'AIGateway'],
        }));
      } else {
        res.writeHead(404);
        res.end(JSON.stringify({ error: 'Not found' }));
      }
    });

    this.server.listen(this.port, '127.0.0.1', () => {
      console.log(`[DashboardServer] ✅ API Sunucusu başlatıldı: http://localhost:${this.port}`);
      console.log(`[DashboardServer] Sağlık kontrolü: http://localhost:${this.port}/health`);
      console.log(`[DashboardServer] Fabrika durumu: http://localhost:${this.port}/api/status`);
    });

    this.server.on('error', (err) => {
      console.error(`[DashboardServer] ❌ Sunucu hatası: ${err.message}`);
    });
  }

  public stop(): void {
    this.server?.close(() => {
      console.log('[DashboardServer] Sunucu kapatıldı.');
    });
  }
}

