import { z } from 'zod';
import * as cp from 'child_process';
import * as path from 'path';

/**
 * CommandRunnerTool.ts
 * DeepSeek-R1 (TDD Engineer) ajanının yazdığı testleri çalıştırması ve 
 * otonom olarak terminal çıktısını alıp hataları çözümlemesi için kullanılır.
 */

const WORKSPACE_DIR = path.resolve(process.env.WORKSPACE_DIR ?? './workspace');

export const commandRunnerTool = {
  description: 'Verilen terminal komutunu workspace veya belirtilen dizinde çalıştırır. Test komutları (örn: npm test) çalıştırmak için kullanılır.',
  parameters: z.object({
    command: z.string().describe('Çalıştırılacak terminal komutu (örn: "npm test" veya "npx jest menu.test.js")'),
    cwd: z.string().optional().describe('Komutun çalıştırılacağı alt dizin (örn: "apps/restaurant2"). Boş bırakılırsa ana workspace dizininde çalışır.')
  }),
  execute: async (args: any) => {
    const { command, cwd } = args;
    
    // Güvenlik: Komutun "rm -rf /" gibi tehlikeli argümanlar içermemesine dikkat edin
    if (command.includes('rm -rf /') || command.includes('mkfs')) {
      return { success: false, error: 'Tehlikeli komut çalıştırılamaz.' };
    }

    const targetCwd = cwd ? path.resolve(WORKSPACE_DIR, cwd) : WORKSPACE_DIR;

    // Security check to ensure targetCwd is within WORKSPACE_DIR
    if (!targetCwd.startsWith(WORKSPACE_DIR)) {
       return { success: false, error: 'Belirtilen dizin workspace dışında olamaz.' };
    }

    return new Promise((resolve) => {
      cp.exec(command, { cwd: targetCwd, timeout: 60000 }, (error, stdout, stderr) => {
        // Eğer komut hata verirse (test fail olursa), stderr veya stdout'u döndür ki R1 analiz edebilsin.
        if (error) {
          resolve({
            success: false,
            exitCode: error.code,
            output: stdout || stderr || error.message
          });
        } else {
          resolve({
            success: true,
            exitCode: 0,
            output: stdout
          });
        }
      });
    });
  },
};
