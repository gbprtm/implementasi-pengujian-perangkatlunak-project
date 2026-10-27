# 05: Catat log olahraga dengan kalori MET

**Ringkasan:** pencatatan olahraga yang langsung menghitung kalori terbakar dari MET, berat badan, dan durasi.

**What to build:** pengguna dapat mencatat olahraga dengan kategori, nama latihan, durasi, intensitas, tanggal, dan status. Server menghitung kalori terbakar memakai nilai MET dan berat terbaru pengguna; UI dan klien tidak pernah menghitung sendiri. Riwayat dapat difilter per tanggal dan kategori. Status `direncanakan` belum menghitung kalori; hanya `selesai` yang dihitung.

**Blocked by:** 04

**Status:** ready-for-agent

- [ ] `POST /api/exercise` membuat log dengan kategori, durasi, intensitas, tanggal, dan status
- [ ] `GET /api/exercise` mendaftar log dengan filter tanggal dan kategori
- [ ] Kalori dihitung `(MET - 1) x berat x jam`, hanya untuk status selesai
- [ ] Unit test cocok: Running sedang 30 menit, berat 70 kg = 308 kcal
- [ ] Durasi 1-300 menit ditegakkan; total per hari maksimum 1440 menit
- [ ] Tanggal di masa depan untuk log selesai ditolak
