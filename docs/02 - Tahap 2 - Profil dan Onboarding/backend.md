# Tahap 2 - Backend

Status: belum mulai. Prasyarat: Tahap 1 selesai.

Skill saat mulai: `tdd`.

## Tujuan

Menyimpan profil pengguna dan berat awal dengan validasi server yang ketat.

## Endpoint

| Metode | Endpoint | Fungsi |
| --- | --- | --- |
| GET | /api/profile | Baca profil sesi aktif |
| PUT | /api/profile | Buat atau ubah profil |

Respons seragam `{ data, error }`.

## Skema Validasi (Zod)

| Field | Aturan |
| --- | --- |
| nama | 1-80 karakter |
| jenis_kelamin | male atau female |
| tanggal_lahir | usia 17-80 tahun |
| tinggi_cm | 100-250 |
| berat_kg | 20-300 |
| activity_level | low, medium, high |
| goal_type | lose, maintain, gain |
| target_weight_kg | 20-300 dan searah goal |
| timezone | nama zona waktu valid |

## Service

- `getProfile(userId)`: ambil profil atau null.
- `upsertProfile(userId, input)`: validasi, simpan profil, dan catat berat awal bila belum ada catatan pada tanggal hari ini.
- Perhitungan target kalori tidak dilakukan di tahap ini (P2, Tahap 8).

## Repository

- `findProfileByUser(userId)`.
- `upsertProfile(row)`.
- `upsertWeightLog(userId, date, weightKg)`.

## Aturan

- Profil tidak lengkap ditandai oleh field wajib yang null.
- Perubahan profil tidak menghapus riwayat berat.
- Berat awal hanya dicatat sekali saat onboarding; input berikutnya lewat endpoint berat.

## Definition of Done

- GET dan PUT berjalan dengan sesi valid.
- Input di luar batas ditolak tanpa menyimpan data.
- Berat awal tercatat di `weight_logs`.
- Tanpa sesi mengembalikan 401.

## Pengujian

- Unit: batas usia, tinggi, berat, arah target.
- API: input tidak valid, tanpa sesi, update sebagian.
- Integrasi: onboarding menulis profil dan berat awal dalam satu alur.
