# Spec: Backend Daily Tracker (Fase 1)

Sumber kebenaran produk: `docs/00 - PRD Daily Tracker.md`.
Rencana per tahap: `05 - Rencana Pengembangan Bertahap.md` pada vault Obsidian.

## Tujuan

Menyelesaikan seluruh backend Fase 1 (P1) Daily Tracker sebagai irisan vertikal yang dapat diverifikasi sendiri, tanpa menunggu frontend.

## Ruang Lingkup

Termasuk: autentikasi sesi, profil dan berat awal, catat dan ubah log olahraga dengan kalori MET, to-do harian, pipeline sinkronisasi, body condition dan progres berat, ringkasan harian, analitik rentang, pengerasan, deploy.

Di luar lingkup: UI dan komponen (dikerjakan terpisah), target kalori harian, log makanan, rekomendasi resep (Fase 2), pengingat, streak, template latihan (Fase 3).

## Prinsip

- Empat lapisan: Route Handler memvalidasi (Zod) dan memeriksa sesi, Service memuat aturan bisnis, Repository satu-satunya yang menyentuh database.
- Respons API seragam `{ data, error }`.
- Irisan vertikal: setiap tiket menembus schema, repository, service, route handler, dan pengujiannya sendiri.
- Tiket dieksekusi mengikuti frontier: tiket yang seluruh penghalangnya selesai.

## Daftar Tiket

| No | Judul | Blocked by | Status |
| --- | --- | --- | --- |
| 01 | Kerangka proyek, harness uji, dan kontrak respons | None | ready-for-agent |
| 02 | Skema Fase 1, RLS, dan seed MET | 01 | ready-for-agent |
| 03 | Autentikasi sesi dan gerbang `/api/me` | 02 | ready-for-agent |
| 04 | Profil pengguna dan berat awal | 03 | ready-for-agent |
| 05 | Catat log olahraga dengan kalori MET | 04 | ready-for-agent |
| 06 | To-do harian manual dan progres | 04 | ready-for-agent |
| 07 | Pipeline sinkronisasi: to-do otomatis, pembalikan, ringkasan harian | 05, 06 | ready-for-agent |
| 08 | Edit dan hapus log olahraga dengan hitung ulang | 07 | ready-for-agent |
| 09 | Body condition: riwayat berat dan progres target | 04 | ready-for-agent |
| 10 | Ringkasan harian `/api/summary` | 07, 09 | ready-for-agent |
| 11 | Analitik `/api/analytics` rentang 7/30/90 | 10 | ready-for-agent |
| 12 | Pengerasan, deploy, dan artefak uji | 11 | ready-for-agent |

## Frontier

Tiket **01** dapat dikerjakan sekarang. Setelah 01 selesai, frontier berpindah ke tiket berikutnya sesuai kolom Blocked by.

## Cara Mengeksekusi

1. Pilih tiket terbuka dengan seluruh penghalang selesai, nomor terkecil lebih dulu.
2. Kerjakan mengikuti skill `tdd` bila memungkinkan.
3. Jalankan type check, uji berkas tunggal, lalu uji penuh.
4. Tutup tiket dengan menandai kriteria penerimaan dan memperbarui kolom Status di sini.
