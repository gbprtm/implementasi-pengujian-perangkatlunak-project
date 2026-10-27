# Tahap 6 - Frontend

Status: belum mulai. Prasyarat: Tahap 3, 4, dan 5 selesai.

Skill saat mulai: `frontend-design`, `tdd`.

## Tujuan

Menyatukan seluruh data Fase 1 ke dashboard dan halaman analitik.

## Halaman

| Halaman | Rute | Isi |
| --- | --- | --- |
| Dashboard | `/dashboard` | Ringkasan hari ini, progres to-do, grafik ringkas |
| Analitik | `/analytics` | Grafik lengkap dengan filter rentang |

## Dashboard

Kartu ringkasan:

- Olahraga: jumlah sesi, total durasi, kalori terbakar.
- Berat: berat terbaru, target, persentase progres.
- To-do: selesai dibagi total.
- Tautan cepat ke form olahraga, berat, dan to-do.

Grafik ringkas: berat 30 hari, olahraga mingguan, progres to-do.

## Analitik

- Grafik garis berat badan dengan garis target.
- Grafik batang frekuensi dan durasi olahraga per minggu.
- Grafik progres penyelesaian to-do harian.
- Filter rentang: 7, 30, 90 hari.
- Keadaan kosong yang menjelaskan cara mengisi data.

## Komponen

- `SummaryCard`.
- `WeightChart`, `ExerciseBarChart`, `TodoProgressChart`.
- `RangeFilter`.
- `EmptyChartState`.

## Batasan

- Semua angka berasal dari API `/api/summary` dan `/api/analytics`.
- Tidak ada agregasi data di klien.
- Mobile-first; grafik tetap terbaca pada 360 px.
- Target performa: dashboard tampil di bawah 2 detik pada data uji.

## Definition of Done

- Dashboard menampilkan ringkasan hari ini dengan benar.
- Filter rentang berjalan.
- Grafik kosong tidak menampilkan error.
- Perpindahan antara dashboard dan analitik konsisten.

## Pengujian

- E2E: dashboard setelah mencatat olahraga, berat, dan to-do.
- E2E: filter 7/30/90 hari.
- Manual: performa dan keterbacaan grafik.
