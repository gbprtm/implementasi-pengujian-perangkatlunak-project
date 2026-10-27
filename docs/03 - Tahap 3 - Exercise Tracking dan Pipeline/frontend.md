---
title: Tahap 3 - Frontend
created: 2026-10-27
tags:
  - implementasiPengujianPerangkatLunak
---

> [[README|Indeks]] · [[docs/00 - PRD Daily Tracker|PRD]] · [[docs/03 - Tahap 3 - Exercise Tracking dan Pipeline/frontend|Frontend]] · [[docs/03 - Tahap 3 - Exercise Tracking dan Pipeline/backend|Backend]]

# Tahap 3 - Frontend

Status: belum mulai. Prasyarat: Tahap 2 selesai.

Skill saat mulai: `tdd`, `frontend-design`.

## Tujuan

Menyediakan pencatatan olahraga cepat dan riwayat yang mudah dibaca.

## Halaman

| Halaman | Rute | Isi |
| --- | --- | --- |
| Olahraga | `/exercise` | Form cepat, ringkasan hari ini, riwayat |
| Detail log | `/exercise/[id]` | Ubah dan hapus log |

## Form Cepat

Field: kategori (Gym, Running, Home Workout), nama latihan, durasi 1-300 menit, intensitas (ringan, sedang, berat), tanggal, status (direncanakan atau selesai).

Perilaku:

- Simpan menampilkan kalori terbakar hasil server, bukan hitungan klien.
- Setelah simpan, ringkasan dashboard dan to-do ikut diperbarui tanpa muat ulang penuh.
- Bila to-do olahraga pada tanggal dan kategori yang sama berubah otomatis, tampilkan penanda "selesai otomatis".
- Hapus log meminta konfirmasi dan menjelaskan bahwa to-do otomatis akan dibuka kembali.

## Riwayat

- Filter tanggal dan kategori.
- Menampilkan durasi, intensitas, status, dan kalori terbakar.
- Kosong: ajakan mencatat olahraga pertama.

## Komponen

- `ExerciseQuickForm`.
- `ExerciseHistoryList`.
- `ExerciseStatusBadge`.
- `DeleteConfirmDialog`.

## Batasan

- Tidak ada perhitungan MET di komponen.
- Angka kalori selalu berasal dari respons API.
- Mobile-first; form nyaman dipakai satu tangan.

## Definition of Done

- Log dapat dibuat, diubah, dihapus.
- Kalori terbakar tampil sesuai respons server.
- Penanda perubahan to-do otomatis terlihat.
- Riwayat terfilter dengan benar.

## Pengujian

- E2E: catat Running selesai, to-do terkait berubah menjadi selesai.
- E2E: hapus log, to-do kembali belum selesai.
- Manual: pesan error durasi dan tanggal.

## Navigasi

- [[README|Indeks dokumentasi]]
- [[docs/00 - PRD Daily Tracker|PRD Daily Tracker]]
- [[docs/03 - Tahap 3 - Exercise Tracking dan Pipeline/frontend|Tahap 3 Frontend]] · [[docs/03 - Tahap 3 - Exercise Tracking dan Pipeline/backend|Tahap 3 Backend]]
- Sebelumnya: [[docs/02 - Tahap 2 - Profil dan Onboarding/frontend|Tahap 2 Frontend]] · [[docs/02 - Tahap 2 - Profil dan Onboarding/backend|Tahap 2 Backend]]
- Berikutnya: [[docs/04 - Tahap 4 - Body Condition/frontend|Tahap 4 Frontend]] · [[docs/04 - Tahap 4 - Body Condition/backend|Tahap 4 Backend]]
