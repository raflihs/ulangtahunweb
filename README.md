# Ulang Tahun untuk Novita

Halaman kejutan ulang tahun interaktif yang dibuat khusus untuk Novita. Proyek ini berupa situs statis berbasis HTML, CSS, dan JavaScript tanpa proses build atau dependency tambahan.

## Fitur

- **Amplop pembuka** dengan animasi sebelum masuk ke halaman utama.
- **Musik latar acak** yang mulai setelah amplop dibuka, lanjut ke lagu acak lain setelah lagu selesai, dan diputar pada volume 50%.
- **Cerita dan timeline** dengan popup untuk membuka detail kenangan.
- **Galeri foto** bergaya Polaroid, termasuk tampilan foto yang dapat diperbesar.
- **Mini game enam tantangan** dengan urutan pengerjaan bebas untuk tantangan 1–5, progres jawaban, dan tantangan 6 yang terbuka setelah lima tantangan lainnya selesai.
- **Form impian dan harapan** dengan pertanyaan reflektif dan satu kolom bebas opsional; jawaban dikirim ke Google Sheets melalui Google Apps Script.
- **Hadiah kejutan akhir** setelah semua tantangan selesai.
- **Tampilan responsif** untuk desktop dan ponsel.

## Menjalankan secara lokal

Jalankan server HTTP statis dari folder proyek, misalnya:

```powershell
python -m http.server 8000
```

Kemudian buka <http://localhost:8000/index_edited.html>.

## Foto dan musik

- Simpan foto kenangan di `assets/memories/` sesuai nama file yang direferensikan di `index_edited.html`.
- File MP3 tidak disertakan dalam repository. `.gitignore` mengecualikan `assets/music/*.mp3`; gunakan hanya musik yang kamu miliki atau berlisensi untuk dibagikan jika ingin menghostingnya.
- Untuk memutar musik, letakkan file yang sesuai di `assets/music/`. Nama file yang diharapkan ada di daftar `musicTracks` pada halaman.

## Google Sheets

Form impian memerlukan deployment Google Apps Script yang terhubung ke spreadsheet tujuan. Ikuti langkah dalam [GOOGLE_SHEETS_SETUP.md](./GOOGLE_SHEETS_SETUP.md). Jangan bagikan URL Web App atau spreadsheet secara publik; endpoint Web App yang menerima kiriman dapat digunakan siapa pun yang mengetahui URL-nya.

## Publikasi online

Repository ini dapat dipublikasikan sebagai situs statis menggunakan GitHub Pages. Namun, situs Pages dapat diakses publik walaupun repository sumbernya private. Periksa informasi pribadi dan URL Google Apps Script di `index_edited.html` sebelum mengaktifkannya. Panduan pengaturan tersedia di [GitHub Pages](https://docs.github.com/pages).
