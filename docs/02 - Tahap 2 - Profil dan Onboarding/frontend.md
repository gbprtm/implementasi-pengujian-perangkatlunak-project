# Tahap 2 - Frontend

Status: belum mulai. Prasyarat: Tahap 1 selesai.

Skill saat mulai: `frontend-design`, `tdd`.

## Tujuan

Menyediakan formulir onboarding dan pengaturan profil yang lengkap dan tervalidasi.

## Halaman

| Halaman | Rute | Isi |
| --- | --- | --- |
| Onboarding | `/onboarding` | Formulir bertahap, empat langkah |
| Pengaturan profil | `/settings/profile` | Formulir yang sama dalam mode ubah |

## Langkah Onboarding

1. Data dasar: nama, jenis kelamin, tanggal lahir.
2. Tubuh: tinggi, berat awal.
3. Aktivitas: tingkat aktivitas harian.
4. Tujuan: goal_type, target berat, zona waktu.

## Perilaku

- Indikator langkah dan tombol kembali serta lanjut.
- Validasi klien mengikuti batas: usia 17-80, tinggi 100-250 cm, berat 20-300 kg.
- Pesan error per field, bukan hanya ringkasan.
- Setelah selesai, arahkan ke `/dashboard`.
- Pengguna yang profilnya belum lengkap melihat ajakan melengkapi, tetapi fitur olahraga dan to-do tetap dapat dipakai.
- Mode ubah memuat data yang ada dan menyimpan perubahan.

## Komponen

- `ProfileWizard`: pengelola langkah dan state formulir.
- `StepIndicator`.
- `WeightInput`, `HeightInput`, `DateInput` dengan satuan jelas.
- `GoalSelect` dengan penjelasan singkat tiap pilihan.

## Definition of Done

- Onboarding selesai dan profil tersimpan.
- Input tidak valid ditolak di klien dan server.
- Pengguna dapat mengubah profil kapan saja.
- Berat awal muncul di riwayat berat badan.

## Pengujian

- E2E: registrasi, onboarding, dashboard.
- E2E: input tidak valid menampilkan pesan.
- Manual: navigasi keyboard dan label input.
