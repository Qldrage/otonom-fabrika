/**
 * MemoryManager.ts
 * 
 * Ajan belleklerinin (Private, Team, Global) ayrıştırılması ve 
 * otonom terfi (Auto-promotion) kurallarının işletildiği Katmanlı Bellek Sınırları yöneticisi.
 */

export type MemoryLevel = 'private' | 'team' | 'global';

export interface MemoryRecord {
  id: string;
  content: string;
  level: MemoryLevel;
  referenceCount: number;
  referencedByAgents: Set<string>;
}

export class MemoryManager {
  private memories: Map<string, MemoryRecord> = new Map();

  /**
   * Yeni bir bellek girdisi oluşturur. Varsayılan olarak Private'tır.
   */
  public addMemory(content: string, authorId: string): string {
    // API Key, Şifre veya PII içeren veriler ASLA Team/Global olamaz.
    // ✅ DÜZELTME: hasSensitiveData kullanılıyordu ama hiçbir şey yapmıyordu. Artık metadata'ya ekleniyor.
    const hasSensitiveData = this.detectSensitiveData(content);
    
    const id = `mem_${Date.now()}`;
    this.memories.set(id, {
      id,
      content: hasSensitiveData ? '[REDACTED - Sensitive Data]' : content,
      level: 'private', // Hassas veri içersin ya da içermesin başlangıçta private
      referenceCount: 0,
      referencedByAgents: new Set([authorId])
    });

    if (hasSensitiveData) {
      console.warn(`[MemoryManager] ⚠️ Hassas veri tespit edildi. İçerik redakt edildi (mem: ${id}).`);
    }

    return id;
  }

  /**
   * Başka bir ajan bu belleği referans aldığında otonom terfi mekanizması tetiklenir.
   */
  public referenceMemory(memoryId: string, agentId: string): void {
    const mem = this.memories.get(memoryId);
    if (!mem) return;

    mem.referenceCount += 1;
    mem.referencedByAgents.add(agentId);

    this.checkAutoPromotion(mem);
  }

  private checkAutoPromotion(mem: MemoryRecord): void {
    // Hassas veri içeriyorsa Private kalmak ZORUNDADIR.
    if (this.detectSensitiveData(mem.content)) {
      mem.level = 'private';
      return;
    }

    // 3 veya daha fazla ajan referans gösteriyorsa "Team" seviyesine terfi et
    if (mem.level === 'private' && mem.referencedByAgents.size >= 3) {
      mem.level = 'team';
      console.log(`[MemoryManager] Bellek ${mem.id} 'team' seviyesine terfi etti.`);
    }
  }

  /**
   * Basit hassas veri tespiti (Mock implementation).
   */
  private detectSensitiveData(content: string): boolean {
    const sensitivePatterns = [/api[_-]?key/i, /password/i, /secret/i, /bearer\s+[\w-]+\.[\w-]+\.[\w-]+/i];
    return sensitivePatterns.some(pattern => pattern.test(content));
  }
}
