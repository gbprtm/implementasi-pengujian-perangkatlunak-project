# PRD Daily Tracker: Web Pelacak Kebugaran Harian

  

Versi 1.0 · Disusun untuk Kazuha · 26 Oktober 2026 · Status: Draft untuk review

  

## 1. Ringkasan

  

Daily Tracker adalah aplikasi web untuk mencatat olahraga, memantau berat badan, mengelola target harian, melihat grafik perkembangan, serta mendapat target kalori harian dan rekomendasi makanan dalam bentuk card resep. Dokumen ini mendefinisikan apa yang dibangun, bagaimana alurnya berjalan, dan aturan mekanismenya, sehingga implementasi dan pengujian dapat dilakukan secara terukur.

  

**Prinsip utama sistem:** satu input pengguna memicu banyak pembaruan otomatis secara konsisten (olahraga tercatat, to-do tercentang, grafik dan kalori ikut diperbarui).

  

## 2. Latar Belakang dan Masalah

  

- Aplikasi kebugaran yang ada umumnya terpisah-pisah: catatan olahraga, berat badan, dan kalori ada di aplikasi berbeda.

- Pengguna pemula atau mahasiswa sering berhenti mencatat karena input berulang dan tidak ada panduan tindakan.

- Target kalori statis tidak mengikuti aktivitas harian, dan database makanan global kurang mencakup menu Indonesia.

  

## 3. Tujuan dan Metrik Keberhasilan

  

| Tujuan | Metrik | Target |

| --- | --- | --- |

| Pencatatan cepat | Waktu mencatat satu olahraga | Kurang dari 30 detik |

| Integrasi data | Input ganda untuk data yang sama | 0 (satu input, banyak efek) |

| Akurasi hitungan | Selisih hasil sistem dengan rumus acuan | 0 kcal pada test case baku |

| Kegunaan | Skor SUS pada uji pengguna | 68 atau lebih |

| Keandalan | Skenario uji utama lulus | 100% |

  

## 4. Pengguna Sasaran

  

**Persona utama:** mahasiswa atau pemula usia 17-30 tahun yang ingin rutin berolahraga dan menjaga berat badan, tetapi belum punya sistem pencatatan yang konsisten.

  

**Kebutuhan inti:** pencatatan cepat, tampilan sederhana, tahu sisa kalori hari ini, dan tahu harus makan apa.

  

## 5. Ruang Lingkup

  

### 5.1 Dalam Lingkup

  

1. Autentikasi dan profil pengguna.

2. Daily Exercise Tracking (Gym, Running, Home Workout), input manual.

3. Body Condition Tracking (berat badan dan target berat).

4. Daily To-Do List.

5. Graph Analytics (deskriptif).

6. Target Kalori Harian dan pencatatan asupan makanan.

7. Rekomendasi makanan dalam bentuk card beserta resep.

8. Pengingat email sederhana, streak, dan template latihan.

  

### 5.2 Di Luar Lingkup

  

- Smartwatch, wearable, GPS, sensor detak jantung, tekanan darah, dan oksigen.

- Diagnosis atau saran medis, diet klinis, dan program latihan profesional mendalam.

- Pemindaian makanan otomatis dan integrasi aplikasi pihak ketiga.

- Kolaborasi antarpengguna, manajemen proyek, dan pemesanan pelatih.

  

### 5.3 Fase Rilis

  

| Fase | Isi | Hasil |

| --- | --- | --- |

| Fase 1 (Inti) | Auth, profil, olahraga, berat badan, to-do, grafik | Tracker berfungsi penuh |

| Fase 2 (Kalori) | Target kalori, log makanan, card rekomendasi dan resep | Fitur pembeda aktif |

| Fase 3 (Pendukung) | Pengingat email, streak, template latihan, insight otomatis | Retensi dan kenyamanan |

  

Fase 1 harus selesai dan stabil sebelum Fase 2 dimulai. Jika waktu habis, Fase 1 sudah menjadi produk utuh.

  

## 6. Arsitektur dan Tech Stack

  

