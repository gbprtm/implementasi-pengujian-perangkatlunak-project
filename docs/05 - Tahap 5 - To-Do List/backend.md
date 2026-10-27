---
title: Tahap 5 - Backend
created: 2026-10-27
tags:
  - implementasiPengujianPerangkatLunak
---

> [[README|Indeks]] · [[docs/00 - PRD Daily Tracker|PRD]] · [[docs/05 - Tahap 5 - To-Do List/frontend|Frontend]] · [[docs/05 - Tahap 5 - To-Do List/backend|Backend]]

# Tahap 5 - Backend

Status: belum mulai. Prasyarat: Tahap 3 selesai.

Skill saat mulai: `tdd`.

## Tujuan

Mengelola to-do harian dan menjaga konsistensi dengan pipeline olahraga.

## Endpoint

| Metode | Endpoint | Fungsi |
| --- | --- | --- |
| GET | /api/todos?date= | Daftar to-do per tanggal |
| POST | /api/todos | Buat to-do |
| PATCH | /api/todos/:id | Ubah status atau isi |
| DELETE | /api/todos/:id | Hapus to-do |

## Model Status

- `open` dan `done`, tanpa status lain.
- `completed_by`: `manual` atau `auto`.
- Transisi `open` ke `done` manual mengisi `completed_by = manual` dan `completed_at`.
- Transisi `done` ke `open` manual dibolehkan bila `completed_by = manual`.
- To-do `auto` hanya dibalik oleh pipeline olahraga, bukan oleh aksi manual biasa.

## Aturan

- To-do tipe olahraga wajib punya kategori.
- Satu log olahraga hanya menyelesaikan to-do yang cocok pada tanggal dan kategori yang sama.
- Menghapus to-do tidak menghapus log olahraga.
- Progres dihitung dari jumlah `done` dibagi total pada tanggal tersebut.
- Perubahan to-do memicu hitung ulang `daily_summaries`.

## Service

- `createTodo`, `updateTodo`, `deleteTodo`, `listTodos`.
- `syncTodoFromExercise` dipakai pipeline Tahap 3, bukan duplikasi logika.
- `recalculateTodoProgress(userId, date)`.

## Validasi

| Field | Aturan |
| --- | --- |
| title | 1-120 karakter |
| type | exercise, general |
| category | wajib bila type exercise |
| date | tanggal valid |
| status | open, done |

## Definition of Done

- CRUD berjalan dengan sesi valid.
- Progres akurat setelah tambah, centang, hapus.
- To-do auto tidak dapat dibalik manual tanpa mengubah log.
- Ringkasan harian ikut diperbarui.

## Pengujian

- Unit: transisi status dan aturan `completed_by`.
- Integrasi: sinkronisasi dengan pipeline olahraga.
- API: validasi tipe, kategori, tanggal, tanpa sesi, akses lintas pengguna.

## Navigasi

- [[README|Indeks dokumentasi]]
- [[docs/00 - PRD Daily Tracker|PRD Daily Tracker]]
- [[docs/05 - Tahap 5 - To-Do List/frontend|Tahap 5 Frontend]] · [[docs/05 - Tahap 5 - To-Do List/backend|Tahap 5 Backend]]
- Sebelumnya: [[docs/04 - Tahap 4 - Body Condition/frontend|Tahap 4 Frontend]] · [[docs/04 - Tahap 4 - Body Condition/backend|Tahap 4 Backend]]
- Berikutnya: [[docs/06 - Tahap 6 - Dashboard dan Analytics/frontend|Tahap 6 Frontend]] · [[docs/06 - Tahap 6 - Dashboard dan Analytics/backend|Tahap 6 Backend]]
