# 01: Kerangka proyek, harness uji, dan kontrak respons

**Ringkasan:** menyiapkan fondasi agar setiap tiket backend berikutnya dapat dijalankan dan diverifikasi sendiri.

**What to build:** aplikasi Next.js dengan TypeScript yang berjalan, satu endpoint kesehatan yang membalas `{ data, error }`, dan harness pengujian yang dapat menjalankan unit serta integrasi terhadap database uji. Setelah tiket ini selesai, seorang pengembang dapat menambah endpoint baru dan langsung mengujinya tanpa menyentuh infrastruktur lagi.

**Blocked by:** None (can start immediately)

**Status:** ready-for-agent

- [ ] Aplikasi menyala lewat perintah dev tanpa error
- [ ] `/api/health` membalas `{ data, error }` dengan status yang benar
- [ ] Skrip uji menjalankan Vitest unit dan integrasi
- [ ] Integrasi dapat terhubung ke database uji terpisah
- [ ] Pipeline CI menjalankan lint, type check, dan uji
- [ ] Helper respons seragam `{ data, error }` tersedia untuk dipakai tiket lain
