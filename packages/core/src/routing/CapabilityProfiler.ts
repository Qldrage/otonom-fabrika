/**
 * CapabilityProfiler.ts
 * 
 * Ajanların geçmiş görev başarı oranlarına (ELO) ve token verimliliklerine göre profillenmesini
 * sağlayan ve yönlendirme (Dispatch) sırasında otonom öneriler sunan sınıf.
 */

export interface PerformanceRecord {
  agentId: string;
  taskType: string;
  success: boolean;
  tokensConsumed: number;
  durationMs: number;
}

export interface CapabilityProfile {
  agentId: string;
  successRate: number; // 0.0 to 1.0
  avgTokensPerTask: number;
  totalTasks: number;
}

export class CapabilityProfiler {
  private records: PerformanceRecord[] = [];

  /**
   * Görev bittiğinde (başarılı/başarısız) performansı kaydeder.
   */
  public logPerformance(record: PerformanceRecord): void {
    this.records.push(record);
  }

  /**
   * Belirli bir ajan veya görev türü için ajanın yetenek profilini (ELO) hesaplar.
   */
  public getProfile(agentId: string, taskType?: string): CapabilityProfile {
    const relevantRecords = this.records.filter(r => 
      r.agentId === agentId && (!taskType || r.taskType === taskType)
    );

    if (relevantRecords.length === 0) {
      return { agentId, successRate: 0, avgTokensPerTask: 0, totalTasks: 0 };
    }

    const successfulTasks = relevantRecords.filter(r => r.success).length;
    const totalTokens = relevantRecords.reduce((sum, r) => sum + r.tokensConsumed, 0);

    return {
      agentId,
      successRate: successfulTasks / relevantRecords.length,
      avgTokensPerTask: totalTokens / relevantRecords.length,
      totalTasks: relevantRecords.length
    };
  }

  /**
   * sessions_spawn aşamasından önce, göreve en uygun ajan kombinasyonunu önerir.
   */
  public suggestDispatch(taskType: string, candidateAgentIds: string[]): string {
    let bestAgent = candidateAgentIds[0];
    let bestScore = -1;

    for (const agentId of candidateAgentIds) {
      const profile = this.getProfile(agentId, taskType);
      
      // Basit Eşleştirme Formülü (ELO): Başarı Oranı ağırlıklı, ancak Token Maliyeti cezalandırıcı.
      // Örn: (0.92 * 100) - (18000 / 1000) = 92 - 18 = 74 score
      const score = profile.totalTasks === 0 ? 50 : // Yeni ajanlar için başlangıç skoru (50)
        (profile.successRate * 100) - (profile.avgTokensPerTask / 1000);

      if (score > bestScore) {
        bestScore = score;
        bestAgent = agentId;
      }
    }

    return bestAgent;
  }
}