| Lapisan | Teknologi | Peran |

| --- | --- | --- |

| Frontend | Next.js (React), TypeScript, Tailwind CSS, shadcn/ui | Halaman, komponen, card resep, animasi |

| Grafik | Recharts | Berat badan, frekuensi dan durasi olahraga, progres target |

| Backend | Next.js Route Handlers | API dan service layer (logika kalori) |

| Database | PostgreSQL (Supabase) | Penyimpanan data dan Row Level Security |

| Autentikasi | Supabase Auth | Registrasi, login, sesi |

| Pengingat | Supabase scheduled function + Resend | Email terjadwal |

| Deploy | Vercel dan Supabase | Hosting |

| Pengujian | Vitest, Playwright, Postman | Unit, E2E, API |

  

**Struktur lapisan kode (wajib dipatuhi):**

  

1. **UI** hanya menampilkan data dan mengirim aksi.

2. **Route Handler** memvalidasi input (Zod), mengecek sesi, memanggil service.

3. **Service layer** berisi seluruh aturan bisnis dan perhitungan. Tidak ada rumus di komponen UI.

4. **Repository** adalah satu-satunya lapisan yang menyentuh database.

  

Alasannya: rumus kalori dapat diuji unit tanpa database dan UI, dan perubahan aturan hanya di satu tempat.

  

## 7. Alur Pengguna End-to-End

  

### 7.1 Alur Utama

  

1. **Registrasi dan login.** Pengguna mendaftar dengan email dan password.

2. **Onboarding profil.** Mengisi jenis kelamin, tanggal lahir, tinggi, berat saat ini, tingkat aktivitas harian, tujuan (turunkan, jaga, naikkan berat), dan target berat. Sistem langsung menghitung target kalori pertama.

3. **Dashboard.** Menampilkan target kalori, kalori terbakar, kalori masuk, sisa kalori, progres to-do hari ini, streak, dan card rekomendasi.

4. **Rencana harian.** Pengguna menambah to-do (misalnya Running 30 menit) atau memakai template latihan.

5. **Mencatat olahraga.** Pengguna mengisi atau menyelesaikan log olahraga. Sistem menjalankan pipeline sinkronisasi (bagian 9.1).

6. **Mencatat berat badan.** Input berkala, grafik dan progres menuju target diperbarui.

7. **Mencatat makanan.** Pengguna mencari makanan, memilih porsi, dan sistem menambah kalori masuk.

8. **Melihat rekomendasi.** Card makanan disaring sesuai sisa kalori dan waktu makan. Pengguna membuka card untuk melihat bahan dan langkah resep.

9. **Analitik.** Pengguna membuka grafik mingguan atau bulanan.

  

### 7.2 Alur Alternatif dan Kegagalan

  

| Situasi | Perilaku sistem |

| --- | --- |

| Input di luar rentang valid | Ditolak dengan pesan jelas, tidak ada data tersimpan |

| Profil belum lengkap | Fitur kalori dikunci, ditampilkan ajakan melengkapi profil |

| Log olahraga dihapus atau diubah | Pipeline dijalankan ulang, to-do otomatis dikembalikan jika sebelumnya diselesaikan otomatis |

| Sisa kalori nol atau negatif | Card rekomendasi diganti pesan target tercapai dan opsi camilan ringan |

| Pengguna mengisi data tanggal lampau | Diizinkan, ringkasan hari itu dihitung ulang |

| Koneksi gagal saat menyimpan | Tampilkan error dan tombol coba lagi, tidak ada penyimpanan parsial |

  

## 8. Kebutuhan Fungsional

  

Prioritas: **P1** wajib Fase 1, **P2** wajib Fase 2, **P3** Fase 3.

  

### 8.1 Autentikasi dan Profil

  

| ID | Kebutuhan | Prioritas |

| --- | --- | --- |

| FR-01 | Registrasi, login, dan logout dengan email dan password | P1 |

| FR-02 | Pengguna mengisi dan mengubah profil (jenis kelamin, tanggal lahir, tinggi, tingkat aktivitas, tujuan) | P1 |

