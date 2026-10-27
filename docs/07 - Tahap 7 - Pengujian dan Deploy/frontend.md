# Tahap 7 - Frontend

Status: belum mulai. Prasyarat: Tahap 6 selesai.

Skill saat mulai: `tdd`, `code-review`.

## Tujuan

Membuktikan kualitas UI Fase 1 dan menyiapkan bukti pengujian.

## Pekerjaan

- Menambahkan atribut uji yang stabil (`data-testid`) pada elemen penting.
- Menutup celah keadaan: loading, kosong, error, tanpa sesi.
- Memeriksa responsif pada 360, 768, dan 1280 px.
- Memeriksa aksesibilitas dasar: label, fokus, kontras, urutan tab.
- Menyiapkan data uji yang dapat diulang untuk E2E.
- Merekam bukti: tangkapan layar dan video singkat alur utama.

## E2E Playwright

| Skenario | Titik henti |
| --- | --- |
| Registrasi sampai dashboard | Akun baru, onboarding, dashboard tampil |
| Catat olahraga | To-do otomatis selesai, kalori tampil |
| Hapus olahraga | To-do kembali belum selesai |
| Catat berat | Progres berubah, grafik diperbarui |
| To-do manual | Centang dan progres |
| Filter analitik | 7, 30, 90 hari |

## Kriteria Lulus

- Seluruh skenario E2E lulus berurutan pada database uji.
- Tidak ada error konsol pada alur utama.
- Dashboard tampil di bawah 2 detik pada data uji.
- Tampilan tidak rusak pada tiga lebar target.

## Keluaran

- Berkas uji E2E.
- Laporan hasil dengan tangkapan layar.
- Daftar isu terbuka bila ada.
