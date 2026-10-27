# Laporan Tinjauan & Review Arsitektur Repositori Daily Tracker

Dokumen ini berisi hasil evaluasi menyeluruh terhadap rancangan produk (PRD), rancangan bertahap (Tahap 0–9), serta rekomendasi *best practices* untuk memulai eksekusi pengembangan.

---

## 1. Ringkasan Eksekutif

Rancangan sistem **Daily Tracker** sudah sangat matang dari segi visi produk, pembagian fase (P1/P2/P3), dan arsitektur 4-lapisan (*UI*, *Route Handler*, *Service*, *Repository*).

Namun, hasil audit terhadap seluruh dokumen rancangan (`PRD` & `docs/00` – `docs/09`) menemukan beberapa **kekurangan, kelewatan (omissions), ketidakcocokan (inconsistencies), serta potensi edge cases** yang perlu disempurnakan sebelum eksekusi kode dimulai agar tidak menimbulkan *refactoring* besar di tengah jalan.

---

## 2. Temuan Utama & Kekurangan Rancangan (Gaps & Weaknesses)

### A. Inkonsistensi & Edge Cases pada Skema Database & Relasi
1. **Relasi Sirkular / Saling Mengikat Antara `exercise_logs` dan `todos`**:
   - Di PRD Bab 10 & Tahap 1 Backend, tabel `exercise_logs` menyimpan `todo_id` DAN tabel `todos` menyimpan `exercise_log_id`.
   - **Risiko**: Mengakibatkan *circular foreign key constraint* saat *insert* atau *delete*. Jika membuat `exercise_log` baru yang secara otomatis menyelesaikan `todo`, mana yang di-*insert* lebih dulu?
   - **Rekomendasi**: Pertahankan hanya satu arah relasi. Cukup `todos.exercise_log_id` (nullable FK ke `exercise_logs`) atau sebaliknya, atau buat relasi *one-to-one* tersambung secara implisit via `(user_id, date, category)`.

2. **Skema `met_values` Kurang Kolom Kunci**:
   - Di Tahap 1 Backend, `met_values` memiliki kolom `category`, `intensity`, `met`.
   - Namun di PRD 9.2, nilai MET tergantung pada **kategori** (Gym, Running, Home Workout) dan **intensitas** (Ringan, Sedang, Berat).
   - **Risiko**: Diperlukan constraint `UNIQUE(category, intensity)` pada `met_values` agar pencarian nilai MET presisi dan tidak mengembalikan multiple rows.

3. **Inkonsistensi Nama Kolom & Enum**:
   - Di PRD: `category` bernilai `gym`, `running`, `home`. Di Tahap 1: `home_workout` vs `home`.
   - Di PRD: Status todo `belum` / `selesai`. Di Tahap 1/5 Backend: Status todo `open` / `done`.
   - **Rekomendasi**: Standardisasi seluruh enum ke Bahasa Inggris yang konsisten (`gym`, `running`, `home_workout`; status todo `open`, `done`; status exercise `planned`, `done`).

### B. Masalah Pipeline Sinkronisasi & Transaksi Atomik
1. **Limitasi Transaksi Supabase JS / Route Handler**:
   - PRD 9.1 mewajibkan pipeline sinkronisasi berjalan dalam **satu transaksi database atomik** (semua berhasil atau rollback).
   - Di Client/Server Supabase JS Client standar (tanpa PostgreSQL RPC stored function), eksekusi multiple query dari Node.js / Route Handler **bukanlah transaksi ACID atomik**.
   - **Risiko**: Jika query ke-3 (misal update `daily_summaries`) gagal, query ke-2 (`todos`) sudah terlanjur ter-commit.
   - **Rekomendasi**:
     - Gunakan PostgreSQL Stored Procedure / RPC di Supabase untuk `sync_daily_pipeline(p_user_id, p_date)`.
     - Atau kelola seluruh pembaruan ringkasan secara *idempotent recalculation* (hitung ulang penuh `daily_summaries` dari tabel sumber dalam satu transaksi RPC atau fungsi terisolasi).