| FR-03 | Perubahan profil memicu penghitungan ulang target kalori | P2 |

  

### 8.2 Daily Exercise Tracking

  

| ID | Kebutuhan | Prioritas |

| --- | --- | --- |

| FR-10 | Pengguna membuat log olahraga: kategori (Gym, Running, Home Workout), nama latihan, durasi, intensitas (ringan, sedang, berat), tanggal | P1 |

| FR-11 | Status log: direncanakan atau selesai | P1 |

| FR-12 | Sistem menghitung kalori terbakar otomatis dari MET, berat badan, dan durasi | P1 |

| FR-13 | Edit dan hapus log, riwayat dapat difilter per tanggal dan kategori | P1 |

| FR-14 | Template latihan per kategori untuk mengisi form cepat dan tombol ulangi kemarin | P3 |

  

### 8.3 Body Condition Tracking

  

| ID | Kebutuhan | Prioritas |

| --- | --- | --- |

| FR-20 | Input berat badan per tanggal, satu catatan per hari (input kedua pada hari yang sama menimpa) | P1 |

| FR-21 | Pengguna menetapkan target berat badan | P1 |

| FR-22 | Sistem menampilkan riwayat dan persentase progres menuju target | P1 |

  

Rumus progres: (berat awal dikurangi berat terbaru) dibagi (berat awal dikurangi berat target), dikalikan 100, dibatasi 0 sampai 100. Untuk tujuan menaikkan berat, selisih dihitung dengan arah terbalik.

  

### 8.4 Daily To-Do List

  

| ID | Kebutuhan | Prioritas |

| --- | --- | --- |

| FR-30 | Membuat to-do harian bertipe olahraga atau umum | P1 |

| FR-31 | Menandai selesai atau belum selesai secara manual | P1 |

| FR-32 | To-do bertipe olahraga otomatis selesai saat log olahraga sesuai berstatus selesai | P1 |

| FR-33 | Menampilkan progres harian: jumlah selesai dibagi total | P1 |

  

### 8.5 Graph Analytics

  

| ID | Kebutuhan | Prioritas |

| --- | --- | --- |

| FR-40 | Grafik garis berat badan dengan garis target | P1 |

| FR-41 | Grafik batang frekuensi dan durasi olahraga per minggu | P1 |

| FR-42 | Grafik progres penyelesaian to-do harian | P1 |

| FR-43 | Filter rentang waktu: 7 hari, 30 hari, 90 hari | P1 |

| FR-44 | Insight otomatis berbasis aturan (misalnya laju perubahan berat per minggu dibanding target laju) | P3 |

  

Analitik bersifat deskriptif. Tidak ada prediksi kesehatan.

  

### 8.6 Target Kalori dan Log Makanan

  

| ID | Kebutuhan | Prioritas |

| --- | --- | --- |

| FR-50 | Sistem menghitung target kalori harian (rumus bagian 9.2) | P2 |

| FR-51 | Target diperbarui otomatis saat profil, berat badan, atau log olahraga berubah | P2 |

| FR-52 | Pengguna mencari makanan dari database (TKPI) dan memilih porsi | P2 |

| FR-53 | Pengguna dapat menambah makanan kustom dengan input kalori manual | P2 |

| FR-54 | Dashboard menampilkan target, terbakar, masuk, dan sisa kalori | P2 |

  

### 8.7 Rekomendasi Makanan (Card dan Resep)

  

| ID | Kebutuhan | Prioritas |

| --- | --- | --- |

| FR-60 | Card rekomendasi berisi nama menu, foto, kalori per porsi, waktu masak, dan tag waktu makan | P2 |

| FR-61 | Card dibuka untuk melihat bahan dan langkah resep | P2 |

| FR-62 | Rekomendasi disaring sesuai sisa kalori dan waktu makan (algoritma bagian 9.4) | P2 |

| FR-63 | Tombol catat sebagai makanan yang dimakan menambahkan menu ke log makanan | P2 |

  

### 8.8 Pengingat dan Gamifikasi

  

