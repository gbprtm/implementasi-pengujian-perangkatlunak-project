# Tahap 9 - Frontend

Status: ditunda. Prasyarat: Tahap 8 selesai.

Skill saat mulai: `frontend-design`, `tdd`.

## Tujuan

Menambahkan retensi dan kenyamanan: pengingat, streak, template latihan, dan insight.

## Halaman dan Komponen

| Bagian | Rute | Isi |
| --- | --- | --- |
| Pengaturan pengingat | `/settings/reminders` | Aktif, jam, zona waktu |
| Streak | `/dashboard` | Streak saat ini dan terpanjang |
| Template latihan | `/exercise/templates` | Daftar template per kategori, tombol pakai |
| Insight | `/analytics` | Insight berbasis aturan |

## Perilaku

- Pengingat email dapat diaktifkan dan diatur jamnya.
- Status pengingat menjelaskan bahwa email hanya dikirim bila belum ada log hari itu.
- Streak menampilkan jumlah hari berturut-turut dengan minimal satu aktivitas.
- Template mengisi form olahraga cepat.
- Tombol ulangi kemarin menyalin log terakhir.
- Insight memakai bahasa deskriptif, bukan saran medis.

## Batasan

- Tidak ada prediksi kesehatan.
- Insight hanya dari aturan ambang yang eksplisit.
- Pengaturan pengingat menampilkan zona waktu pengguna.

## Definition of Done

- Pengaturan pengingat tersimpan.
- Streak tampil dan diperbarui.
- Template mengisi form dengan benar.
- Insight muncul sesuai aturan dan dapat dijelaskan.

## Pengujian

- E2E: atur pengingat, lihat status.
- E2E: pakai template, log terbentuk.
- Manual: streak setelah beberapa hari aktivitas.
