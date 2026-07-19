import { Actor, Message } from './Actor';

/**
 * GenFSM.ts
 * 
 * Finite State Machine özellikli Aktör Sınıfı.
 * İnsan onayı (Human-in-the-Loop) bekleyen durumlar için süreci polling yapmadan
 * kalıcı olarak dondurur (Durable Suspend) ve onay/yanıt geldiğinde canlandırır (Resume).
 */

export abstract class GenFSM extends Actor {
  protected currentState: string = 'idle';

  constructor(id: string, initialState: any = {}) {
    super(id, initialState);
  }

  /**
   * Süreci kalıcı olarak askıya alır ve durumu 'awaiting_approval' yapar.
   * Bu fonksiyon çağrıldıktan sonra aktör belleği serbest bırakabilir.
   */
  public async suspend(workflowId: number, reason: string): Promise<void> {
    this.currentState = 'awaiting_approval';
    this.state.suspendReason = reason;
    console.log(`[GenFSM] Actor ${this.id} askıya alındı. Sebep: ${reason}`);
    // Durumu veritabanına kaydet (Serialization)
    await this.saveStateToDB(workflowId);
  }

  /**
   * İnsan tarafından incelenip onay veya yanıt geldiğinde süreci canlandırır.
   */
  public resume(responsePayload: any): void {
    if (this.currentState !== 'awaiting_approval') {
      throw new Error(`[GenFSM] Actor ${this.id} askıda değil.`);
    }

    console.log(`[GenFSM] Actor ${this.id} insan yanıtı ile uyandırıldı.`);
    this.currentState = 'idle';
    
    // Gelen yanıtı aktörün ana işleme mantığına yönlendir
    this.handleResume(responsePayload);
  }

  protected abstract handleResume(responsePayload: any): void;

  public async saveStateToDB(workflowId: number): Promise<void> {
    const { db } = await import('../db');
    const { actorStates } = await import('../db/schema');
    const { eq, and } = await import('drizzle-orm');

    // Var olan bir kaydı güncelle veya yeni ekle
    const existing = await db.select().from(actorStates).where(and(
      eq(actorStates.workflowId, workflowId),
      eq(actorStates.actorId, this.id)
    )).limit(1);

    if (existing.length > 0) {
      await db.update(actorStates)
        .set({
          fsmState: this.currentState,
          suspendReason: this.state.suspendReason,
          stateData: this.getState(),
          updatedAt: new Date()
        })
        .where(eq(actorStates.id, existing[0].id));
    } else {
      await db.insert(actorStates).values({
        workflowId,
        actorId: this.id,
        fsmState: this.currentState,
        suspendReason: this.state.suspendReason,
        stateData: this.getState()
      });
    }
  }

  public override getState(): any {
    return {
      baseState: super.getState(),
      fsmState: this.currentState
    };
  }

  public override restoreState(state: any): void {
    super.restoreState(state.baseState);
    this.currentState = state.fsmState;
  }
}
