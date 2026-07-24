---
name: design-engineering
version: 1.0.0
priority: P1
trigger: frontend_ui_development
description: Apply when generating or modifying frontend UI components. Enforces Senior Design Engineer principles (Emil Kowalski motion, Impeccable vocabulary, Taste Skill aesthetics).
---

# Design Engineering (Tasarım Mühendisliği)

> Bu yetenek aktifleştiğinde, üretilen arayüz kodları (CSS, Tailwind, React bileşenleri) "Linear" veya "Vercel" gibi premium standartlara uymak zorundadır. Basit, ruhsuz veya jenerik "AI" tasarımları kesinlikle yasaktır.

## 1. Emil Kowalski: Motion & Micro-Interactions
Hareket (Motion), yazılımın görünmez ama en çok hissedilen detaykdır.
- **Spring (Yay) Fiziği:** Lineer (linear) veya ease-in-out geçişler yerine, her zaman doğal hissettiren spring tabanlı veya akıcı (fluid) transition'lar kullan. (Tailwind: `transition-all duration-300 ease-out`).
- **Anında Geri Bildirim:** Tıklama (active: `active:scale-95`), Üzerine Gelme (hover: renk/gölge değişimi) ve Odaklanma (focus: `focus-visible:ring`) anlarında UI'ın beklemeden akıcı tepki vermesini sağla. Gecikme (delay) ekleme.
- **Mikro Etkileşimler:** Sadece renk değişimi yetmez, ikonların hafifçe dönmesi veya butonların basılma hissiyatı (scale) zorunludur.

## 2. Impeccable: Design Vocabulary (Kusursuz Dağarcık)
Kod yazarken tipografi ve boşlukları bir tasarım sistemi mantığıyla uygula.
- **Tipografi:** Başlıklarda daha dar tracking (`tracking-tight`), metinlerde okunaklı satır yüksekliği (`leading-relaxed`). Başlıkların `font-semibold` veya `font-medium` ahengini koru.
- **Boşluk (Spacing):** 4pt/8pt grid sistemine tavizsiz uy. Dengesiz padding'ler kullanma. (Örn: İçerik ile buton arası `gap-4`, dış kenarlar `p-6`).
- **UX Metinleri (Microcopy):** Kullanıcıyı yönlendiren metinler net, güven verici ve profesyonel olmalıdır. Robotik dil kullanma.

## 3. Taste Skill: Aesthetic Equalizer (Zevk Parametreleri)
Premium bir görünüm için aşağıdaki estetik sınırları koru:
- **Renk Ahengi:** Nötr arkaplanlar (beyaz veya çok açık gri `bg-zinc-50`) üzerinde, katı siyah (`#000`) yerine çok koyu gri (`text-zinc-900`) kullan. Aksan renklerini sadece önemli eylemlere sakla.
- **Derinlik ve Gölgeler:** Siyah, sert gölgeler yerine geniş yayılımlı, yumuşak gölgeler (`shadow-sm`, `shadow-lg`, veya custom soft shadows) kullan. Yarı saydamlık (`backdrop-blur`, `bg-white/80`) etkilerini doğru yerlerde değerlendir.
- **Kenarlıklar (Borders):** İnce hatlı kenarlıklar (`border border-zinc-200/50`) ve modern yuvarlatılmış köşeler (`rounded-xl` veya `rounded-2xl`) kullan. 90 derece köşeler (rounded-none) sadece çok özel durumlarda kullanılabilir.
