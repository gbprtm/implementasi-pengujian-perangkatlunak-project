---
title: Tahap 4 - Frontend
created: 2026-10-27
tags:
  - implementasiPengujianPerangkatLunak
---

> [[README|Indeks]] · [[docs/00 - PRD Daily Tracker|PRD]] · [[docs/04 - Tahap 4 - Body Condition/frontend|Frontend]] · [[docs/04 - Tahap 4 - Body Condition/backend|Backend]]

# Tahap 4 - Frontend

Status: belum mulai. Prasyarat: Tahap 3 selesai.

Skill saat mulai: `tdd`, `frontend-design`.

## Tujuan

Menampilkan riwayat berat badan, target, dan progres dalam satu halaman yang jelas.

## Halaman

| Halaman | Rute | Isi |
| --- | --- | --- |
| Berat badan | `/weight` | Input berat, target, progres, grafik |

## Perilaku

- Input berat per tanggal; satu catatan per hari.
- Bila tanggal sudah punya catatan, tampilkan nilai lama dan jelaskan bahwa menyimpan akan menimpa.
- Selisih lebih dari 3 kg dari catatan sebelumnya memunculkan dialog konfirmasi.
- Target berat harus searah dengan tujuan; bila tidak, tampilkan pesan dan blokir simpan.
- Progres ditampilkan sebagai persentase 0-100 dengan arah sesuai tujuan.
- Grafik garis berat dengan garis target.

## Komponen

- `WeightEntryForm`.
- `WeightProgressCard`.
- `WeightChart` (Recharts).
- `TargetWeightForm`.
- `WeightChangeConfirmDialog`.

## Keadaan

- Belum ada data: tampilkan ajakan mencatat berat pertama.
- Data kurang dari dua titik: grafik diganti pesan singkat.
- Error simpan: pertahankan input pengguna dan tampilkan tombol coba lagi.

## Definition of Done

- Input dan timpa berat per hari berjalan.
- Progres sesuai rumus server.
- Target tidak searah ditolak.
- Konfirmasi muncul untuk perubahan lebih dari 3 kg.
- Grafik menampilkan garis target.

## Pengujian

- E2E: catat berat, lihat progres berubah.
- E2E: input kedua pada hari yang sama menimpa.
- E2E: target tidak searah ditolak.
- Manual: tampilan grafik pada 360 px.

## Navigasi

- [[README|Indeks dokumentasi]]
- [[docs/00 - PRD Daily Tracker|PRD Daily Tracker]]
- [[docs/04 - Tahap 4 - Body Condition/frontend|Tahap 4 Frontend]] · [[docs/04 - Tahap 4 - Body Condition/backend|Tahap 4 Backend]]
- Sebelumnya: [[docs/03 - Tahap 3 - Exercise Tracking dan Pipeline/frontend|Tahap 3 Frontend]] · [[docs/03 - Tahap 3 - Exercise Tracking dan Pipeline/backend|Tahap 3 Backend]]
- Berikutnya: [[docs/05 - Tahap 5 - To-Do List/frontend|Tahap 5 Frontend]] · [[docs/05 - Tahap 5 - To-Do List/backend|Tahap 5 Backend]]
