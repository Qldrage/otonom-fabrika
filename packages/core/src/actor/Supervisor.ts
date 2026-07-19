import { Actor, Message } from './Actor';

/**
 * Supervisor.ts
 * 
 * Hata izolasyonu (Fault Isolation) sağlayan gözetmen sınıfı.
 * 'one_for_one' yeniden başlatma stratejisi ile: Bir alt ajan veya araç çöktüğünde
 * ana orkestratör çökmez; sadece ilgili aktör temiz bir durum (clean state) ile yeniden başlatılır.
 */

export class Supervisor {
  private actors: Map<string, Actor> = new Map();
  private initialStates: Map<string, any> = new Map();

  public register(actor: Actor, initialState: any) {
    this.actors.set(actor.id, actor);
    this.initialStates.set(actor.id, initialState);
  }

  public async dispatch(actorId: string, message: Message): Promise<void> {
    const actor = this.actors.get(actorId);
    if (!actor) {
      throw new Error(`Actor [${actorId}] bulunamadı.`);
    }

    try {
      await actor.receive(message);
    } catch (error) {
      console.error(`[Supervisor] Actor ${actorId} çöktü. one_for_one restart uygulanıyor...`, error);
      this.restartOneForOne(actorId);
    }
  }

  /**
   * Çöken aktörü başlangıç durumuyla sıfırlar.
   */
  private restartOneForOne(actorId: string): void {
    const actor = this.actors.get(actorId);
    const initialState = this.initialStates.get(actorId);
    if (actor && initialState) {
      actor.restoreState(JSON.parse(JSON.stringify(initialState)));
      console.log(`[Supervisor] Actor ${actorId} başarıyla restart edildi.`);
    }
  }
}
