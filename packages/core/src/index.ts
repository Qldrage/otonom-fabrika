import 'dotenv/config';
import { DashboardServer } from './dashboard/DashboardServer';

// Otonom Fabrikayı Başlat!
console.log("==========================================");
console.log(" OTONOM FABRİKA - SİSTEM AYAĞA KALKIYOR");
console.log("==========================================");

const server = new DashboardServer();
server.start();

// Süreci açık tutmak için
process.on('SIGINT', () => {
  server.stop();
  process.exit(0);
});
