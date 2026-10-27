# Daily Tracker - Dokumentasi Proyek

Dokumen kerja proyek Implementasi dan Pengujian Perangkat Lunak. Sumber kebenaran produk ada di PRD `docs/00 - PRD Daily Tracker.md`. Rencana tahap ada di `05 - Rencana Pengembangan Bertahap.md` pada vault Obsidian.

Status: Fase 1 (P1) dikerjakan bertahap tanpa tenggat. Fase 2 dan Fase 3 ditunda.

## Dokumen Produk

| Dokumen | Berkas |
| --- | --- |
| PRD Daily Tracker | `docs/00 - PRD Daily Tracker.md` |
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

| Tahap | Nama | Dokumen | Status |
| --- | --- | --- | --- |
| 0 | Arsip dan penggantian ide | `docs/00 - Tahap 0 - Arsip dan Penggantian.md` | Selesai |
| 1 | Fondasi dan autentikasi | `docs/01 - Tahap 1 - Fondasi dan Autentikasi/` | Berikutnya |
| 2 | Profil dan onboarding | `docs/02 - Tahap 2 - Profil dan Onboarding/` | Belum mulai |
| 3 | Exercise tracking dan pipeline | `docs/03 - Tahap 3 - Exercise Tracking dan Pipeline/` | Belum mulai |
| 4 | Body condition tracking | `docs/04 - Tahap 4 - Body Condition/` | Belum mulai |
| 5 | To-do list | `docs/05 - Tahap 5 - To-Do List/` | Belum mulai |
| 6 | Dashboard dan analytics | `docs/06 - Tahap 6 - Dashboard dan Analytics/` | Belum mulai |
| 7 | Pengujian, deploy, laporan | `docs/07 - Tahap 7 - Pengujian dan Deploy/` | Belum mulai |
| 8 | Fase 2: kalori dan makanan | `docs/08 - Tahap 8 - Kalori dan Makanan/` | Ditunda |
| 9 | Fase 3: pengingat, streak, template | `docs/09 - Tahap 9 - Pengingat Streak Template/` | Ditunda |

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
# implementasi-pengujian-perangkatlunak-project
