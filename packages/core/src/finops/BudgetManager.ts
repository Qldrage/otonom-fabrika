import { CapabilityProfiler } from '../routing/CapabilityProfiler';

/**
 * BudgetManager.ts
 * 
 * Çoklu ajan sisteminin bütçe harcamasını (Token Maliyet Yönetişimi) denetleyen,
 * %70 (Remind), %90 (Warn) ve %100 (Pause/Abort) devre kesicilerini (Stop-Loss) uygulayan sınıf.
 */

export class BudgetManager {
  private profiler: CapabilityProfiler;

  constructor(profiler: CapabilityProfiler) {
    this.profiler = profiler;
  }

  /**
   * Çoklu Ajan vs Tekil Ajan Görev Öncesi Maliyet Tahmini (Pre-Spawn Estimation).
   */
  public estimateCostBeforeSpawn(taskType: string, singleAgentId: string, multiAgentIds: string[]): string {
    const singleProfile = this.profiler.getProfile(singleAgentId, taskType);
    const singleCost = singleProfile.avgTokensPerTask || 15000;

    let multiCost = 0;
    for (const agentId of multiAgentIds) {
      multiCost += this.profiler.getProfile(agentId, taskType).avgTokensPerTask || 12000;
    }
    // Ekstra iletişim vergisi (Overhead) varsayımı
    multiCost += 8000; 

    const diffPercent = ((multiCost - singleCost) / multiCost) * 100;

    if (multiCost > singleCost) {
      return `Tahmin: Tekil ajan ~${singleCost} token, çoklu ajan işbirliği ~${multiCost} token. %${diffPercent.toFixed(0)} token tasarrufu için tekil ajanı tercih edebilirsiniz.`;
    }
    return `Tahmin: Çoklu ajan kullanımı daha verimli görünüyor.`;
  }

  /**
   * Çalışma Zamanı Bütçe Monitörü (Runtime Stop-Loss).
   * Her adımda çağrılmalı ve bütçe eşiklerini kontrol etmelidir.
   */
  public checkRuntimeBudget(currentTokens: number, maxBudget: number): 'OK' | 'REMIND' | 'WARN' | 'PAUSE' {
    const usagePercent = currentTokens / maxBudget;

    if (usagePercent >= 1.0) {
      console.error("[FinOps] Bütçenin %100'ü tüketildi! Görev PAUSE durumuna alınıyor.");
      return 'PAUSE';
    } else if (usagePercent >= 0.90) {
      console.warn("[FinOps] Bütçe sınırına yaklaşılıyor (%90). Lütfen özetleyip hızla tamamlayın.");
      return 'WARN';
    } else if (usagePercent >= 0.70) {
      console.info("[FinOps] Bütçenin %70'i tüketildi. Lütfen verimliliği optimize edin.");
      return 'REMIND';
    }

    return 'OK';
  }
}
