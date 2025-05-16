# Generator Kode QR

Aplikasi generator kode QR sederhana dan modern yang dibangun dengan React dan Vite. Generate kode QR untuk teks, URL, atau konten lainnya, dan unduh dalam format PNG.

## Fitur

- Generate kode QR dari teks atau URL
- Ukuran kode QR yang dapat disesuaikan
- Unduh kode QR sebagai file PNG
- Tampilan UI yang modern dan responsif
- Antarmuka yang mudah digunakan

## Memulai

### Prasyarat

- Node.js (versi 14 atau lebih tinggi)
- npm (sudah termasuk dengan Node.js)

### Instalasi

1. Clone repositori:
   ```bash
   git clone https://github.com/dalamjaringan/QR-Generator.git
   cd qr-code-generator
   ```

2. Install dependensi:
   ```bash
   npm install
   ```

3. Jalankan server pengembangan:
   ```bash
   npm run dev
   ```

4. Buka browser Anda dan akses `http://localhost:5173`

### Build untuk Produksi

Untuk membuat build produksi:

```bash
npm run build
```

File hasil build akan tersedia di direktori `dist`.

## Deployment

Proyek ini dikonfigurasi untuk otomatis deploy ke GitHub Pages ketika Anda melakukan push ke branch main. Untuk mengatur deployment GitHub Pages:

1. Buat repositori baru di GitHub
2. Push kode Anda ke repositori tersebut
3. Buka Settings > Pages pada repositori
4. Atur source ke "GitHub Actions"

Situs akan otomatis di-deploy ketika Anda melakukan push ke branch main.

## Lisensi

Proyek ini dilisensikan di bawah Lisensi MIT - lihat file LICENSE untuk detail lebih lanjut. 