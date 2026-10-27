# 11: Analitik `/api/analytics` rentang 7/30/90

**Ringkasan:** menyajikan data grafik deskriptif untuk halaman analitik.

**What to build:** server menyajikan seri analitik untuk rentang 7, 30, atau 90 hari: berat badan dengan garis target, frekuensi dan durasi olahraga per minggu, serta progres penyelesaian to-do harian. Data diambil dari tabel agregasi sehingga dashboard dan grafik tidak menghitung ulang dari log mentah.

**Blocked by:** 10

**Status:** ready-for-agent

- [ ] `GET /api/analytics?range=` menerima 7, 30, dan 90 hari
- [ ] Seri berat badan menyertakan garis target
- [ ] Seri frekuensi dan durasi olahraga dikelompokkan per minggu
- [ ] Seri progres to-do per hari
- [ ] Rentang tidak valid ditolak
- [ ] Waktu baca p95 di bawah 500 ms pada data uji
- [ ] Tanggal tanpa data tidak menghasilkan error
