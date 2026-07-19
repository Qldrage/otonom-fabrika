# Chrome DevTools MCP - Körlüğün Giderilmesi

Arayüz geliştirme süreçlerinde ajanlar, ürettikleri kodu doğrudan Chrome üzerinden test etmek zorundadır.
Bu entegrasyon sayesinde CORS hataları, 404 yanıtları ve DOM yapısal sorunları programatik olarak yakalanacaktır.

**Kullanım Kuralı:**
- UI değişiklikleri yapıldıktan sonra tarayıcı üzerinden kontrol edilmelidir (Point-to-Fix).
- Gerekirse Qwen-VL tabanlı modeller kullanılarak görsel kontrol (Set-of-Marks) yapılacaktır.
