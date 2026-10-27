# 04: Profil pengguna dan berat awal

**Ringkasan:** menyimpan profil yang menjadi dasar validasi dan perhitungan fitur lain, sekaligus mencatat berat awal ke riwayat berat.

**What to build:** pengguna dapat mengisi dan mengubah profil berisi nama, jenis kelamin, tanggal lahir, tinggi, tingkat aktivitas, tujuan, target berat, dan zona waktu. Saat profil dibuat, berat awal ditulis ke riwayat berat bila belum ada catatan pada hari itu. Validasi rentang dijalankan di server dengan Zod sehingga input di luar batas ditolak dan tidak ada data tersimpan.

**Blocked by:** 03

**Status:** ready-for-agent

- [ ] `GET /api/profile` mengembalikan profil atau null
- [ ] `PUT /api/profile` membuat atau mengubah profil
- [ ] Validasi: usia 17-80 tahun, tinggi 100-250 cm, berat 20-300 kg, target searah tujuan
- [ ] Berat awal tercatat di `weight_logs` bila belum ada catatan pada tanggal itu
- [ ] Input tidak valid ditolak tanpa menyimpan data
- [ ] Permintaan tanpa sesi ditolak 401
