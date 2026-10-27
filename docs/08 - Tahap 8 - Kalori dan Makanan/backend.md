---
title: Tahap 8 - Backend
created: 2026-10-27
tags:
  - implementasiPengujianPerangkatLunak
---

> [[README|Indeks]] · [[docs/00 - PRD Daily Tracker|PRD]] · [[docs/08 - Tahap 8 - Kalori dan Makanan/frontend|Frontend]] · [[docs/08 - Tahap 8 - Kalori dan Makanan/backend|Backend]]

# Tahap 8 - Backend

Status: ditunda. Prasyarat: Tahap 7 selesai.

Skill saat mulai: `tdd`.

## Tujuan

Mengaktifkan perhitungan target kalori, log makanan, dan algoritma rekomendasi.

## Endpoint

| Metode | Endpoint | Fungsi |
| --- | --- | --- |
| GET | /api/foods?q= | Cari makanan |
| GET, POST | /api/food-logs | Daftar dan catat asupan |
| GET | /api/recommendations?meal= | Card rekomendasi |
| GET | /api/recipes/:id | Detail resep |

## Perhitungan Target Kalori (PRD 9.2)

1. BMR Mifflin-St Jeor.
2. Kalori dasar = BMR x faktor aktivitas (1.2, 1.3, 1.4).
3. Kalori olahraga = jumlah `(MET - 1) x berat x jam` untuk log selesai.
4. Penyesuaian tujuan: turun -500, jaga 0, naik +300.
5. Target = dasar + kredit olahraga + penyesuaian.
6. Batas bawah 1200 kcal (wanita) dan 1500 kcal (pria).
7. Bulatkan.

Test case baku:

| Kasus | Hasil |
| --- | --- |
| A: pria 20 th, 70 kg, 170 cm, sedang, jaga | BMR 1667.5; target 2168 |
| B: kasus A + running sedang 30 menit | olahraga 308; target 2476 |
| C: wanita 20 th, 55 kg, 160 cm, sedang, turun | BMR 1289; dasar 1676; dibatasi 1200 |

## Tabel Tambahan

`foods`, `food_logs`, `recipes`. `food_logs.kcal_total` disimpan agar riwayat tidak berubah saat data makanan diperbarui. Seed 30-50 resep dan data TKPI.

## Algoritma Rekomendasi (PRD 9.4)

1. Tentukan waktu makan.
2. Anggaran slot: sarapan 25%, makan siang 35%, makan malam 30%, camilan 10%.
3. Anggaran efektif = minimum anggaran slot dan sisa kalori.
4. Saring resep dengan tag sama dan kalori tidak melebihi anggaran.
5. Urutkan selisih terkecil.
6. Tampilkan lima teratas; kosong berarti menu ringan di bawah 150 kcal.

## Definition of Done

- Test case A, B, C lulus.
- Log makanan memengaruhi sisa kalori.
- Rekomendasi deterministik dan tersaring benar.
- Batas aman ditampilkan.

## Pengujian

- Unit: BMR, target, batas bawah, algoritma rekomendasi.
- Integrasi: pipeline memperbarui target saat profil, berat, atau olahraga berubah.
- API: pencarian, log, rekomendasi, tanpa sesi.

## Navigasi

- [[README|Indeks dokumentasi]]
- [[docs/00 - PRD Daily Tracker|PRD Daily Tracker]]
- [[docs/08 - Tahap 8 - Kalori dan Makanan/frontend|Tahap 8 Frontend]] · [[docs/08 - Tahap 8 - Kalori dan Makanan/backend|Tahap 8 Backend]]
- Sebelumnya: [[docs/07 - Tahap 7 - Pengujian dan Deploy/frontend|Tahap 7 Frontend]] · [[docs/07 - Tahap 7 - Pengujian dan Deploy/backend|Tahap 7 Backend]]
- Berikutnya: [[docs/09 - Tahap 9 - Pengingat Streak Template/frontend|Tahap 9 Frontend]] · [[docs/09 - Tahap 9 - Pengingat Streak Template/backend|Tahap 9 Backend]]
