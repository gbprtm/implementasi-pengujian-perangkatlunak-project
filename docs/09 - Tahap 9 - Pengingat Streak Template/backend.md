# Tahap 9 - Backend

Status: ditunda. Prasyarat: Tahap 8 selesai.

Skill saat mulai: `tdd`.

## Tujuan

Menyediakan pengingat terjadwal, streak, template latihan, dan insight berbasis aturan.

## Tabel Tambahan

| Tabel | Kolom utama | Aturan |
| --- | --- | --- |
| user_streaks | user_id, current_streak, longest_streak, last_active_date | Satu baris per pengguna |
| reminder_settings | user_id, enabled, remind_time, timezone | Satu baris per pengguna |
| reminder_log | user_id, date | Unik pada (user_id, date) |

## Pengingat (PRD 9.5)

1. Fungsi terjadwal berjalan setiap jam.
2. Pilih pengguna dengan pengingat aktif, jam sama dengan jam sekarang di zona waktunya, dan belum ada log hari itu.
3. Kirim email lewat Resend.
4. Catat di `reminder_log` agar tidak terkirim dua kali.

## Streak

- Diperbarui oleh pipeline saat ada aktivitas.
- Hari berturut-turut dengan minimal satu log, berat, atau to-do selesai.
- `last_active_date` mencegah hitung ganda pada hari yang sama.

## Template dan Insight

- Template latihan per kategori: nama, durasi, intensitas, kategori.
- Insight berbasis aturan: laju perubahan berat per minggu dibanding target laju.
- Bahasa insight deskriptif, tanpa diagnosis.

## Definition of Done

- Pengingat tidak mengirim email ganda pada hari yang sama.
- Streak akurat untuk data uji beberapa hari.
- Template dapat dipakai membuat log.
- Insight hanya muncul saat aturan terpenuhi.

## Pengujian

- Unit: aritmetika tanggal, deduplikasi pengingat, aturan streak.
- Integrasi: fungsi terjadwal dengan zona waktu.
- API: pengaturan pengingat, template, tanpa sesi.
