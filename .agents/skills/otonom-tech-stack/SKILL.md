---
name: otonom-tech-stack
description: Otonom Fabrika için onaylanmış kurumsal teknoloji yığını ve kodlama standartları. Sadece web/SaaS projesi geliştirilirken okunmalıdır.
---

# OTONOM FABRİKA - KURUMSAL TEKNOLOJİ YIĞINI

Bu yetenek, projenin teknoloji standartlarını belirler. Sıfırdan bir web uygulaması veya SaaS geliştirirken bu kurallara KESİN olarak uyulmalıdır.

### 1. Resmi Kimlik Doğrulama Standardı (Authentication Protocol)
Projelerde kullanıcı girişi (Login/Register/Session) gerektiğinde tekerleği yeniden icat etmek yasaktır.
- Otonom Fabrika'nın **VARSAYILAN** kimlik doğrulama çözümü **Better-Auth** (veya NextAuth/Auth.js)'dir.
- Ajanlar, sıfırdan şifreleme mantığı yazmak yerine, projeye Better-Auth entegre etmeli ve şemaları Drizzle ORM ile senkronize etmelidir.

### 2. Dosya Depolama ve Medya (Blob/S3 Storage Standardı)
Kullanıcıların yükleyeceği fotoğraflar, belgeler veya medya dosyaları KESİNLİKLE yerel `public/` veya `uploads/` klasörüne kaydedilemez.
- **VARSAYILAN:** AWS S3, Cloudflare R2 veya yerel MinIO gibi S3-uyumlu Object Storage kullanılır.

### 3. Form Doğrulama ve Veri Güvenliği Zehri (Zod + React Hook Form)
Spagetti kodlamayı ve güvenlik açıklarını önlemek için katı form kuralları geçerlidir:
- Uygulama içindeki tüm form yapıları sadece `react-hook-form` kullanılarak inşa edilmelidir.
- Tüm veriler (hem Client hem Server tarafında) kesinlikle `zod` şemaları kullanılarak doğrulanmalıdır.

### 4. Canlı Veritabanı Koruma Protokolü (Production Migrations)
Veri kaybını önlemek için Drizzle ORM kullanımı ortam bazlı sınırlandırılmıştır:
- Local geliştirme sırasında `drizzle-kit push` kullanılabilir.
- Canlıya (Production) çıkarken veya mevcut veri varken `push` YASAKTIR. `drizzle-kit generate` ve `drizzle-kit migrate` kullanılmalıdır.

### 5. E-Posta ve Bildirim Standardı (Notification Protocol)
- Sistemden gönderilecek tüm e-postalar için **VARSAYILAN** çözüm **Resend** + **React Email**'dir. Eski nesil SMTP kütüphaneleri (Nodemailer vb.) kullanılmamalıdır.

### 6. Çevre Değişkeni Zırhı (Type-Safe Env Variables)
- Projelerde `process.env.KEY` doğrudan kullanılamaz. Tüm ortam değişkenleri, uygulama ayağa kalkarken **T3-Env (Zod)** ile doğrulanmalıdır.

### 7. Kurumsal Loglama Standardı (Structured JSON Logging)
- Canlı ortamda `console.log` KESİNLİKLE YASAKTIR. Tüm loglar, **Pino** veya **Winston** kütüphaneleri kullanılarak JSON formatında atılmalıdır.

### 8. Zaman ve Tarih Yönetimi (Timezone Protocol)
- Tarih hesaplamalarında çıplak JS `Date` objesi kullanılamaz.
- Tüm veritabanı tarih kayıtları kesinlikle **UTC** formatında tutulmalıdır.
- Manipülasyon işlemleri **date-fns** veya **dayjs** ile yapılmalıdır.

### 9. Hız Sınırlandırması ve Anti-Abuse (Rate Limiting)
- Dışarıya açık tüm API uç noktaları mutlaka Rate Limiting ile korunmalıdır. **VARSAYILAN:** Upstash Redis Rate Limiting.

### 10. Uluslararasılaştırma (i18n)
- Ajanlar projeyi başından itibaren **next-intl** (veya i18next) kütüphanesiyle, çoklu dil desteğine hazır inşa etmelidir.

### 11. Karanlık Mod (Dark Mode) ve Tasarım Jetonları
- Hex renk kodlarını (`#ffffff`) doğrudan koda yazmak YASAKTIR.
- Tüm renkler tasarım jetonları (Örn: `bg-background`) kullanılarak atanmalıdır.

### 12. Önbellekleme (Caching & Redis Strategy)
- Sık okunan veriler ve oturum durumları **Redis (Upstash)** üzerinde önbelleğe alınmalıdır.

### 13. Global Hata Yönetimi (Error Boundaries & Fallbacks)
- Tüm rotalar Global Error Boundary (`error.tsx`) ile sarmalanmalı ve estetik hata ekranları tasarlanmalıdır.