| ID | Kebutuhan | Prioritas |

| --- | --- | --- |

| FR-70 | Pengingat email harian jika belum ada log pada jam yang dipilih pengguna | P3 |

| FR-71 | Streak: jumlah hari berturut-turut dengan minimal satu aktivitas tercatat | P3 |

  

## 9. Mekanisme Inti

  

### 9.1 Pipeline Sinkronisasi (Satu Input, Banyak Efek)

  

Semua perubahan data yang memengaruhi ringkasan harian melewati satu fungsi service dan satu transaksi database (atomik: semua berhasil atau semua dibatalkan).

  

**Pemicu:** buat, ubah, atau hapus `exercise_log`, `food_log`, `weight_log`, `todo`, atau perubahan profil.

  

**Langkah berurutan:**

  

1. Validasi input (rentang dan tipe).

2. Simpan perubahan pada tabel sumber.

3. Hitung kalori terbakar jika pemicunya log olahraga.

4. Sinkronkan to-do: cari to-do tipe olahraga pada tanggal dan kategori yang sama yang belum selesai, ubah menjadi selesai dengan `completed_by = auto`.

5. Hitung ulang `daily_summary` untuk tanggal terdampak (idempotent: hasil sama jika dijalankan berulang).

6. Perbarui streak.

7. Commit transaksi, kembalikan ringkasan terbaru ke UI.

  

**Aturan pembalikan:** jika log olahraga dihapus atau diubah menjadi tidak sesuai, to-do dengan `completed_by = auto` dikembalikan ke belum selesai. To-do yang diselesaikan manual tidak diubah.

  

### 9.2 Perhitungan Target Kalori

  

Urutan perhitungan:

  

1. **BMR (Mifflin-St Jeor):**

   - Pria: 10 × berat(kg) + 6,25 × tinggi(cm) − 5 × usia + 5

   - Wanita: 10 × berat(kg) + 6,25 × tinggi(cm) − 5 × usia − 161

2. **Kalori dasar harian** = BMR × faktor aktivitas dasar (di luar olahraga yang dicatat): rendah 1,2, sedang 1,3, tinggi 1,4.

3. **Kalori olahraga** = jumlah dari (MET − 1) × berat(kg) × durasi(jam) untuk log berstatus selesai pada hari itu. MET dikurangi 1 agar tidak menghitung ganda energi istirahat yang sudah ada di kalori dasar.

4. **Penyesuaian tujuan:** turunkan berat −500 kcal, jaga 0, naikkan berat +300 kcal.

5. **Target harian** = kalori dasar + (kalori olahraga × faktor kredit olahraga) + penyesuaian tujuan. Faktor kredit olahraga disimpan sebagai konstanta konfigurasi (default 1,0).

6. **Batas bawah aman:** target tidak boleh di bawah 1200 kcal (wanita) atau 1500 kcal (pria). Jika terkena batas, tampilkan catatan bahwa target dibatasi demi keamanan.

7. Bulatkan ke bilangan bulat terdekat.

  

**Nilai MET awal (konstanta konfigurasi, diverifikasi dengan Compendium of Physical Activities):**

  

| Kategori | Ringan | Sedang | Berat |

| --- | --- | --- | --- |

| Gym | 3,5 | 5,0 | 6,0 |

| Running | 7,0 | 9,8 | 11,8 |

| Home Workout | 3,0 | 3,8 | 5,5 |

  

**Sisa kalori** = target harian − kalori masuk. Selisih ini ditampilkan di dashboard.

  

**Test case baku (dipakai pada pengujian unit):**

  

| Kasus | Masukan | Hasil yang diharapkan |

| --- | --- | --- |

| A | Pria, 20 th, 70 kg, 170 cm, aktivitas sedang, tujuan jaga, tanpa olahraga | BMR 1667,5; target 2168 |

| B | Kasus A + Running sedang 30 menit | Olahraga (9,8−1) × 70 × 0,5 = 308; target 2476 |

