import { HypothesisTree, TreeNode } from './HypothesisTree';

/**
 * Coordinator.ts
 * 
 * Arbor (Hipotez Ağacı) Koordinatörü.
 * Ajan araştırmasının global durumunu Observe, Ideate, Select ve Decide döngüleriyle yönetir.
 */

export class Coordinator {
  private tree: HypothesisTree;

  constructor(tree: HypothesisTree) {
    this.tree = tree;
  }

  public observe(): void {
    // Ağacın güncel durumunu değerlendir.
    console.log("[Coordinator] Ağaç gözlemleniyor...");
  }

  public ideate(parentId: string, hypothesis: string): string {
    // Yeni bir fikir üretip ağaca ekler.
    const id = `node_${Date.now()}`;
    const node: TreeNode = {
      id,
      parentId,
      childrenIds: [],
      depth: parentId === 'ROOT' ? 1 : 2, // Basit mock
      hypothesis,
      status: 'pending',
      score: null,
      result: '',
      insight: '',
      codeRef: null
    };
    
    this.tree.addNode(node);
    console.log(`[Coordinator] Yeni hipotez eklendi: ${id}`);
    return id;
  }

  public select(): string | null {
    // Uygulanması (test edilmesi) en mantıklı node'u seçer (dispatch için).
    console.log("[Coordinator] Uygulanacak en iyi düğüm seçiliyor...");
    return "node_id_mock"; 
  }

  public decide(nodeId: string): void {
    const node = this.tree.getNode(nodeId);
    if (!node) return;

    if (node.score !== null && node.score > 90) { // Eşik değeri
      node.status = 'merged';
      console.log(`[Coordinator] Düğüm ${nodeId} onaylandı ve Merge edilecek.`);
    } else {
      node.status = 'pruned';
      console.log(`[Coordinator] Düğüm ${nodeId} başarısız oldu (Pruned). İçgörüler saklandı.`);
    }
  }
}
