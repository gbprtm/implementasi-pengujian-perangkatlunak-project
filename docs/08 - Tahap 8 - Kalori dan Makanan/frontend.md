---
title: Tahap 8 - Frontend
created: 2026-10-27
tags:
  - implementasiPengujianPerangkatLunak
---

> [[README|Indeks]] · [[docs/00 - PRD Daily Tracker|PRD]] · [[docs/08 - Tahap 8 - Kalori dan Makanan/frontend|Frontend]] · [[docs/08 - Tahap 8 - Kalori dan Makanan/backend|Backend]]

# Tahap 8 - Frontend

Status: ditunda. Prasyarat: Tahap 7 selesai.

Skill saat mulai: `frontend-design`, `tdd`.

## Tujuan

Menambahkan target kalori harian, log makanan, dan rekomendasi resep.

## Halaman

| Halaman | Rute | Isi |
| --- | --- | --- |
| Makanan | `/food` | Pencarian, log asupan, sisa kalori |
| Rekomendasi | `/food/recommendations` | Card menu sesuai waktu makan |
| Detail resep | `/food/recipes/[id]` | Bahan, langkah, tombol catat |

## Dashboard Tambahan

- Target kalori, kalori masuk, kalori terbakar, sisa kalori.
- Catatan bila target terkena batas aman.
- Card rekomendasi sesuai waktu makan.

## Perilaku

- Pencarian makanan dari database TKPI dengan porsi.
- Makanan kustom dengan input kalori manual 0-5000.
- Card rekomendasi menampilkan nama, foto, kalori per porsi, waktu masak, tag waktu makan.
- Tombol catat menambahkan menu ke log makanan.
- Sisa kalori nol atau negatif menampilkan pesan target tercapai dan opsi camilan ringan.

## Batasan

- Angka kalori dari server.
- Tidak ada pemindaian makanan otomatis.
- Mobile-first; card dapat digulir horizontal pada layar sempit.

## Definition of Done

- Target kalori tampil dan berubah saat profil, berat, atau olahraga berubah.
- Pencarian dan log makanan berjalan.
- Card rekomendasi sesuai algoritma PRD 9.4.
- Resep dapat dibuka dan dicatat.

## Pengujian

- E2E: catat makanan, sisa kalori berubah.
- E2E: rekomendasi tersaring sesuai sisa kalori.
- Manual: batas aman dan pesan target tercapai.

## Navigasi

- [[README|Indeks dokumentasi]]
- [[docs/00 - PRD Daily Tracker|PRD Daily Tracker]]
- [[docs/08 - Tahap 8 - Kalori dan Makanan/frontend|Tahap 8 Frontend]] · [[docs/08 - Tahap 8 - Kalori dan Makanan/backend|Tahap 8 Backend]]
- Sebelumnya: [[docs/07 - Tahap 7 - Pengujian dan Deploy/frontend|Tahap 7 Frontend]] · [[docs/07 - Tahap 7 - Pengujian dan Deploy/backend|Tahap 7 Backend]]
- Berikutnya: [[docs/09 - Tahap 9 - Pengingat Streak Template/frontend|Tahap 9 Frontend]] · [[docs/09 - Tahap 9 - Pengingat Streak Template/backend|Tahap 9 Backend]]
