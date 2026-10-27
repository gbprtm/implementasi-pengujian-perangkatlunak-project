# 09: Body condition: riwayat berat dan progres target

**Ringkasan:** satu catatan berat per hari dan persentase progres menuju target.

**What to build:** pengguna dapat mencatat berat per tanggal; input pada hari yang sama menimpa nilai lama, bukan menambah baris. Server menghitung progres menuju target dengan pembatasan 0 sampai 100, dengan arah dibalik untuk tujuan menaikkan berat. Target berat wajib searah dengan tujuan. Selisih lebih dari 3 kg dari catatan sebelumnya dalam sehari meminta konfirmasi.

**Blocked by:** 04

**Status:** ready-for-agent

- [ ] `GET /api/weight` mengembalikan riwayat berat dan target
- [ ] `POST /api/weight` menyimpan berat per tanggal, input kedua menimpa
- [ ] Rumus progres dibatasi 0-100 dan arah terbalik untuk tujuan menaikkan berat
- [ ] Target tidak searah tujuan ditolak
- [ ] Selisih lebih dari 3 kg dalam sehari butuh `confirm`
- [ ] Berat 20-300 kg dan tanggal di masa depan ditolak
