# Project Brief: Çok-Kiracılı Otonom Esnaf İşletim Sistemi (Multi-Tenant Local Commerce OS)

## Vizyon
Bu proje, geleneksel yazılım süreçlerini otonom ajanlarla yöneterek esnaflar için yerel, çevrimdışı öncelikli (local-first) ve çok kiracılı bir işletim sistemi oluşturmayı amaçlar. Sistem, dayanıklı yürütme (durable execution) ve B.A.R.T hata ayıklama protokollerini temel alarak tasarlanmıştır.

## Temel Gereksinimler
- **Deterministik Yönetim:** Ajanlar kırılgan sohbet geçmişi yerine yapılandırılmış belleklere (`Memory Bank`) dayanmalıdır.
- **Paylaşımlı Karatahta:** Ajanlar arası koordinasyon Deno KV / SQLite tabanlı merkezi bir karatahta üzerinden sağlanmalıdır.
- **Local-First Veri Mimarisi:** İstemciler internet bağlantısı olmasa bile çalışabilmeli, veri eşitlemesi "Sunucu Zaman Damgası Mutlak Gerçektir" kuralıyla yapılmalıdır.
- **Progressive Disclosure:** Ajan yetenekleri ve bilgi yüklemesi kademeli olarak yapılmalıdır (SKILL.md formatı).
- **WebMCP Entegrasyonu:** Son kullanıcı web siteleri AI ajanları için makine okunabilir (declarative API ve imperative API ile) olmalıdır.
