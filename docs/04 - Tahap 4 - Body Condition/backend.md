# Tahap 4 - Backend

Status: belum mulai. Prasyarat: Tahap 3 selesai.

Skill saat mulai: `tdd`.

## Tujuan

Menyimpan berat badan per hari dan menghitung progres menuju target secara konsisten.

## Endpoint

| Metode | Endpoint | Fungsi |
| --- | --- | --- |
| GET | /api/weight | Riwayat berat dan target |
| POST | /api/weight | Simpan berat pada tanggal tertentu |

## Aturan Simpan

- Satu catatan per pengguna per tanggal.
- Input pada tanggal yang sama menimpa nilai lama, tidak membuat baris baru.
- Selisih lebih dari 3 kg dari catatan sebelumnya dalam sehari ditolak kecuali permintaan menyertakan `confirm = true`.
- Berat 20-300 kg.

## Rumus Progres

```
progress = ((berat_awal - berat_terbaru) / (berat_awal - target)) x 100
```

- Dibulatkan dan dibatasi 0-100.
- Untuk tujuan menaikkan berat, arah selisih dibalik.
- Bila target sama dengan berat awal, progres ditampilkan 100 hanya jika target tercapai; selain itu 0.

## Service

- `upsertWeight(userId, date, weightKg, confirm)`.
- `getWeightHistory(userId)`.
- `calculateProgress(initialWeight, latestWeight, targetWeight, goalType)`.
- Perubahan berat memicu hitung ulang `daily_summaries` tanggal terkait bila ringkasan memakai berat (Tahap 8).

## Validasi

| Field | Aturan |
| --- | --- |
| date | tanggal valid, tidak di masa depan |
| weight_kg | 20-300 |
| target_weight_kg | searah dengan goal_type |
| confirm | wajib true bila selisih lebih dari 3 kg |

## Definition of Done

- Upsert per hari berjalan.
- Rumus progres lulus uji untuk turun, jaga, dan naik.
- Target tidak searah ditolak.
- Konfirmasi 3 kg bekerja.

## Pengujian

- Unit: rumus progres, pembatasan 0-100, arah naik dan turun, target sama dengan awal.
- Integrasi: constraint unik dan upsert.
- API: validasi tanggal, berat, target, confirm.
