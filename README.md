# Daily Tracker - Dokumentasi Proyek

Dokumen kerja proyek Implementasi dan Pengujian Perangkat Lunak. Sumber kebenaran produk ada di [[docs/00 - PRD Daily Tracker|PRD Daily Tracker]]. Rencana tahap ada di `05 - Rencana Pengembangan Bertahap.md` pada vault Obsidian.

Status: Fase 1 (P1) dikerjakan bertahap tanpa tenggat. Fase 2 dan Fase 3 ditunda.

## Dokumen Produk

| Dokumen | Berkas |
| --- | --- |
| PRD Daily Tracker | [[docs/00 - PRD Daily Tracker|PRD Daily Tracker]] |
| Tahap 0 | [[docs/00 - Tahap 0 - Arsip dan Penggantian|Tahap 0 - Arsip dan Penggantian]] |
| Rencana tahap | `05 - Rencana Pengembangan Bertahap.md` di vault Obsidian |

## Aturan Kerja

- Empat lapisan wajib: UI, Route Handler, Service, Repository.
- UI tidak memuat rumus atau aturan bisnis.
- Route Handler memvalidasi input dengan Zod dan memeriksa sesi.
- Service memuat seluruh aturan bisnis dan perhitungan.
- Repository satu-satunya lapisan yang menyentuh database.
- Respons API seragam: `{ data, error }`.
- Satu tahap selesai dan ditinjau sebelum tahap berikutnya.
- Dokumen frontend dan backend dipisah per tahap.

## Peta Tahap

| Tahap | Nama | Frontend | Backend | Status |
| --- | --- | --- | --- | --- |
| 0 | Arsip dan penggantian ide | [[docs/00 - Tahap 0 - Arsip dan Penggantian|Tahap 0]] | - | Selesai |
| 1 | Fondasi dan autentikasi | [[docs/01 - Tahap 1 - Fondasi dan Autentikasi/frontend|Frontend]] | [[docs/01 - Tahap 1 - Fondasi dan Autentikasi/backend|Backend]] | Berikutnya |
| 2 | Profil dan onboarding | [[docs/02 - Tahap 2 - Profil dan Onboarding/frontend|Frontend]] | [[docs/02 - Tahap 2 - Profil dan Onboarding/backend|Backend]] | Belum mulai |
| 3 | Exercise tracking dan pipeline | [[docs/03 - Tahap 3 - Exercise Tracking dan Pipeline/frontend|Frontend]] | [[docs/03 - Tahap 3 - Exercise Tracking dan Pipeline/backend|Backend]] | Belum mulai |
| 4 | Body condition tracking | [[docs/04 - Tahap 4 - Body Condition/frontend|Frontend]] | [[docs/04 - Tahap 4 - Body Condition/backend|Backend]] | Belum mulai |
| 5 | To-do list | [[docs/05 - Tahap 5 - To-Do List/frontend|Frontend]] | [[docs/05 - Tahap 5 - To-Do List/backend|Backend]] | Belum mulai |
| 6 | Dashboard dan analytics | [[docs/06 - Tahap 6 - Dashboard dan Analytics/frontend|Frontend]] | [[docs/06 - Tahap 6 - Dashboard dan Analytics/backend|Backend]] | Belum mulai |
| 7 | Pengujian, deploy, laporan | [[docs/07 - Tahap 7 - Pengujian dan Deploy/frontend|Frontend]] | [[docs/07 - Tahap 7 - Pengujian dan Deploy/backend|Backend]] | Belum mulai |
| 8 | Fase 2: kalori dan makanan | [[docs/08 - Tahap 8 - Kalori dan Makanan/frontend|Frontend]] | [[docs/08 - Tahap 8 - Kalori dan Makanan/backend|Backend]] | Ditunda |
| 9 | Fase 3: pengingat, streak, template | [[docs/09 - Tahap 9 - Pengingat Streak Template/frontend|Frontend]] | [[docs/09 - Tahap 9 - Pengingat Streak Template/backend|Backend]] | Ditunda |

## Struktur Repositori yang Dituju

```
.
├── src/
│   ├── app/                  # halaman dan route handler
│   │   ├── (auth)/
│   │   ├── (app)/
│   │   └── api/
│   ├── components/           # komponen UI
│   ├── config/               # konstanta MET, faktor aktivitas, batas validasi
│   └── lib/
│       ├── validation/       # skema Zod
│       ├── services/         # aturan bisnis
│       └── repositories/     # akses database
├── supabase/
│   ├── migrations/
│   └── seed.sql
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
└── docs/
```

## Skill per Tahap

| Tahap | Skill saat mulai |
| --- | --- |
| 0 | grilling, find-skills |
| 1 | codebase-design |
| 2 | frontend-design, tdd |
| 3 | tdd |
| 4 | tdd |
| 5 | tdd |
| 6 | frontend-design, tdd |
| 7 | tdd, setup-pre-commit, code-review |
| 8 | tdd, frontend-design |
| 9 | tdd |

## Cara Memakai Dokumen

1. Baca dokumen frontend dan backend pada tahap berjalan.
2. Kerjakan backend lebih dulu bila kontrak API belum ada.
3. Tutup tahap setelah Definition of Done dan pengujian terpenuhi.
4. Perbarui status di tabel ini.

## Navigasi

- [[docs/00 - PRD Daily Tracker|PRD Daily Tracker]]
- [[docs/00 - Tahap 0 - Arsip dan Penggantian|Tahap 0 - Arsip dan Penggantian]]
- [[docs/01 - Tahap 1 - Fondasi dan Autentikasi/frontend|Tahap 1 Frontend]] · [[docs/01 - Tahap 1 - Fondasi dan Autentikasi/backend|Tahap 1 Backend]]
