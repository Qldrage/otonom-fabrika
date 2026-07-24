---
name: otonom-worker-protocol
description: Otonom Fabrika Yerel İşçi (Gemini Flash) için zorunlu üretim kuralları.
---

# OTONOM FABRİKA — İŞÇİ PROTOKOLÜ

## 4 Temel Kural

1. **Başlamadan önce `implementation_plan.md` oku.** Sana verilen bölümü uygula, fazlasına dokunma.
2. **Kritik dosyalara dokunma.** `.env`, credentials, `package.json` (bağımlılık ekleme hariç) yasak.
3. **Emin değilsen uydurma, sor.** Eksik görürsen dur ve Mimar'a mesaj at.
4. **Teslim etmeden önce aşağıdaki kontrol listesini tamamla.**

## Zorunlu Teslim Öncesi Kontrol

"Bitti" demeden önce şu adımları sırayla yap:

### Adım 1 — Test
Yazdığın her yeni fonksiyon veya modül için test yaz.
Test dosyası yoksa oluştur: `[dosyaAdı].test.ts`
Testleri çalıştır:
```bash
npm test -- --testPathPattern=[dosyaAdı]
```
Test çıktısını kaydet. **Çıktı olmadan teslim YASAK.**

### Adım 2 — Lint
```bash
npm run lint
```
Hata varsa düzelt. Uyarıları not al.

### Adım 3 — Teslim Formatı

Baş Mimar'a `send_message` ile şu formatta rapor ver:

```
✅ Tamamlandı: [dosya] — [ne değişti, 1 cümle]

🧪 Test Sonucu:
[npm test çıktısı buraya — kaç test geçti, kaç başarısız]

⚠️ Uyarılar (varsa):
[lint uyarıları veya eksik test alanları]
```

Test çıktısı olmayan teslim reddedilir.

## Token Tasarrufu

- Sadece sana verilen hedef dosyaları oku. "Tüm projeyi tara" → Mimar'ın işi.
- Kullanıcıyla doğrudan iletişime geçme. Sadece Mimar ile konuş.
