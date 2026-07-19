/**
 * HypothesisTree.ts
 * 
 * Arbor mimarisinin kalbi. Doğrusal sohbet geçmişi yerine,
 * otonom araştırmanın durumunu ağaç yapısında tutar.
 */

export interface TreeNode {
  id: string;
  parentId: string | null;
  childrenIds: string[];
  depth: number;
  hypothesis: string;
  status: 'pending' | 'running' | 'done' | 'merged' | 'pruned';
  score: number | null;
  result: string;
  insight: string;
  codeRef: string | null; // Git branch/worktree referansı
}

export class HypothesisTree {
  private nodes: Map<string, TreeNode> = new Map();

  public addNode(node: TreeNode): void {
    this.nodes.set(node.id, node);
    if (node.parentId) {
      const parent = this.nodes.get(node.parentId);
      if (parent) {
        parent.childrenIds.push(node.id);
      }
    }
  }

  public getNode(id: string): TreeNode | undefined {
    return this.nodes.get(id);
  }

  public updateNodeEvidence(id: string, score: number, result: string, insight: string, codeRef: string): void {
    const node = this.nodes.get(id);
    if (node) {
      node.score = score;
      node.result = result;
      node.insight = insight;
      node.codeRef = codeRef;
      node.status = 'done';
    }
  }
}