2. **Aturan Pembalikan Todo (Undo Pipeline) pada Perubahan Multi-Hari**:
   - Jika pengguna memindahkan tanggal `exercise_log` dari tanggal 10 ke tanggal 11:
   - PRD/Tahap 3 menjelaskan ringkasan dihitung ulang pada tanggal baru dan lama.
   - **Gap**: Bagaimana dengan Todo di tanggal 10 yang tadinya `completed_by = auto`? Harus dikembalikan ke `open` di tanggal 10, lalu todo di tanggal 11 di-auto-complete jika cocok. Skenario pemindahan tanggal ini belum secara eksplisit memiliki test-case baku.

### C. Edge Cases pada Perhitungan Kalori & Berat Badan
1. **Penanganan Kasus Tanpa Catatan Berat Badan Sebelumnya**:
   - Rumus MET & Target Kalori (BMR) memerlukan `berat_kg`.
   - **Gap**: Apa yang terjadi jika pengguna mencatat olahraga pada tanggal 5, tetapi belum pernah menginput berat badan sama sekali, atau catatan berat terdekat baru ada di tanggal 10?
   - **Rekomendasi**: Profil wajib memiliki `initial_weight_kg` atau saat onboarding wajib mencatat `weight_logs` pertama. Jika tidak ada berat pada/sebelum tanggal X, gunakan `profiles.target_weight_kg` / berat profil onboarding sebagai *fallback default*.

2. **Pembatasan Batas Aman BMR / Target Kalori (PRD 9.2)**:
   - PRD menyebutkan batas aman minimum 1200 kcal (wanita) & 1500 kcal (pria).
   - **Gap**: Di Tahap 2 (Profil & Onboarding), target kalori sengaja ditunda ke Tahap 8. Berarti di Tahap 1-7 `daily_summaries.target_kcal` diisi 0.
   - **Perhatian**: Komponen UI di Tahap 1–7 harus mampu menangani `target_kcal = 0` tanpa menampilkan pembagian nol (*division by zero error* pada *progress bar*).

3. **Penyusutan / Pembalikan Berat Badan pada Rumus Progres (Tahap 4)**:
   - Rumus: `progress = ((berat_awal - berat_terbaru) / (berat_awal - target)) * 100`.
   - **Edge Case**: Jika `berat_awal == target` (tujuan `maintain`), penyebut bernilai 0.
   - Tahap 4 Backend menyebutkan jika target sama dengan berat awal, progres bernilai 100 jika target tercapai, selain itu 0. Hal ini harus diuji ketat di Unit Test.

### D. Kelewatan dalam Konfigurasi Devops & Tooling Proyek
1. **Ketidakberadaan Berkas Inisialisasi Proyek**:
   - Repositori saat ini hanya berisi direktori `src/`, `tests/`, `supabase/`, `docs/`, tanpa `package.json`, `tsconfig.json`, `tailwind.config.js`, atau `.env.example`.
2. **Setup Pre-commit & Testing Framework**:
   - PRD menyebutkan Vitest, Playwright, dan Postman, namun belum ada konfigurasi `vitest.config.ts`, `playwright.config.ts`, maupun script linting/prettier.

---

## 3. Rekomendasi Best Practices untuk Eksekusi (Panduan Implementasi)

Agar pengembangan berjalan lancar tanpa hambatan arsitektur, berikut panduan *Best Practices* yang direkomendasikan untuk diterapkan sejak Tahap 1:

### 1. Kepatuhan Ketat Arsitektur 4-Lapisan
- **UI Component (`src/components/`, `src/app/`)**:
  - Hanya mengelola state tampilan dan trigger aksi.
  - **Dilarang keras** memuat kalkulasi (BMR, MET, persentase progres, dsb.).
- **Route Handler (`src/app/api/.../route.ts`)**:
  - Tugas utama: Autentikasi sesi Supabase (`auth.getUser()`), validasi skema input dengan Zod (`parse()`), memanggil Service, dan mengembalikan format JSON seragam `{ data, error }`.