| C | Wanita, 20 th, 55 kg, 160 cm, aktivitas sedang, tujuan turunkan | BMR 1289; dasar 1676; −500 = 1176; dibatasi menjadi 1200 |

  

### 9.3 Mesin Status To-Do dan Log Olahraga

  

**To-do:** `belum` → `selesai` (manual atau auto). `selesai` → `belum` (manual, atau otomatis lewat aturan pembalikan). Tidak ada status lain, agar logika sederhana dan mudah diuji.

  

**Log olahraga:** `direncanakan` → `selesai`. Kalori terbakar hanya dihitung dan dihitung ke ringkasan saat status `selesai`.

  

### 9.4 Algoritma Rekomendasi Makanan

  

1. Tentukan waktu makan: dari pilihan pengguna, atau otomatis dari jam lokal (sarapan, makan siang, makan malam, camilan).

2. Hitung anggaran slot dari target harian: sarapan 25%, makan siang 35%, makan malam 30%, camilan 10%.

3. Anggaran efektif = minimum dari (anggaran slot, sisa kalori hari ini).

4. Saring resep dengan tag waktu makan sama dan kalori per porsi tidak lebih dari anggaran efektif.

5. Urutkan dari selisih terkecil antara kalori resep dan anggaran efektif.

6. Tampilkan 5 teratas sebagai card. Jika hasil kosong, tampilkan menu ringan di bawah 150 kcal. Jika sisa kalori nol atau negatif, tampilkan pesan target tercapai.

  

Algoritma ini deterministik sehingga mudah diuji dengan data tetap.

  

### 9.5 Pengingat Terjadwal

  

1. Fungsi terjadwal berjalan setiap jam.

2. Pilih pengguna yang pengingatnya aktif, jam pengingatnya sama dengan jam sekarang (zona waktu pengguna), dan belum ada log pada hari itu.

3. Kirim email lewat Resend.

4. Catat di `reminder_log` (user, tanggal) agar tidak terkirim dua kali pada hari yang sama.

  

## 10. Model Data

  

Semua tabel memiliki `id`, `created_at`, `updated_at`. Semua tabel milik pengguna memiliki `user_id` dan dilindungi Row Level Security (pengguna hanya dapat membaca dan mengubah barisnya sendiri).

  

| Tabel | Kolom utama | Catatan |

| --- | --- | --- |

| profiles | user\_id (PK), nama, jenis\_kelamin, tanggal\_lahir, tinggi\_cm, activity\_level, goal\_type, target\_weight\_kg, timezone | Satu baris per pengguna |

| weight\_logs | user\_id, date, weight\_kg | Unik pada (user\_id, date) |

| exercise\_logs | user\_id, date, category, title, duration\_min, intensity, status, calories\_burned, todo\_id | category: gym, running, home |

| todos | user\_id, date, title, type, category, status, completed\_by, completed\_at, exercise\_log\_id | type: exercise atau general |

| foods | name, source, serving\_desc, serving\_g, kcal\_per\_serving | Data TKPI diimpor sekali (seed) |

| food\_logs | user\_id, date, meal\_type, food\_id, portion\_qty, kcal\_total | kcal\_total disimpan agar riwayat tidak berubah jika data makanan diperbarui |

| recipes | title, meal\_type, kcal\_per\_serving, prep\_minutes, ingredients (jsonb), steps (jsonb), image\_url | Seed 30-50 menu awal |

| daily\_summaries | user\_id, date, target\_kcal, burned\_kcal, consumed\_kcal, remaining\_kcal, todos\_done, todos\_total, exercise\_minutes | Hasil agregasi pipeline, dasar grafik dan dashboard |

| user\_streaks | user\_id, current\_streak, longest\_streak, last\_active\_date | Diperbarui oleh pipeline |

| reminder\_settings | user\_id, enabled, remind\_time |  |

| reminder\_log | user\_id, date | Mencegah email ganda |

| met\_values | category, intensity, met | Tabel konfigurasi MET |

  

Dengan `daily_summaries`, grafik dan dashboard cukup membaca satu tabel, tanpa menghitung ulang dari ribuan baris log.

  

