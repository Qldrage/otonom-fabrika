/**
 * HumanInTheLoop.ts
 * 
 * Güvenlik Ağ Geçidi'nin bir parçası. 
 * Ajanlar ödeme alma, veritabanı silme veya üretim ortamına deploy yapma gibi 
 * L3/L4 otonomi seviyesi işlemler talep ettiğinde devreye girer.
 */

export class HumanInTheLoop {
  private pendingRequests: Map<string, any> = new Map();

  /**
   * Kritik bir işlem talebi geldiğinde işlemi dondurup insan onayı bekler.
   */
  public requestApproval(actionType: string, payload: any): string {
    const isCritical = ["DELETE_DATA", "PROCESS_PAYMENT", "PROD_DEPLOY"].includes(actionType);

    if (isCritical) {
      const requestId = `req_${Date.now()}`;
      this.pendingRequests.set(requestId, { actionType, payload, status: 'awaiting_approval' });
      
      console.warn(`[HumanInTheLoop] KRİTİK İŞLEM: '${actionType}'. İşlem 'awaiting_approval' durumuna alındı. İnsan onayı bekleniyor.`);
      return requestId;
    }

    // Kritik değilse direkt çalıştır
    return "APPROVED_AUTO";
  }

  /**
   * Proje Yöneticisi işlemi manuel onayladığında çağrılır.
   */
  public approve(requestId: string): boolean {
    const req = this.pendingRequests.get(requestId);
    if (req && req.status === 'awaiting_approval') {
      req.status = 'approved';
      console.log(`[HumanInTheLoop] İşlem Onaylandı: ${requestId}`);
      return true;
    }
    return false;
  }
}
