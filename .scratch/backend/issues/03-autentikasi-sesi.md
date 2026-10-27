# 03: Autentikasi sesi dan gerbang `/api/me`

**Ringkasan:** pendaftaran, login, dan logout, plus penjaga sesi yang seragam untuk semua endpoint berikutnya.

**What to build:** pengguna dapat mendaftar dengan email dan password, masuk, dan keluar lewat Supabase Auth. Sebuah middleware menjaga rute terproteksi, dan setiap route handler yang baru dibalas 401 `{ data: null, error }` bila tidak ada sesi. `/api/me` mengembalikan identitas sesi aktif sebagai bukti jalur autentikasi bekerja end-to-end.

**Blocked by:** 02

**Status:** ready-for-agent

- [ ] Registrasi, login, dan logout berjalan
- [ ] Middleware sesi menjaga rute terproteksi
- [ ] `/api/me` mengembalikan identitas sesi yang valid
- [ ] Permintaan tanpa sesi dibalas 401 dengan format `{ data: null, error }`
- [ ] Sesi kedaluwarsa kembali ditolak
