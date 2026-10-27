---
title: Tahap 7 - Backend
created: 2026-10-27
tags:
  - implementasiPengujianPerangkatLunak
---

> [[README|Indeks]] · [[docs/00 - PRD Daily Tracker|PRD]] · [[docs/07 - Tahap 7 - Pengujian dan Deploy/frontend|Frontend]] · [[docs/07 - Tahap 7 - Pengujian dan Deploy/backend|Backend]]

# Tahap 7 - Backend

Status: belum mulai. Prasyarat: Tahap 6 selesai.

Skill saat mulai: `tdd`, `setup-pre-commit`, `code-review`.

## Tujuan

Menutup pengujian backend, keamanan, keandalan, dan menyiapkan deploy.

## Pekerjaan

- Koleksi Postman seluruh endpoint Fase 1.
- Kasus wajib: tanpa sesi, input tidak valid, akses data pengguna lain, ID tidak ada.
- Uji keamanan dua akun untuk setiap resource.
- Uji keandalan: kegagalan di tengah pipeline tidak menyisakan data parsial.
- Uji idempotensi ringkasan harian.
- Menyiapkan CI: lint, type check, unit, integration.
- Menyiapkan environment produksi dan migrasi.
- Deploy Vercel dan Supabase.
- Menyusun laporan pengujian akhir.

## Matriks Pengujian

| Tingkat | Alat | Cakupan |
| --- | --- | --- |
| Unit | Vitest | MET, progres berat, transisi status, agregasi |
| Integrasi | Vitest + database uji | Pipeline, pembalikan, unik berat, RLS |
| API | Postman | Semua endpoint dan kasus negatif |
| Keamanan | Manual dan otomatis | Isolasi antar pengguna |
| Keandalan | Vitest | Rollback dan idempotensi |
| Performa | Skrip beban | p95 baca dan waktu dashboard |

## Definition of Done

- Semua P1 berjalan sesuai alur PRD bagian 7.
- Test case baku PRD 9.2 lulus.
- Tidak ada kebocoran data antar pengguna.
- Aplikasi terdeploy dan dapat dipakai.
- Laporan pengujian, dokumentasi, dan bahan presentasi lengkap.

## Keluaran

- Koleksi Postman.
- Hasil uji keamanan, keandalan, performa.
- Pipeline CI.
- Laporan pengujian dan tautan deploy.

## Navigasi

- [[README|Indeks dokumentasi]]
- [[docs/00 - PRD Daily Tracker|PRD Daily Tracker]]
- [[docs/07 - Tahap 7 - Pengujian dan Deploy/frontend|Tahap 7 Frontend]] · [[docs/07 - Tahap 7 - Pengujian dan Deploy/backend|Tahap 7 Backend]]
- Sebelumnya: [[docs/06 - Tahap 6 - Dashboard dan Analytics/frontend|Tahap 6 Frontend]] · [[docs/06 - Tahap 6 - Dashboard dan Analytics/backend|Tahap 6 Backend]]
- Berikutnya: [[docs/08 - Tahap 8 - Kalori dan Makanan/frontend|Tahap 8 Frontend]] · [[docs/08 - Tahap 8 - Kalori dan Makanan/backend|Tahap 8 Backend]]
