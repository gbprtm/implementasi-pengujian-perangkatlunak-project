# 10: Ringkasan harian `/api/summary`

**Ringkasan:** satu titik baca ringkasan harian untuk dashboard, tanpa menghitung ulang dari ribuan baris log.

**What to build:** dashboard dapat membaca ringkasan satu hari berisi target kalori, kalori terbakar, kalori masuk, sisa kalori, jumlah to-do selesai dan total, serta total durasi olahraga. Bila ringkasan belum ada, server menghitungnya dari sumber lalu menyimpannya. Pada Fase 1, kolom target dan kalori masuk bernilai nol karena target kalori harian termasuk Fase 2. Hanya pemilik data yang dapat membacanya, dan tanggal tanpa data mengembalikan nilai nol, bukan error.

**Blocked by:** 07, 09

**Status:** ready-for-agent

- [ ] `GET /api/summary?date=` mengembalikan target, terbakar, masuk, sisa, to-do, dan durasi
- [ ] Bila belum ada, ringkasan dihitung dari sumber lalu disimpan
- [ ] Perhitungan idempoten
- [ ] Tanggal tanpa data mengembalikan nilai nol, bukan error
- [ ] Hanya pemilik dapat membaca ringkasannya
- [ ] Ringkasan tanggal lampau dapat dihitung ulang