- **Service Layer (`src/lib/services/`)**:
  - Menampung 100% logika bisnis murni, kalkulasi matematika, dan aturan domain.
  - Dapat di-test secara independen menggunakan **Vitest unit testing** tanpa membakar koneksi database.
- **Repository Layer (`src/lib/repositories/`)**:
  - Menjadi satu-satunya tempat yang melakukan query `supabase.from(...)` atau memanggil RPC.

### 2. Standar Respons API & Handling Error
Seluruh API Route Handler Wajib mengembalikan struktur konsisten:
```json
// Sukses
{
  "data": { ... },
  "error": null
}

// Gagal / Error
{
  "data": null,
  "error": {
    "code": "VALIDATION_ERROR | UNAUTHORIZED | NOT_FOUND | INTERNAL_ERROR",
    "message": "Pesan deskriptif dalam Bahasa Indonesia"
  }
}
```

### 3. TDD (Test-Driven Development) & Verifikasi Ketat
- Untuk fungsi-fungsi kritis seperti:
  1. Rumus BMR & MET (`src/lib/services/calorie.ts`)
  2. Kalkulasi Progres Berat Badan (`src/lib/services/weight.ts`)
  3. Algoritma Rekomendasi Makanan (`src/lib/services/recommendation.ts`)
  4. Transisi Status Todo & Pipeline Auto-complete (`src/lib/services/pipeline.ts`)
- **Terapkan TDD**: Tulis unit test di `tests/unit/` terlebih dahulu berdasarkan *Test Case Baku PRD 9.2*, pastikan *FAIL*, lalu implementasikan fungsinya hingga *PASS*.

### 4. Strategi Keamanan Database (Row Level Security / RLS)
- Setiap tabel yang berhubungan dengan pengguna (`profiles`, `weight_logs`, `exercise_logs`, `todos`, `food_logs`, `daily_summaries`, `user_streaks`, `reminder_settings`) **wajib** mengaktifkan RLS:
  ```sql
  ALTER TABLE weight_logs ENABLE ROW LEVEL SECURITY;

  CREATE POLICY "Users can manage their own weight logs"
  ON weight_logs FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
  ```
- Tabel rujukan seperti `met_values`, `foods`, `recipes` diatur `FOR SELECT TO authenticated`.

---

## 4. Langkah Persiapan Eksekusi Tahap 1 (Fondasi)

Berikut langkah terurut untuk mengawali pengerjaan Tahap 1:

1. **Inisialisasi Project Stack**:
   - Generate `package.json` dengan Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui.
   - Install dependency utama: `@supabase/supabase-js`, `@supabase/ssr`, `zod`, `lucide-react`, `recharts`.
   - Install dev dependency: `vitest`, `@playwright/test`, `eslint`, `prettier`.

2. **Inisialisasi Supabase & Migrasi Database Pertama (`supabase/migrations/`)**:
   - Buat file migrasi `00001_initial_schema.sql` mencakup tabel Tahap 1 (`profiles`, `weight_logs`, `exercise_logs`, `todos`, `daily_summaries`, `met_values`).
   - Terapkan RLS policy untuk semua tabel.
   - Isikan data seed `met_values` di `supabase/seed.sql`.

3. **Setup Kerangka Kode 4-Lapisan**:
   - Buat helper Supabase Client (`src/lib/supabase/client.ts`, `server.ts`, `middleware.ts`).
   - Buat skema validation Zod dasar di `src/lib/validation/`.
   - Buat repository dasar di `src/lib/repositories/`.
   - Buat service dasar di `src/lib/services/`.
   - Buat Route Handler `/api/health` dan `/api/me`.

4. **Pengujian Sesi & RLS Multi-Akun**:
   - Jalankan unit test dan integrasi untuk memastikan request tanpa token/sesi ditolak dengan HTTP 401.

---

*Dokumen tinjauan ini siap dijadikan acuan utama tim pengembang sebelum melangkah ke implementasi kode Tahap 1.*
