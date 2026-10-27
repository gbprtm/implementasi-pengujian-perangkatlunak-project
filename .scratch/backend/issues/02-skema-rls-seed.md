# 02: Skema Fase 1, RLS, dan seed MET

**Ringkasan:** membuat tabel Fase 1 beserta aturan akses per pengguna, sehingga seluruh fitur punya tempat menyimpan data dan tidak ada kebocoran antar pengguna.

**What to build:** migrasi yang membuat tabel `profiles`, `weight_logs`, `exercise_logs`, `todos`, `daily_summaries`, dan `met_values`, dengan Row Level Security aktif dan pembatasan akses per pengguna. Tabel `met_values` diisi dari nilai MET di PRD bagian 9.2. Hasil dapat dibuktikan lewat uji isolasi dua pengguna: pengguna A tidak dapat melihat atau mengubah data pengguna B.

**Blocked by:** 01

**Status:** ready-for-agent

- [ ] Migrasi membuat keenam tabel Fase 1 dengan kolom utama sesuai PRD bagian 10
- [ ] Constraint unik `(user_id, date)` pada `weight_logs` dan `daily_summaries`
- [ ] RLS aktif pada semua tabel milik pengguna, `met_values` hanya baca
- [ ] Seed `met_values` sesuai tabel MET PRD bagian 9.2
- [ ] Uji membuktikan pengguna A tidak dapat membaca atau mengubah data pengguna B
- [ ] Migrasi berjalan dari database kosong
