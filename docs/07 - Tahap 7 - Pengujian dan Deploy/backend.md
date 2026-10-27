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
