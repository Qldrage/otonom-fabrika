# Otonom Fabrika — AI Agent Framework

Her yeni proje için bu repoyu kopyalayarak başla.

## Yapı

```
otonom-fabrika/
├── .agents/              # Ajan protokolleri ve skill dosyaları
│   └── skills/
│       ├── otonom-architect-protocol/   # Baş Mimar kuralları
│       ├── otonom-fabrika-core-rules/   # Flash İşçi kuralları
│       └── ...
├── .github/
│   └── workflows/
│       └── ci.yml        # Otomatik lint + test (her push'ta çalışır)
├── packages/
│   ├── core/             # Ajan motoru (Actor, LLM Router, Orchestrator...)
│   └── database/         # Drizzle + Postgres şema altyapısı
└── apps/                 # Buraya projeyi inşa et
    └── (boş — yeni proje buraya gelir)
```

## Yeni Proje Başlatmak

1. Bu repoyu kopyala (fork veya ZIP)
2. `apps/` altına proje klasörünü oluştur
3. `packages/core`'u import ederek ajan motorunu kullan
4. `npm run dev` ile başlat

## Geliştirme Kuralları

- **Mimar (Pro):** `.agents/skills/otonom-architect-protocol/SKILL.md`
- **İşçi (Flash):** `.agents/skills/otonom-fabrika-core-rules/SKILL.md`
- Kod yazılmadan önce `implementation_plan.md` oluşturulur
- Her PR'da CI otomatik lint + test çalıştırır

## Komutlar

```bash
npm run dev       # Geliştirme sunucusu
npm run build     # Production build
npm run lint      # TypeScript tip kontrolü
npm test          # Tüm testleri çalıştır
```

## packages/core İçeriği

| Modül | Ne Yapar |
|---|---|
| `actor/` | Dayanıklı Actor model (Erlang tarzı) |
| `llm/` | LLM Router — model seçimi ve yönlendirme |
| `coordination/` | Çoklu ajan orkestrasyon |
| `memory/` | Ajan bellek yönetimi |
| `mcp/` | Model Context Protocol entegrasyonu |
| `tools/` | Ajan araçları (komut çalıştırma vb.) |
| `security/` | Güvenlik katmanı |
| `utils/` | JSON parser ve yardımcı fonksiyonlar |
