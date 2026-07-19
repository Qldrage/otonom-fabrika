import { z } from 'zod';
import * as fs from 'fs/promises';
import * as path from 'path';

/**
 * FileTools.ts
 * Ajanların disk üzerinde okuma/yazma yapmasını sağlayan araç setidir.
 * Güvenlik için sadece izin verilen bir çalışma dizininde (Workspace) işlem yapabilirler.
 */

const WORKSPACE_DIR = path.resolve(process.env.WORKSPACE_DIR ?? './workspace');

// Çalışma dizini yoksa oluştur
fs.mkdir(WORKSPACE_DIR, { recursive: true }).catch(() => {});

function getSafePath(relativePath: string): string {
  const safePath = path.resolve(WORKSPACE_DIR, relativePath);
  if (!safePath.startsWith(WORKSPACE_DIR)) {
    throw new Error(`Güvenlik ihlali! Workspace dışına erişim yasak: ${relativePath}`);
  }
  return safePath;
}

export const readFileTool = {
  description: 'Verilen dosyanın içeriğini okur.',
  parameters: z.object({
    filePath: z.string().describe('Okunacak dosyanın göreceli yolu (örn: src/App.tsx)'),
  }),
  execute: async (args: any) => {
    const { filePath } = args;
    try {
      const fullPath = getSafePath(filePath);
      const content = await fs.readFile(fullPath, 'utf-8');
      return { success: true, content };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  },
};

export const writeToFileTool = {
  description: 'Verilen dosyaya belirtilen içeriği yazar (üzerine yazar veya yeni oluşturur).',
  parameters: z.object({
    filePath: z.string().describe('Yazılacak dosyanın göreceli yolu (örn: src/App.tsx)'),
    content: z.string().describe('Dosyaya yazılacak kod veya metin içeriği'),
  }),
  execute: async (args: any) => {
    const { filePath, content } = args;
    try {
      const fullPath = getSafePath(filePath);
      await fs.mkdir(path.dirname(fullPath), { recursive: true });
      await fs.writeFile(fullPath, content, 'utf-8');
      return { success: true, message: `${filePath} başarıyla yazıldı.` };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  },
};

export const fileTools = {
  readFile: readFileTool,
  writeFile: writeToFileTool,
};
