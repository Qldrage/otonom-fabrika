---
name: webwright-automation
version: 1.0.0
priority: P1
trigger: e2e_testing, browser_automation, user_journey_validation
description: Microsoft Research WebWright tabanlı Uçtan Uca (E2E) tarayıcı otomasyon kuralları. Yapay zekanın Playwright kodu yazarak tarayıcıyı kontrol etmesini sağlar.
---

# WebWright: Uçtan Uca (E2E) Tarayıcı Otomasyonu

> Bu yetenek aktifleştiğinde, ajanların arayüzleri test etmek için rastgele DOM elementlerine veya koordinatlara "tıklama tahmini" yapması YASAKTIR. Tüm tarayıcı işlemleri, doğrulanabilir ve tekrar kullanılabilir Playwright kodları olarak yazılmalıdır.

## 1. Code-as-Action (Eylem Olarak Kod)
- Tarayıcıda bir etkileşim (tıklama, form doldurma, sayfa geçişi) gerekiyorsa, bunu doğrudan **Playwright (TypeScript)** veya eşdeğeri otomasyon kodları yazarak gerçekleştir.
- Kodların sağlam (robust) olması için kırılgan CSS class'ları yerine test id'leri (`data-testid`) veya ARIA rollerini (`getByRole`) kullanarak elementleri seç (`getByRole('button', { name: 'Giriş' })`).

## 2. Tek Kullanımlık Tarayıcılar (Ephemeral Browsers)
- Her otomasyon görevi, izole (headless) bir tarayıcı oturumu başlatmalıdır.
- Görev (veya test) bittiğinde tarayıcı oturumu kapatılmalı, arkada asılı (zombie) process bırakılmamalıdır.

## 3. Kalıcı ve Tekrar Kullanılabilir Eserler (Artifacts)
- Geliştirilen E2E senaryoları çöpe atılmaz. Tüm Playwright test komut dosyaları, projenin E2E test klasörüne (örn. `e2e/` veya `tests/e2e/`) uygun bir isimle (örn. `checkout-flow.spec.ts`) kaydedilmelidir.
- Kodlar CI/CD pipeline'larında insan müdahalesi olmadan çalışabilecek standartta olmalıdır.
