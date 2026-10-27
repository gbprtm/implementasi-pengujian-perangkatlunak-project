# 12: Pengerasan, deploy, dan artefak uji

**Ringkasan:** menutup backend Fase 1 dengan bukti keamanan dan keandalan, lalu menerbitkannya agar dapat dipakai.

**What to build:** backend diuji menyeluruh untuk isolasi data antar pengguna, idempotensi, dan rollback, lalu di-deploy bersama migrasi Supabase. Koleksi Postman memuat semua endpoint Fase 1 termasuk kasus negatif. Tiket ini menghasilkan bukti yang dipakai pada laporan pengujian dan presentasi.

**Blocked by:** 11

**Status:** ready-for-agent

- [ ] Uji keamanan dua akun untuk setiap resource
- [ ] Uji keandalan: rollback dan idempotensi lulus
- [ ] Koleksi Postman memuat semua endpoint, termasuk tanpa sesi, input tidak valid, dan akses lintas pengguna
- [ ] Environment produksi dan migrasi Supabase siap
- [ ] Test case kalori terbakar MET 308 kcal lulus dari lingkungan terdeploy
- [ ] Backend terdeploy dan dapat diakses
- [ ] Catatan: test case baku PRD 9.2 (target kalori harian) menyusul di Fase 2
