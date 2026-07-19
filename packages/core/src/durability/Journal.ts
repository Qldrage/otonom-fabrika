/**
 * Journal.ts
 * 
 * Uçuş Kaydedici (Journal Replay) ve Durum Yönetimi.
 * Ajanın attığı her adım ve mesaj SQLite tabanlı (mocklanmış) bir günlüğe yazılır.
 * Çökme durumunda bu event history baştan sona oynatılarak (Replay) süreç kaldığı yerden devam eder.
 */

import { Message } from '../actor/Actor';

export interface JournalEntry {
  sequence: number;
  actorId: string;
  message: Message;
  result?: any;
  status: 'PENDING' | 'COMPLETED' | 'FAILED';
  timestamp: Date;
}

export class DurabilityJournal {
  // Gerçek projede SQLite veya AsyncPostgresSaver olacaktır.
  private events: JournalEntry[] = [];
  private sequenceCounter = 0;

  /**
   * İşlemden önce günlüğe kaydeder.
   */
  public async recordStart(actorId: string, message: Message): Promise<number> {
    const seq = ++this.sequenceCounter;
    this.events.push({
      sequence: seq,
      actorId,
      message,
      status: 'PENDING',
      timestamp: new Date()
    });
    // SQL: INSERT INTO journal ...
    return seq;
  }

  /**
   * İşlem başarılı olduğunda günceller.
   */
  public async recordCompletion(sequence: number, result: any): Promise<void> {
    const entry = this.events.find(e => e.sequence === sequence);
    if (entry) {
      entry.status = 'COMPLETED';
      entry.result = result;
      // SQL: UPDATE journal SET status = 'COMPLETED' ...
    }
  }

  /**
   * Çökme sonrası sistemi ayağa kaldırırken geçmişi oynatır (Replay).
   */
  public async getHistoryForReplay(actorId: string): Promise<JournalEntry[]> {
    // SQL: SELECT * FROM journal WHERE actorId = ? ORDER BY sequence ASC
    return this.events.filter(e => e.actorId === actorId && e.status === 'COMPLETED');
  }
}
