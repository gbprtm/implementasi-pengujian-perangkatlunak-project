# 08: Edit dan hapus log olahraga dengan hitung ulang

**Ringkasan:** mengubah atau menghapus log olahraga sambil menjaga konsistensi ringkasan dan to-do.

**What to build:** pengguna dapat mengubah dan menghapus log olahraga. Setiap perubahan menjalankan ulang pipeline pada tanggal terdampak. Bila tanggal atau kategori berpindah, ringkasan tanggal lama dan baru sama-sama diperbarui. Perubahan status dari selesai ke direncanakan memicu aturan pembalikan. Log milik pengguna lain tidak dapat diubah.

**Blocked by:** 07

**Status:** ready-for-agent

- [ ] `PUT /api/exercise/:id` mengubah log dan menghitung ulang kalori bila perlu
- [ ] `DELETE /api/exercise/:id` menghapus log dan memicu pembalikan to-do otomatis
- [ ] Perpindahan tanggal memengaruhi ringkasan tanggal lama dan baru
- [ ] Perubahan status selesai ke direncanakan membalik to-do otomatis
- [ ] Akses ke ID milik pengguna lain ditolak
