/**
 * BlackboardService.ts
 * 
 * Ajanların birbirlerinin sohbet geçmişlerini okumasını engelleyen,
 * merkezi "Publish/Subscribe" (Yayınla/Abone ol) tabanlı karatahta servisi.
 * Deno KV veya SQLite kullanılarak kalıcılık sağlanır.
 */

export interface BlackboardEntry {
  id: string;
  topic: string;
  content: string;
  authorId: string;
  createdAt: number;
  expiresAt: number;
  reactionCount: number;
  isPinned: boolean;
}

export class BlackboardService {
  private entries: Map<string, BlackboardEntry> = new Map();

  /**
   * Yeni bir bilgi yayınlar. Varsayılan ömür 7 gündür.
   */
  public publish(topic: string, content: string, authorId: string, isPinned: boolean = false): string {
    const id = `entry_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    const now = Date.now();
    const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;
    
    const entry: BlackboardEntry = {
      id,
      topic,
      content,
      authorId,
      createdAt: now,
      expiresAt: isPinned ? Infinity : now + SEVEN_DAYS,
      reactionCount: 0,
      isPinned
    };

    this.entries.set(id, entry);
    console.log(`[Blackboard] Yeni bilgi paylaşıldı: ${topic} (Author: ${authorId})`);
    return id;
  }

  /**
   * Karatahtadan konu bazlı veya genel arama yapar. Süresi dolmuş bilgileri eler.
   */
  public query(topic?: string): BlackboardEntry[] {
    const now = Date.now();
    const results: BlackboardEntry[] = [];

    for (const entry of this.entries.values()) {
      if (entry.expiresAt < now) {
        this.entries.delete(entry.id); // Süresi dolmuş bilgiyi sil
        continue;
      }
      if (!topic || entry.topic === topic) {
        results.push(entry);
      }
    }

    return results;
  }

  /**
   * "Faydalı" reaksiyonu eklendiğinde girdinin ömrünü uzatır.
   */
  public reactToEntry(id: string, reactionType: 'useful' | 'outdated'): void {
    const entry = this.entries.get(id);
    if (!entry) return;

    if (reactionType === 'useful') {
      entry.reactionCount += 1;
      if (!entry.isPinned) {
        // Ömrünü 3 gün daha uzat
        entry.expiresAt += 3 * 24 * 60 * 60 * 1000;
      }
    } else if (reactionType === 'outdated') {
      // Ömrünü hızla kısalt
      entry.expiresAt = Date.now() - 1000;
    }
  }
}
