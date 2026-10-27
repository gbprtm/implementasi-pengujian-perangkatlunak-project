# 06: To-do harian manual dan progres

**Ringkasan:** daftar tugas harian dengan centang manual dan progres, sebagai sisi rencana dari fitur olahraga.

**What to build:** pengguna dapat membuat, mengubah status, dan menghapus to-do harian bertipe olahraga atau umum. To-do olahraga wajib punya kategori agar dapat dicocokkan dengan log olahraga pada tiket pipeline. Status hanya `open` dan `done`, dengan sumber penyelesaian `manual` atau `auto`. Progres harian dihitung dari jumlah selesai dibagi total.

**Blocked by:** 04

**Status:** ready-for-agent

- [ ] `GET`, `POST`, `PATCH`, dan `DELETE` `/api/todos` berjalan
- [ ] Tipe olahraga dan umum; to-do olahraga wajib kategori
- [ ] Status `open` dan `done`, `completed_by` bernilai `manual` atau `auto`
- [ ] Progres harian = selesai dibagi total
- [ ] Perubahan to-do memicu hitung ulang ringkasan tanggal terkait
- [ ] Permintaan tanpa sesi dan akses lintas pengguna ditolak
