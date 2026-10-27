# Daily Tracker - Pelacak Kebugaran Harian

**Daily Tracker** adalah aplikasi web pelacak kebugaran harian (*fitness tracker*) yang dirancang untuk membantu pengguna mencatat aktivitas olahraga, memantau perkembangan berat badan, mengelola *to-do list* harian, serta menghitung target kalori dan rekomendasi menu makanan secara otomatis.

> **Sumber Kebenaran Produk**: [[docs/00 - PRD Daily Tracker|PRD Daily Tracker]]
> **Laporan Review Arsitektur**: [REVIEW.md](./REVIEW.md)

---

## Gambaran Utama Proyek

Prinsip utama sistem: **Satu input pengguna memicu banyak pembaruan otomatis secara konsisten (atomik)** — misalnya mencatat olahraga langsung mencentang *to-do list* terkait, menghitung kalori terbakar, dan memperbarui ringkasan harian.

### Fitur Utama
- **Autentikasi & Profil Pengguna**: Pendaftaran, masuk, serta pengelolaan data fisik (jenis kelamin, usia, tinggi, berat badan, tingkat aktivitas, dan target berat).
- **Daily Exercise Tracking**: Pencatatan olahraga (Gym, Running, Home Workout) dengan perhitungan kalori otomatis berdasarkan nilai MET (*Metabolic Equivalent of Task*).
- **Body Condition Tracking**: Pemantauan berat badan harian dan persentase progres menuju *target weight*.
- **Daily To-Do List**: Pengelolaan target harian yang terintegrasi otomatis dengan pencatatan olahraga (*auto-complete & undo pipeline*).
- **Target Kalori & Log Makanan**: Perhitungan BMR (Mifflin-St Jeor), target kalori harian, pencatatan asupan, serta rekomendasi resep makanan berdasarkan sisa anggaran kalori.
- **Analytics & Dashboard**: Grafik perkembangan berat badan, frekuensi olahraga, dan tingkat penyelesaian target harian.

---

## Tech Stack (Teknologi)

| Lapisan | Teknologi | Peran |
| --- | --- | --- |
| **Frontend** | Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS | Halaman web, komponen UI, halaman Auth & Dashboard |
| **Grafik** | Recharts | Visualisasi data berat badan dan aktivitas harian |
| **Backend** | Next.js Route Handlers | API Endpoint dan *Service Layer* |
| **Database** | PostgreSQL (Supabase) | Penyimpanan data & *Row Level Security* (RLS) |
| **Autentikasi** | Supabase Auth (`@supabase/ssr`) | Sesi pendaftaran, login, dan *middleware* proteksi |
| **Validasi** | Zod | Pemvalidasi input di *Form* & *Server Route Handler* |
| **Pengujian** | Vitest, Playwright | *Unit Test*, *Integration Test*, dan *E2E Test* |

---

## Aturan Arsitektur 4-Lapisan (*Strict 4-Layer Architecture*)

Untuk menjaga kualitas kode dan kemudahan pengujian, repositori ini **wajib** mematuhi pemisahan 4 lapisan:

```
src/
├── app/                  # [1] UI Layer & [2] Route Handlers
│   ├── (auth)/           # Halaman Login & Register
│   ├── (app)/            # Halaman Dashboard & Fitur utama
│   └── api/              # Route Handlers (Endpoint API)
├── components/           # Komponen UI murni (Reusables)
├── config/               # Konstanta MET, faktor aktivitas, batas validasi
└── lib/
    ├── validation/       # [2] Skema Zod per resource
    ├── services/         # [3] Service Layer (100% Aturan Bisnis & Rumus)
    └── repositories/     # [4] Repository Layer (1-satunya akses Supabase)
```

### Prinsip Lapisan:
1. **UI Layer (`src/app`, `src/components`)**: Hanya menampilkan data dan mengirim interaksi pengguna. **Dilarang memuat rumus/kalkulasi bisnis**.
2. **Route Handler Layer (`src/app/api`)**: Memvalidasi input via Zod, mengecek sesi autentikasi, memanggil *Service Layer*, dan mengembalikan respons API seragam `{ data, error }`.
3. **Service Layer (`src/lib/services`)**: Menampung seluruh aturan bisnis, kalkulasi kalori/BMR/MET, dan logika pipeline. Tidak boleh query database secara langsung.
4. **Repository Layer (`src/lib/repositories`)**: Lapisan tunggal yang melakukan query atau mutasi ke database Supabase.

---

## Status Pengembangan per Tahap

