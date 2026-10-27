---
title: Tahap 1 - Frontend
created: 2026-10-27
tags:
  - implementasiPengujianPerangkatLunak
---

> [[README|Indeks]] · [[docs/00 - PRD Daily Tracker|PRD]] · [[docs/01 - Tahap 1 - Fondasi dan Autentikasi/frontend|Frontend]] · [[docs/01 - Tahap 1 - Fondasi dan Autentikasi/backend|Backend]]

# Tahap 1 - Frontend

Status: belum mulai. Prasyarat: Tahap 0 selesai.

Skill saat mulai: `frontend-design`, `codebase-design`.

## Tujuan

Menyediakan kerangka UI, halaman autentikasi, dan navigasi dasar yang siap diisi fitur.

## Halaman

| Halaman | Rute | Isi |
| --- | --- | --- |
| Registrasi | `/register` | Email, password, konfirmasi password |
| Login | `/login` | Email, password, tautan daftar |
| Dashboard awal | `/dashboard` | Placeholder ringkasan dan navigasi |
| Onboarding | `/onboarding` | Placeholder formulir bertahap |

## Komponen

- `AppShell`: sidebar desktop, bottom navigation mobile, area konten.
- `AuthForm`: satu komponen untuk login dan registrasi dengan mode.
- `FormField`: label, input, pesan error, keterangan bantuan.
- `EmptyState`: tampilan saat data kosong.
- `LoadingState` dan `ErrorState`.
- `Toaster` untuk notifikasi singkat.

## Perilaku

- Pengguna tanpa sesi diarahkan ke `/login` saat membuka rute `(app)`.
- Pengguna dengan sesi diarahkan ke `/dashboard` saat membuka `/login` atau `/register`.
- Setelah registrasi, pengguna diarahkan ke `/onboarding`.
- Setelah login, pengguna diarahkan ke `/dashboard`.
- Logout menghapus sesi dan kembali ke `/login`.
- Validasi form di klien hanya untuk pengalaman; validasi server tetap penentu.

## Batasan

- Tidak ada panggilan database langsung dari komponen.
- Tidak ada kunci Supabase yang bersifat rahasia di kode klien.
- Mobile-first, target lebar minimum 360 px.
- Palet netral dengan satu warna aksen, token warna lewat CSS variables.

## Struktur Berkas

```
src/app/(auth)/login/page.tsx
src/app/(auth)/register/page.tsx
src/app/(app)/layout.tsx
src/app/(app)/dashboard/page.tsx
src/app/(app)/onboarding/page.tsx
src/components/app-shell.tsx
src/components/auth-form.tsx
src/components/form-field.tsx
src/components/states.tsx
src/app/globals.css
```

## Definition of Done

- Registrasi, login, dan logout berjalan dari UI.
- Redirect sesuai aturan sesi.
- Pesan error tampil jelas dalam Bahasa Indonesia.
- Tampilan tidak rusak pada lebar 360 px dan 1280 px.

## Pengujian

- Playwright: registrasi sampai dashboard, logout, akses rute terproteksi tanpa sesi.
- Pemeriksaan manual: kontras teks, fokus keyboard, label input.

## Navigasi

- [[README|Indeks dokumentasi]]
- [[docs/00 - PRD Daily Tracker|PRD Daily Tracker]]
- [[docs/01 - Tahap 1 - Fondasi dan Autentikasi/frontend|Tahap 1 Frontend]] · [[docs/01 - Tahap 1 - Fondasi dan Autentikasi/backend|Tahap 1 Backend]]
- Sebelumnya: tidak ada
- Berikutnya: [[docs/02 - Tahap 2 - Profil dan Onboarding/frontend|Tahap 2 Frontend]] · [[docs/02 - Tahap 2 - Profil dan Onboarding/backend|Tahap 2 Backend]]
