# Tahap 5 - Frontend

Status: belum mulai. Prasyarat: Tahap 3 selesai.

Skill saat mulai: `tdd`, `frontend-design`.

## Tujuan

Menyediakan daftar tugas harian dengan progres dan penanda penyelesaian otomatis.

## Halaman

| Halaman | Rute | Isi |
| --- | --- | --- |
| To-do | `/todos` | Daftar hari ini, form tambah, progres |

## Perilaku

- Tambah to-do tipe umum atau olahraga.
- To-do olahraga dapat memiliki kategori agar sinkron dengan log olahraga.
- Centang manual dua arah.
- To-do yang selesai otomatis menampilkan label "otomatis" dan tidak dapat dibalik manual tanpa mengubah log olahraga.
- Progres harian: `selesai / total`, dengan keadaan kosong yang jelas.
- Filter tanggal untuk melihat hari lain.

## Komponen

- `TodoList`.
- `TodoItem` dengan checkbox, judul, tipe, dan sumber penyelesaian.
- `TodoQuickAdd`.
- `DailyProgressBar`.

## Keadaan

- Kosong: ajakan menambah tugas pertama.
- Semua selesai: ringkasan singkat dan ajakan menambah.
- Error: pertahankan input dan tampilkan tombol coba lagi.

## Definition of Done

- Tambah, centang, dan hapus berjalan.
- Progres benar setelah perubahan.
- Label otomatis tampil dan tidak membingungkan.
- Filter tanggal berjalan.

## Pengujian

- E2E: tambah to-do, centang manual, progres berubah.
- E2E: to-do olahraga selesai otomatis setelah log dicatat.
- E2E: hapus log, to-do otomatis kembali belum selesai.
- Manual: navigasi keyboard pada checkbox.