| Tahap | Nama Tahap | Frontend | Backend | Status |
| :---: | --- | :---: | :---: | :---: |
| **0** | Arsip & Penggantian Ide | [[docs/00 - Tahap 0 - Arsip dan Penggantian\|Tahap 0]] | - | **Selesai** |
| **1** | Fondasi & Autentikasi | [[docs/01 - Tahap 1 - Fondasi dan Autentikasi/frontend\|Frontend]] | [[docs/01 - Tahap 1 - Fondasi dan Autentikasi/backend\|Backend]] | **Selesai** |
| **2** | Profil & Onboarding | [[docs/02 - Tahap 2 - Profil dan Onboarding/frontend\|Frontend]] | [[docs/02 - Tahap 2 - Profil dan Onboarding/backend\|Backend]] | Berikutnya |
| **3** | Exercise Tracking & Pipeline | [[docs/03 - Tahap 3 - Exercise Tracking dan Pipeline/frontend\|Frontend]] | [[docs/03 - Tahap 3 - Exercise Tracking dan Pipeline/backend\|Backend]] | Belum mulai |
| **4** | Body Condition Tracking | [[docs/04 - Tahap 4 - Body Condition/frontend\|Frontend]] | [[docs/04 - Tahap 4 - Body Condition/backend\|Backend]] | Belum mulai |
| **5** | Daily To-Do List | [[docs/05 - Tahap 5 - To-Do List/frontend\|Frontend]] | [[docs/05 - Tahap 5 - To-Do List/backend\|Backend]] | Belum mulai |
| **6** | Dashboard & Analytics | [[docs/06 - Tahap 6 - Dashboard dan Analytics/frontend\|Frontend]] | [[docs/06 - Tahap 6 - Dashboard dan Analytics/backend\|Backend]] | Belum mulai |
| **7** | Pengujian, Deploy & Laporan | [[docs/07 - Tahap 7 - Pengujian dan Deploy/frontend\|Frontend]] | [[docs/07 - Tahap 7 - Pengujian dan Deploy/backend\|Backend]] | Belum mulai |
| **8** | Fase 2: Kalori & Log Makanan | [[docs/08 - Tahap 8 - Kalori dan Makanan/frontend\|Frontend]] | [[docs/08 - Tahap 8 - Kalori dan Makanan/backend\|Backend]] | Ditunda |
| **9** | Fase 3: Pengingat, Streak & Template | [[docs/09 - Tahap 9 - Pengingat Streak Template/frontend\|Frontend]] | [[docs/09 - Tahap 9 - Pengingat Streak Template/backend\|Backend]] | Ditunda |

---

## Panduan Memulai (*Quickstart for Developers*)

### 1. Prasyarat
- Node.js (v18 ke atas)
- npm / yarn / pnpm

### 2. Instalasi & Setup Environment
```bash
# Clone repositori
git clone <repository-url>
cd daily-tracker

# Install dependencies
npm install

# Buat file konfigurasi lingkungan dari template
cp .env.example .env.local
```

Isi variabel di `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-supabase-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### 3. Migrasi Database Supabase
Jalankan berkas SQL di direktori `supabase/`:
1. `supabase/migrations/00001_initial_schema.sql` (Skema tabel, fungsi, & RLS Policy)
2. `supabase/seed.sql` (Data awal MET Values)

### 4. Menjalankan Server Pengembangan
```bash
npm run dev
```
Buka [http://localhost:3000](http://localhost:3000) pada peramban Anda.

### 5. Menjalankan Pengujian (Testing)
```bash
# Menjalankan Unit Tests (Vitest)
npm test

# Memeriksa build produksi
npm run build
```

---

## Format Respons API Standards
Seluruh Route Handler mengembalikan format JSON yang seragam:

```json
// Respons Berhasil
{
  "data": { ... },
  "error": null
}

// Respons Gagal
{
  "data": null,
  "error": {
    "code": "UNAUTHORIZED | VALIDATION_ERROR | NOT_FOUND | INTERNAL_ERROR",
    "message": "Pesan deskriptif dalam Bahasa Indonesia"
  }
}
```

---

## Navigasi Dokumen Lanjutan

- [Dokumen PRD Lengkap](docs/00%20-%20PRD%20Daily%20Tracker.md)
- [Laporan Review Arsitektur & Best Practices](REVIEW.md)
- [Dokumentasi Tahap 1 (Fondasi & Auth)](docs/01%20-%20Tahap%201%20-%20Fondasi%20dan%20Autentikasi/backend.md)
