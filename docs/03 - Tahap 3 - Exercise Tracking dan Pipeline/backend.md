# Tahap 3 - Backend

Status: belum mulai. Prasyarat: Tahap 2 selesai.

Skill saat mulai: `tdd`.

## Tujuan

Membangun fitur inti: pencatatan olahraga yang memicu pipeline sinkronisasi atomik.

## Endpoint

| Metode | Endpoint | Fungsi |
| --- | --- | --- |
| GET | /api/exercise | Daftar log dengan filter tanggal dan kategori |
| POST | /api/exercise | Buat log |
| PUT | /api/exercise/:id | Ubah log |
| DELETE | /api/exercise/:id | Hapus log |

## Perhitungan Kalori

```
calories = (MET - 1) x berat_kg x (durasi_menit / 60)
```

MET diambil dari tabel `met_values`. Berat diambil dari `weight_logs` terbaru pada atau sebelum tanggal log. Kalori hanya dihitung saat status `done`, lalu dibulatkan ke bilangan bulat.

Contoh uji: Running sedang 30 menit, berat 70 kg menghasilkan `(9.8 - 1) x 70 x 0.5 = 308` kcal.

## Pipeline Sinkronisasi

Satu fungsi service, satu transaksi database:

1. Validasi input.
2. Simpan perubahan pada `exercise_logs`.
3. Hitung kalori bila status selesai.
4. Sinkronkan to-do: to-do tipe olahraga pada tanggal dan kategori sama yang belum selesai diubah menjadi selesai dengan `completed_by = auto`.
5. Hitung ulang `daily_summaries` tanggal terdampak; operasi idempoten.
6. Kembalikan ringkasan terbaru.

## Aturan Pembalikan

- Saat log dihapus atau status berubah dari selesai menjadi direncanakan, to-do dengan `completed_by = auto` dikembalikan ke belum selesai.
- To-do dengan `completed_by = manual` tidak diubah.
- Perubahan tanggal atau kategori memicu hitung ulang pada tanggal lama dan baru.

## Validasi

| Field | Aturan |
| --- | --- |
| category | gym, running, home |
| duration_min | 1-300 |
| intensity | light, medium, heavy |
| status | planned, done |
| date | tidak melebihi hari ini untuk status selesai |
| total durasi per hari | maksimum 1440 menit |

## Definition of Done

- Kriteria penerimaan 1 dan 2 PRD lulus.
- Perhitungan kalori cocok dengan test case baku.
- Pipeline idempoten dan atomik.
- Perubahan tanggal memengaruhi ringkasan tanggal yang benar.

## Pengujian

- Unit: rumus MET, pembulatan, batas durasi.
- Integrasi: auto-complete, pembalikan, idempotensi, rollback saat gagal.
- API: input tidak valid, tanpa sesi, ID milik pengguna lain.
