# System Patterns (Mimari Kurallar)

## 1. Clean Architecture ve Veri Katmanı
- Veri katmanı **TurboRepo** monorepo mimarisi üzerine kurgulanacaktır.
- İlişkisel veriler için **WatermelonDB**, anahtar-değer önbellekleri için **MMKV** kullanılacaktır.

## 2. BaseEntity Kısıtlamaları (The Spine)
- Tüm veritabanı modellerinde ve nesnelerde zaman ve sahiplik damgaları zorunludur.
- Cihaz saatine güvenmek KESİNLİKLE YASAKTIR.
- **Kural:** Her veritabanı modelinde `server_id` (sunucudan gelen kimlik) ve `updated_at` (sunucu zaman damgası) alanları bulunmalıdır ("Server Timestamp is Truth").

## 3. Frontend Geliştirme Kısıtlamaları
- Herhangi bir frontend dosyasının (bileşen, sayfa) uzunluğu 300 satırı geçemez. Modüler yapı zorunludur.

## 4. Dayanıklı Yürütme ve B.A.R.T. Protokolü
- Ajanlar API çağrılarını SQLite günlüğüne yazarak çökmelere karşı zaman yolculuğu (Time-Travel/Idempotency) desteklemelidir.
- Hata ayıklama döngülerinde katı kurallar uygulanır:
  - 1-5. Deneme: Sözdizimi/Linter onarımları.
  - 6-10. Deneme: Stratejik Pivot (Yaklaşım değiştirme zorunluluğu).
  - 11+ Deneme: Kilitlenme Özeti (Stuck Brief) ve insan onayı bekleme.

## 5. Kademeli Keşif (Progressive Disclosure)
- Ajanlara tüm yetenekler aynı anda yüklenmez. Keşif -> Aktivasyon -> Yürütme sıralaması izlenir.