## 11. Antarmuka API

  

Semua endpoint memerlukan sesi login. Format respons seragam: `{ data, error }`.

  

| Metode | Endpoint | Fungsi |

| --- | --- | --- |

| GET, PUT | /api/profile | Baca dan ubah profil |

| GET, POST | /api/exercise | Daftar dan buat log olahraga |

| PUT, DELETE | /api/exercise/:id | Ubah dan hapus log |

| GET, POST | /api/weight | Riwayat dan input berat |

| GET, POST | /api/todos | Daftar dan buat to-do |

| PATCH, DELETE | /api/todos/:id | Ubah status dan hapus |

| GET | /api/foods?q= | Cari makanan |

| GET, POST | /api/food-logs | Daftar dan catat asupan |

| GET | /api/summary?date= | Ringkasan harian (target, terbakar, masuk, sisa) |

| GET | /api/analytics?range= | Data grafik |

| GET | /api/recommendations?meal= | Card rekomendasi |

| GET | /api/recipes/:id | Detail resep |

  

## 12. Aturan Validasi

  

| Data | Aturan |

| --- | --- |

| Berat badan | 20-300 kg |

| Tinggi | 100-250 cm |

| Usia | 17-80 tahun (cakupan pengguna dewasa) |

| Durasi olahraga | 1-300 menit per sesi, total per hari maksimal 1440 menit |

| Perubahan berat | Selisih lebih dari 3 kg dari catatan sebelumnya dalam sehari: minta konfirmasi |

| Tanggal | Tidak boleh lebih dari hari ini untuk log berstatus selesai |

| Kalori makanan kustom | 0-5000 kcal per entri |

| Target berat | Harus searah dengan tujuan (tujuan turunkan: target di bawah berat saat ini) |

  

Validasi dilakukan dua kali: di form (pengalaman pengguna) dan di server dengan Zod (keamanan).

  

## 13. Rancangan Antarmuka

  

| Halaman | Isi utama |

| --- | --- |

| Login dan Registrasi | Form sederhana |

| Onboarding | Form profil bertahap |

| Dashboard | Ringkasan kalori, progres to-do, streak, card rekomendasi |

| Olahraga | Form cepat, template, riwayat |

| Berat Badan | Input, target, grafik progres |

| To-Do | Daftar harian dengan centang |

| Makanan | Pencarian, log asupan, rekomendasi dan resep |

| Analitik | Grafik dengan filter rentang |

| Pengaturan | Profil, pengingat |

  

**Pedoman UI:** tampilan bersih dan ringkas, palet netral dengan satu warna aksen, CSS variables sebagai token desain, hover animation dan transisi halus pada card, mobile-first (target lebar 360 px ke atas), kontras teks memenuhi standar keterbacaan dasar.

  

## 14. Kebutuhan Non-Fungsional

  

| Aspek | Syarat |

| --- | --- |

| Performa | Dashboard termuat kurang dari 2 detik, API baca p95 kurang dari 500 ms |

| Keamanan | HTTPS, Row Level Security, validasi server, tidak ada rahasia di kode klien |

| Keandalan | Operasi tulis atomik lewat transaksi |

| Kegunaan | Responsif, pesan error jelas dalam Bahasa Indonesia |

| Pemeliharaan | Aturan bisnis hanya di service layer, rumus dan MET sebagai konfigurasi |

| Privasi | Data hanya milik pengguna, dapat dihapus bersama akun |

  

## 15. Strategi Pengujian

  

| Tingkat | Alat | Cakupan |

| --- | --- | --- |

| Unit | Vitest | Rumus BMR, MET, target, batas bawah, progres berat, algoritma rekomendasi (memakai test case 9.2) |

| Integrasi | Vitest + database uji | Pipeline sinkronisasi, aturan pembalikan, unik berat per hari |

| API | Postman | Semua endpoint, termasuk kasus tidak terautentikasi dan input tidak valid |

| E2E | Playwright | Registrasi sampai dashboard, catat olahraga, to-do otomatis selesai, catat makanan |

