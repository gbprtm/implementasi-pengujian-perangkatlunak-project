# Tahap 8 - Frontend

Status: ditunda. Prasyarat: Tahap 7 selesai.

Skill saat mulai: `frontend-design`, `tdd`.

## Tujuan

Menambahkan target kalori harian, log makanan, dan rekomendasi resep.

## Halaman

| Halaman | Rute | Isi |
| --- | --- | --- |
| Makanan | `/food` | Pencarian, log asupan, sisa kalori |
| Rekomendasi | `/food/recommendations` | Card menu sesuai waktu makan |
| Detail resep | `/food/recipes/[id]` | Bahan, langkah, tombol catat |

## Dashboard Tambahan

- Target kalori, kalori masuk, kalori terbakar, sisa kalori.
- Catatan bila target terkena batas aman.
- Card rekomendasi sesuai waktu makan.

## Perilaku

- Pencarian makanan dari database TKPI dengan porsi.
- Makanan kustom dengan input kalori manual 0-5000.
- Card rekomendasi menampilkan nama, foto, kalori per porsi, waktu masak, tag waktu makan.
- Tombol catat menambahkan menu ke log makanan.
- Sisa kalori nol atau negatif menampilkan pesan target tercapai dan opsi camilan ringan.

## Batasan

- Angka kalori dari server.
- Tidak ada pemindaian makanan otomatis.
- Mobile-first; card dapat digulir horizontal pada layar sempit.

## Definition of Done

- Target kalori tampil dan berubah saat profil, berat, atau olahraga berubah.
- Pencarian dan log makanan berjalan.
- Card rekomendasi sesuai algoritma PRD 9.4.
- Resep dapat dibuka dan dicatat.

## Pengujian

- E2E: catat makanan, sisa kalori berubah.
- E2E: rekomendasi tersaring sesuai sisa kalori.
- Manual: batas aman dan pesan target tercapai.
