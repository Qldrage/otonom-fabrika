/**
 * Actor.ts
 * 
 * "Dayanıklı Yürütme" (Durable Execution) mimarisine uygun temel Aktör arayüzü.
 * Ajanlar basit döngüler yerine birbirlerinden izole "Actor" yapıları olarak kurgulanmalıdır.
 */

export interface Message {
  type: string;
  payload: any;
  senderId?: string;
  idempotencyKey?: string;
}

export abstract class Actor {
  public readonly id: string;
  protected state: any;

  constructor(id: string, initialState: any = {}) {
    this.id = id;
    this.state = initialState;
  }

  /**
   * Aktörün ana mesaj işleme döngüsü.
   * Çökmeye karşı izole olmalı ve sadece mesajlaşma yoluyla dışarıyla konuşmalıdır.
   */
  public abstract receive(message: Message): Promise<void>;

  /**
   * Aktörün güncel state'ini döndürür (Journal Replay için serileştirme).
   */
  public getState(): any {
    return this.state;
  }

  /**
   * Journal'dan dönen (Replay) state ile aktörü canlandırır.
   */
  public restoreState(state: any): void {
    this.state = state;
  }
}
