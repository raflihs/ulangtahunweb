# Menghubungkan jawaban Level 6 ke Google Sheets

1. Buka spreadsheet tujuan: [Google Sheets](https://docs.google.com/spreadsheets/d/1EjJcOI40hLpnAwM9KY2C9ByPkwtcy9DvibLg1UR5SV0/edit).
2. Pilih **Extensions → Apps Script**.
3. Ganti isi editor dengan kode terbaru di [GoogleSheets.gs](./GoogleSheets.gs), lalu simpan.
4. Pilih **Deploy → Manage deployments**, tekan ikon pensil pada deployment Web App yang sudah ada, pilih **New version**, lalu deploy. Jika belum ada deployment, pilih **Deploy → New deployment → Web app**.
5. Atur **Execute as** menjadi **Me** dan **Who has access** menjadi **Anyone**, lalu deploy dan setujui izin yang diminta Google.
6. Gunakan URL Web App yang berakhiran `/exec`. Deployment yang diperbarui biasanya tetap memakai URL yang sama.
7. Pastikan [index_edited.html](./index_edited.html) memiliki URL tersebut pada `GOOGLE_SHEETS_WEB_APP_URL`.

8. Muat ulang halaman. Kiriman akan disimpan pada tab **Jawaban Harapan**, yang dibuat otomatis. Jika tab itu sudah berisi format jawaban versi sebelumnya, jawaban lengkap akan disimpan pada tab **Jawaban Harapan (Lengkap)** agar data lama tetap utuh. Baris baru memuat waktu kirim, sepuluh jawaban pertanyaan, dan satu kolom keinginan bebas (opsional).

Web App dengan akses **Anyone** dapat menerima kiriman dari siapa pun yang memperoleh URL-nya. Jangan membagikan URL Web App atau spreadsheet secara publik. Karena browser mengirimkan permintaan lintas domain tanpa membaca balasan Google, halaman meminta kamu memeriksa spreadsheet untuk memastikan barisnya sudah tercatat.

## Menampilkan semua jawaban di halaman hadiah

Deployment Apps Script juga menyediakan endpoint baca untuk menampilkan kiriman dari tab **Jawaban Harapan** dan **Jawaban Harapan (Lengkap)** pada halaman hadiah. Setelah memperbarui kode dan deployment, semua jawaban di kedua tab tersebut dapat dibaca oleh siapa pun yang membuka situs publik atau mengetahui URL Web App. Jangan gunakan fitur ini untuk jawaban yang ingin dijaga tetap pribadi.
