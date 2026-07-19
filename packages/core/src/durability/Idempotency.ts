import { DurabilityJournal } from './Journal';

/**
 * Idempotency.ts
 * 
 * Dış dünyaya (write operation) etki eden araç çağrılarının, sistem Replay edilirken
 * ikinci kez çalışmasını önleyen koruma katmanı (Idempotency Key mekanizması).
 */

export class IdempotencyManager {
  private journal: DurabilityJournal;

  constructor(journal: DurabilityJournal) {
    this.journal = journal;
  }

  /**
   * Deterministik bir idempotency anahtarı üretir.
   */
  public generateKey(workflowId: string, stepId: string, payloadHash: string): string {
    return `${workflowId}::${stepId}::${payloadHash}`;
  }

  /**
   * Verilen fonksiyonu Idempotent (tekrarlanabilir ama tek sefer çalışan) hale getirir.
   * Önceden bu anahtarla çalışıp başarılı olmuşsa, önbellekteki/günlükteki sonucu döner.
   */
  public async runIdempotent<T>(
    idempotencyKey: string,
    action: () => Promise<T>,
    actorId: string
  ): Promise<T> {
    const history = await this.journal.getHistoryForReplay(actorId);
    
    // Daha önce bu anahtarla işlem yapılmış mı?
    const cachedEntry = history.find(e => e.message.idempotencyKey === idempotencyKey);
    
    if (cachedEntry && cachedEntry.status === 'COMPLETED') {
      console.log(`[Idempotency] ${idempotencyKey} zaten tamamlanmış. Önbellekten dönülüyor (Replay).`);
      return cachedEntry.result as T;
    }

    // Gerçek eylemi çalıştır
    console.log(`[Idempotency] ${idempotencyKey} ilk kez çalıştırılıyor.`);
    const sequence = await this.journal.recordStart(actorId, { idempotencyKey } as any);
    const result = await action();
    // ✅ DÜZELTME: Tamamlandığını journal'a yaz (önceden eksikti — idempotency garantisi kırıktı)
    await this.journal.recordCompletion(sequence, result);
    return result;

  }
}