| Keamanan | Manual | Pengguna A tidak dapat mengakses data pengguna B |

| Penerimaan (UAT) | Uji 5-10 pengguna + kuesioner SUS | Kegunaan dan kejelasan alur |

  

### Kriteria Penerimaan Kunci

  

1. **Diberikan** to-do Running hari ini belum selesai, **ketika** pengguna mencatat Running berstatus selesai, **maka** to-do otomatis selesai dan kalori terbakar muncul di ringkasan tanpa input tambahan.

2. **Diberikan** to-do yang selesai otomatis, **ketika** log olahraganya dihapus, **maka** to-do kembali belum selesai dan target kalori dihitung ulang.

3. **Diberikan** profil pada test case C, **maka** target harian tampil 1200 kcal beserta catatan batas aman.

4. **Diberikan** sisa kalori 600 kcal pada waktu makan siang, **maka** card yang tampil hanya menu makan siang dengan kalori tidak lebih dari anggaran efektif.

5. **Diberikan** dua pengguna berbeda, **maka** tidak ada data satu pengguna yang terlihat oleh yang lain.

  

## 16. Rencana Pengerjaan

  

| Tahap | Pekerjaan | Keluaran |

| --- | --- | --- |

| Minggu 1 | Setup proyek, skema database, RLS, autentikasi, layout dasar | Kerangka berjalan dan terdeploy |

| Minggu 2-3 | Profil, olahraga, berat badan, to-do, pipeline sinkronisasi | Alur inti Fase 1 |

| Minggu 4-5 | Grafik dan dashboard, pengujian Fase 1 | Fase 1 selesai |

| Minggu 6-7 | Rumus kalori, import TKPI, log makanan | Target kalori aktif |

| Minggu 8 | Resep, algoritma dan card rekomendasi | Fase 2 selesai |

| Minggu 9 | Pengingat, streak, template latihan | Fase 3 |

| Minggu 10 | UAT, perbaikan, dokumentasi dan laporan pengujian | Rilis akhir |

  

## 17. Risiko dan Mitigasi

  

| Risiko | Dampak | Mitigasi |

| --- | --- | --- |

| Cakupan terlalu lebar | Proyek tidak selesai | Rilis bertahap, Fase 1 sebagai produk utuh |

| Data makanan dan resep tidak akurat | Rekomendasi menyesatkan | Sumber TKPI, seed terbatas 30-50 menu yang diverifikasi manual |

| Estimasi kalori dianggap pengukuran medis | Salah pakai | Disclaimer di UI dan dokumentasi, batas bawah aman |

| Pengguna malas mencatat | Data sedikit, grafik kosong | Input cepat, template, pengingat, streak |

| Input ganda antar fitur | Data tidak konsisten | Pipeline tunggal dan transaksi atomik |

| Rumus berubah di tengah jalan | Hasil uji tidak valid | Konstanta di konfigurasi, test case baku |

  

## 18. Batasan dan Disclaimer

  

1. Seluruh hitungan kalori adalah estimasi, bukan pengukuran kebutuhan energi yang akurat secara medis.

2. Sistem tidak mendiagnosis kondisi medis dan tidak menggantikan dokter, ahli gizi, atau tenaga kesehatan profesional.

3. Akurasi data bergantung pada kelengkapan dan ketepatan input pengguna.

4. Pembaruan data berbasis aktivitas yang dicatat, bukan pemantauan real-time.

5. Integrasi perangkat eksternal tidak termasuk ruang lingkup pengembangan awal.

  

## 19. Definisi Selesai (Definition of Done)

  

1. Semua kebutuhan fungsional P1 dan P2 berjalan sesuai alur bagian 7.

2. Test case baku 9.2 lulus dan lima kriteria penerimaan terpenuhi.

3. Tidak ada kebocoran data antar pengguna pada uji keamanan.

4. Skor SUS pada uji pengguna mencapai 68 atau lebih.

5. Aplikasi terdeploy, dokumentasi dan laporan pengujian lengkap.