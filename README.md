# Job Tracker

Aplikasi web untuk memantau lamaran magang: tambah, edit, dan hapus lamaran, ubah status, cari dan filter, serta lihat ringkasan lewat kartu dan chart.

**Live demo:** [isi link Vercel]

![Screenshot](./public/screenshot.png)

## Fitur

- CRUD lamaran: tambah, edit (modal), ubah status, dan hapus
- Pencarian perusahaan/posisi dan filter berdasarkan status
- Kartu ringkasan dengan persentase per status
- Bar chart jumlah lamaran per status
- Nama pengguna bisa diubah langsung dari navbar (tersimpan di browser)
- REST API route (`GET`, `POST`, `PATCH`, `DELETE`) di `/api/applications`

## Tech Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS
- Recharts
- Deploy di Vercel

## Menjalankan Lokal

```bash
npm install
npm run dev
```

Buka http://localhost:3000.

## Kredit

Ikon aplikasi: [Pixel perfect](https://www.flaticon.com/free-icon/employee_2572970?term=job&page=1&position=5&origin=search&related_id=2572970)

## Catatan

Data lamaran disimpan di memori server (tanpa database), jadi bisa kembali ke data awal saat server restart. Ini disengaja agar demo ringan dan gratis. Pengembangan berikutnya: menyimpan data ke database (misalnya Supabase) dan menambah autentikasi.