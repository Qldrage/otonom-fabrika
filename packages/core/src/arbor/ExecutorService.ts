import { HypothesisTree } from './HypothesisTree';

/**
 * ExecutorService.ts
 * 
 * Arbor mimarisinde kısa ömürlü (short-lived) Yürütücü (Executor) ajanları yönetir.
 * Ana koda (trunk) zarar vermemek için her bir hipotezi izole bir Git Worktree üzerinde test eder.
 */

export class ExecutorService {
  private tree: HypothesisTree;

  constructor(tree: HypothesisTree) {
    this.tree = tree;
  }

  /**
   * Seçilen düğümü test etmek için izole bir ortam (Worktree) başlatır ve yürütür.
   */
  public async dispatch(nodeId: string, hypothesis: string): Promise<void> {
    console.log(`[ExecutorService] Düğüm ${nodeId} için yeni Git Worktree oluşturuluyor...`);
    const branchName = `exp_${nodeId}`;
    
    // Sistem komutu mock: git worktree add ../experiments/${branchName} -b ${branchName}
    
    try {
      // Test yürütülür... (Mock Execution)
      console.log(`[ExecutorService] '${hypothesis}' hipotezi test ediliyor...`);
      
      const score = Math.floor(Math.random() * 100); // 0-100 arası mock skor
      const result = score > 80 ? "Test geçti." : "Test başarısız.";
      const insight = score > 80 ? "Yaklaşım doğru, kütüphane uyumlu." : "API rate limit aşıldı, farklı kütüphane denenmeli.";

      // Backpropagate (Sonuçları ağaca geri gönder)
      this.backpropagate(nodeId, score, result, insight, branchName);

    } catch (error) {
      this.backpropagate(nodeId, 0, "Crash", "Kod syntax hatası veya runtime çökmesi.", branchName);
    }
  }

  private backpropagate(nodeId: string, score: number, result: string, insight: string, codeRef: string): void {
    console.log(`[ExecutorService] Sonuçlar ağaca geri gönderiliyor (Backpropagate)... Düğüm: ${nodeId}`);
    this.tree.updateNodeEvidence(nodeId, score, result, insight, codeRef);
  }
}
