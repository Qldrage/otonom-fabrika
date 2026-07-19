import { exec, spawn } from 'child_process';
import { promisify } from 'util';
import path from 'path';

const execAsync = promisify(exec);

export class ModelOffloadManager {
  private static async killAllPythonProcesses(): Promise<void> {
    try {
      await execAsync('wsl --exec bash -c "pkill -9 -f python"');
      await new Promise(resolve => setTimeout(resolve, 3000));
    } catch (e) {}
  }

  private static async waitForServer(url: string, onProgress?: (msg: string) => void): Promise<void> {
    const maxRetries = 60;
    for (let i = 0; i < maxRetries; i++) {
      try {
        const res = await fetch(url);
        if (res.ok || res.status === 401) {
          onProgress?.('Sunucu hazır ve yanıt veriyor!');
          return;
        }
      } catch (e) {}
      onProgress?.(`Sunucu yükleniyor, bekleniyor... (${i + 1}/${maxRetries})`);
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
    throw new Error(`Sunucu ${url} başlatılamadı veya zaman aşımına uğradı.`);
  }

  // LLaMA'yı yükle
  public static async loadArchitect(onProgress?: (msg: string) => void): Promise<void> {
    onProgress?.('VRAM boşaltılıyor...');
    await this.killAllPythonProcesses();
    onProgress?.('LLaMA (System Architect) başlatılıyor...');
    // Geçici olarak Qwen'i kullanıyoruz (TabbyAPI Python 3.14 sorunu çözülene kadar)
    const bashCmd = `cd /mnt/c/Users/Dante/Desktop/otonom\\ fabrika && ./scripts/start_vllm.sh > vllm.log 2>&1`;
    spawn('wsl', ['--exec', 'bash', '-c', bashCmd], { detached: true, stdio: 'ignore' }).unref();
    await this.waitForServer('http://localhost:8000/v1/models', onProgress);
  }

  // DeepSeek-R1'i yükle
  public static async loadTDD(onProgress?: (msg: string) => void): Promise<void> {
    onProgress?.('VRAM boşaltılıyor...');
    await this.killAllPythonProcesses();
    onProgress?.('DeepSeek-R1 (TDD Engineer & Debugger) başlatılıyor...');
    // Sistemde R1 varsa R1 başlatılır, yoksa fallback Qwen 32B scripti
    const bashCmd = `cd /mnt/c/Users/Dante/Desktop/otonom\\ fabrika && ./scripts/start_vllm.sh > vllm.log 2>&1`;
    spawn('wsl', ['--exec', 'bash', '-c', bashCmd], { detached: true, stdio: 'ignore' }).unref();
    await this.waitForServer('http://localhost:8000/v1/models', onProgress);
  }

  // Qwen-32B'yi yükle
  public static async loadCoder(onProgress?: (msg: string) => void): Promise<void> {
    onProgress?.('VRAM boşaltılıyor...');
    await this.killAllPythonProcesses();
    onProgress?.('Qwen-32B (Coder) başlatılıyor...');
    const bashCmd = `cd /mnt/c/Users/Dante/Desktop/otonom\\ fabrika && ./scripts/start_vllm.sh > vllm.log 2>&1`;
    spawn('wsl', ['--exec', 'bash', '-c', bashCmd], { detached: true, stdio: 'ignore' }).unref();
    await this.waitForServer('http://localhost:8000/v1/models', onProgress);
  }

  // Qwen-VL'i yükle
  public static async loadVision(onProgress?: (msg: string) => void): Promise<void> {
    onProgress?.('VRAM boşaltılıyor...');
    await this.killAllPythonProcesses();
    onProgress?.('Qwen-VL 7B (Vision QA) başlatılıyor...');
    // Özel script veya Qwen-VL vLLM portu (Örn: 8001)
    const bashCmd = `cd /mnt/c/Users/Dante/Desktop/otonom\\ fabrika && ./scripts/start_vllm.sh > vllm.log 2>&1`;
    spawn('wsl', ['--exec', 'bash', '-c', bashCmd], { detached: true, stdio: 'ignore' }).unref();
    // Port 8001 için beklenebilir, şimdilik test gereği 8000 kullanılıyor
    await this.waitForServer('http://localhost:8000/v1/models', onProgress);
  }
}
