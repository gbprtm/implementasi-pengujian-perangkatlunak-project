---
title: Tahap 6 - Backend
created: 2026-10-27
tags:
  - implementasiPengujianPerangkatLunak
---

> [[README|Indeks]] · [[docs/00 - PRD Daily Tracker|PRD]] · [[docs/06 - Tahap 6 - Dashboard dan Analytics/frontend|Frontend]] · [[docs/06 - Tahap 6 - Dashboard dan Analytics/backend|Backend]]

# Tahap 6 - Backend

Status: belum mulai. Prasyarat: Tahap 3, 4, dan 5 selesai.

Skill saat mulai: `tdd`.

## Tujuan

Menyajikan ringkasan harian dan data analitik dari satu tabel agregasi.

## Endpoint

| Metode | Endpoint | Fungsi |
| --- | --- | --- |
| GET | /api/summary?date= | Ringkasan harian |
| GET | /api/analytics?range= | Data grafik 7, 30, 90 hari |

## Ringkasan Harian

Membaca `daily_summaries` untuk pengguna dan tanggal. Bila belum ada, hitung dari sumber dan simpan.

Field: `target_kcal`, `burned_kcal`, `consumed_kcal`, `remaining_kcal`, `todos_done`, `todos_total`, `exercise_minutes`.

Pada Fase 1, `target_kcal` dan `consumed_kcal` bernilai 0; diisi pada Tahap 8.

## Analitik

| Seri | Sumber | Bentuk |
| --- | --- | --- |
| Berat badan | weight_logs | Garis + garis target |
| Frekuensi olahraga | exercise_logs atau daily_summaries | Batang per minggu |
| Durasi olahraga | daily_summaries | Batang per minggu |
| Progres to-do | daily_summaries | Garis atau batang per hari |

Rentang divalidasi hanya 7, 30, 90. Data dikelompokkan per hari untuk berat dan to-do, per minggu untuk olahraga.

## Aturan

- Ringkasan hanya boleh dibaca pemiliknya.
- Perhitungan ulang idempoten.
- Tanggal tanpa data mengembalikan nilai nol, bukan error.
- Query analitik memakai indeks `(user_id, date)`.

## Definition of Done

- Summary dan analytics akurat untuk data uji.
- Ringkasan tanggal lampau dapat dihitung ulang.
- Rentang tidak valid ditolak.
- Waktu baca memenuhi target PRD.

## Pengujian

- Unit: agregasi rentang dan pengelompokan minggu.
- Integrasi: ringkasan konsisten dengan sumber setelah perubahan.
- API: rentang tidak valid, tanpa sesi, tanggal kosong.
- Performa: p95 baca di bawah 500 ms pada data uji.

## Navigasi

- [[README|Indeks dokumentasi]]
- [[docs/00 - PRD Daily Tracker|PRD Daily Tracker]]
- [[docs/06 - Tahap 6 - Dashboard dan Analytics/frontend|Tahap 6 Frontend]] · [[docs/06 - Tahap 6 - Dashboard dan Analytics/backend|Tahap 6 Backend]]
- Sebelumnya: [[docs/05 - Tahap 5 - To-Do List/frontend|Tahap 5 Frontend]] · [[docs/05 - Tahap 5 - To-Do List/backend|Tahap 5 Backend]]
- Berikutnya: [[docs/07 - Tahap 7 - Pengujian dan Deploy/frontend|Tahap 7 Frontend]] · [[docs/07 - Tahap 7 - Pengujian dan Deploy/backend|Tahap 7 Backend]]
