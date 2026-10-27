---
title: Tahap 1 - Backend
created: 2026-10-27
tags:
  - implementasiPengujianPerangkatLunak
---

> [[README|Indeks]] · [[docs/00 - PRD Daily Tracker|PRD]] · [[docs/01 - Tahap 1 - Fondasi dan Autentikasi/frontend|Frontend]] · [[docs/01 - Tahap 1 - Fondasi dan Autentikasi/backend|Backend]]

# Tahap 1 - Backend

Status: belum mulai. Prasyarat: Tahap 0 selesai.

Skill saat mulai: `codebase-design`.

## Tujuan

Menyiapkan proyek Supabase, skema Fase 1, Row Level Security, autentikasi, dan kerangka empat lapisan.

## Skema Database Fase 1

Semua tabel memiliki `id`, `created_at`, `updated_at`.

| Tabel | Kolom utama | Aturan |
| --- | --- | --- |
| profiles | user_id (PK), nama, jenis_kelamin, tanggal_lahir, tinggi_cm, activity_level, goal_type, target_weight_kg, timezone | Satu baris per pengguna |
| weight_logs | user_id, date, weight_kg | Unik pada (user_id, date) |
| exercise_logs | user_id, date, category, title, duration_min, intensity, status, calories_burned, todo_id | category: gym, running, home; status: planned, done |
| todos | user_id, date, title, type, category, status, completed_by, completed_at, exercise_log_id | type: exercise, general; status: open, done |
| daily_summaries | user_id, date, target_kcal, burned_kcal, consumed_kcal, remaining_kcal, todos_done, todos_total, exercise_minutes | Unik pada (user_id, date) |
| met_values | category, intensity, met | Tabel konfigurasi, seed dari PRD 9.2 |

Tabel `user_streaks`, `reminder_settings`, dan `reminder_log` dibuat di Tahap 9.

## Row Level Security

- Aktif pada semua tabel milik pengguna.
- Kebijakan select, insert, update, delete memakai `auth.uid() = user_id`.
- Tabel `met_values` hanya baca untuk pengguna terautentikasi.
- Uji dengan dua akun: A tidak boleh membaca atau mengubah data B.

## Autentikasi

- Supabase Auth email dan password.
- Middleware sesi di Next.js.
- Route Handler wajib memeriksa sesi; tanpa sesi mengembalikan 401 dengan format `{ data: null, error }`.

## Kerangka Lapisan

```
src/lib/validation/     skema Zod per resource
src/lib/services/       aturan bisnis, tanpa akses database langsung
src/lib/repositories/   query Supabase
src/config/             MET, faktor aktivitas, batas validasi
src/app/api/            route handler tipis
```

## Endpoint Awal

| Metode | Endpoint | Fungsi |
| --- | --- | --- |
| GET | /api/health | Cek sesi dan koneksi |
| GET | /api/me | Profil sesi aktif |

Endpoint fitur ditambahkan pada tahap masing-masing.

## Seed

`supabase/seed.sql` mengisi `met_values`:

| Kategori | Ringan | Sedang | Berat |
| --- | --- | --- | --- |
| Gym | 3.5 | 5.0 | 6.0 |
| Running | 7.0 | 9.8 | 11.8 |
| Home Workout | 3.0 | 3.8 | 5.5 |

## Definition of Done

- Proyek Supabase aktif dan migrasi berjalan.
- RLS terbukti dengan dua akun.
- Registrasi, login, dan logout berjalan lewat Supabase Auth.
- Request tanpa sesi ditolak 401.
- Seed MET tersedia.

## Pengujian

- Uji keamanan manual dua akun.
- Uji API tanpa sesi.
- Uji migrasi dari database kosong.

## Navigasi

- [[README|Indeks dokumentasi]]
- [[docs/00 - PRD Daily Tracker|PRD Daily Tracker]]
- [[docs/01 - Tahap 1 - Fondasi dan Autentikasi/frontend|Tahap 1 Frontend]] · [[docs/01 - Tahap 1 - Fondasi dan Autentikasi/backend|Tahap 1 Backend]]
- Sebelumnya: tidak ada
- Berikutnya: [[docs/02 - Tahap 2 - Profil dan Onboarding/frontend|Tahap 2 Frontend]] · [[docs/02 - Tahap 2 - Profil dan Onboarding/backend|Tahap 2 Backend]]
