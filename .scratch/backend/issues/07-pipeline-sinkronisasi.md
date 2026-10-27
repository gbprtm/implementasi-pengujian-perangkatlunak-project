# 07: Pipeline sinkronisasi: to-do otomatis, pembalikan, ringkasan harian

**Ringkasan:** fitur pembeda proyek, satu input pengguna memicu banyak pembaruan otomatis secara konsisten.

**What to build:** ketika log olahraga berstatus selesai disimpan, sistem dalam satu transaksi database menyelesaikan to-do olahraga yang cocok, menghitung ulang ringkasan harian tanggal terdampak, dan mengembalikan ringkasan terbaru. Bila log dihapus atau dikembalikan ke direncanakan, to-do yang selesai otomatis dibuka kembali, sedangkan to-do yang dicentang manual tidak diubah. Pipeline atomik dan idempoten: berjalan berulang memberi hasil sama, dan gagal di tengah tidak menyisakan data parsial.

**Blocked by:** 05, 06

**Status:** ready-for-agent

- [ ] Kriteria penerimaan 1 PRD: to-do Running selesai otomatis dan kalori muncul di ringkasan tanpa input tambahan
- [ ] Kriteria penerimaan 2 PRD: menghapus log mengembalikan to-do otomatis menjadi belum selesai
- [ ] To-do dengan `completed_by = manual` tidak diubah oleh pipeline
- [ ] Ringkasan harian dihitung ulang dan idempoten
- [ ] Gagal di tengah pipeline tidak menyisakan data parsial
- [ ] Sinkronisasi memakai satu fungsi service, bukan logika ganda
