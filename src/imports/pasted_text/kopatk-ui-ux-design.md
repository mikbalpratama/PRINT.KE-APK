Buat desain UI/UX aplikasi web bernama "KOPATK", yaitu sistem informasi koperasi ATK kampus yang menyediakan layanan pemesanan jasa print, fotocopy, jilid, serta penjualan produk ATK.

Aplikasi memiliki 2 role utama:
1. User/Mahasiswa
2. Admin/Pegawai Koperasi

Gunakan desain modern, clean, profesional, sederhana, dan cocok untuk lingkungan kampus. Gunakan layout responsive untuk desktop dan mobile. Gunakan warna utama biru tua/navy dan biru sebagai primary color, dengan warna putih dan abu-abu muda sebagai background. Gunakan aksen hijau untuk status berhasil/selesai, kuning untuk pending, merah untuk dibatalkan. Gunakan font modern seperti Inter atau Poppins. Gunakan rounded corner yang halus, card dengan shadow ringan, icon sederhana, dan spacing yang rapi.

==================================================
A. USER / MAHASISWA
==================================================

Buat halaman dan flow berikut:

1. LANDING PAGE
- Logo "KOPATK"
- Nama aplikasi: "Koperasi ATK Kampus"
- Deskripsi singkat: "Pesan kebutuhan ATK dan layanan print kampus dengan mudah."
- Tombol "Login"
- Tombol "Daftar"
- Preview layanan utama:
  - Print
  - Fotocopy
  - Jilid
  - Scan
- Preview produk ATK
- Section keunggulan:
  - Pesan dari mana saja
  - Upload dokumen dengan mudah
  - Status pesanan realtime
  - Pembayaran fleksibel

2. LOGIN
- Email
- Password
- Checkbox "Ingat saya"
- Tombol "Login"
- Link "Lupa password?"
- Link "Belum punya akun? Daftar"
- Logo KOPATK
- Tampilan sederhana dan profesional

3. REGISTER
- Nama lengkap
- NIM
- Email
- Nomor HP
- Password
- Konfirmasi password
- Tombol "Daftar"
- Link kembali ke Login

4. USER DASHBOARD / HOME
Setelah login, tampilkan:
- Navbar dengan logo KOPATK
- Search bar
- Icon notifikasi
- Profile user
- Greeting seperti "Halo, Andi!"
- Banner promosi
- Quick action:
  - Pesan Print
  - Fotocopy
  - Jilid
  - Lihat ATK
- Section "Layanan Terpopuler"
- Section "Produk ATK"
- Section "Pesanan Terakhir"

5. HALAMAN LAYANAN
Tampilkan daftar layanan dalam bentuk card:
- Print
- Fotocopy
- Jilid
- Scan
- Laminasi

Setiap card menampilkan:
- Icon/gambar
- Nama layanan
- Deskripsi singkat
- Harga mulai dari
- Tombol "Pesan"

6. DETAIL LAYANAN PRINT
Buat form pemesanan print dengan:
- Upload file/dokumen
- Drag & drop upload area
- Nama file yang telah diupload
- Tombol hapus file
- Pilihan ukuran kertas:
  - A4
  - A5
  - F4
- Pilihan warna:
  - Hitam Putih
  - Warna
- Pilihan sisi:
  - Satu sisi
  - Dua sisi
- Jumlah halaman
- Jumlah copy
- Catatan tambahan
- Estimasi harga otomatis
- Tombol "Lanjutkan"

7. DETAIL LAYANAN FOTOCOPY
Form:
- Upload dokumen jika diperlukan
- Jumlah halaman
- Jumlah copy
- Ukuran kertas
- Pilihan warna
- Catatan
- Estimasi harga
- Tombol "Lanjutkan"

8. DETAIL LAYANAN JILID
Form:
- Upload file
- Jenis jilid:
  - Spiral
  - Lakban
  - Hardcover
- Ukuran
- Warna cover
- Jumlah copy
- Catatan
- Estimasi harga
- Tombol "Lanjutkan"

9. KATALOG PRODUK ATK
Tampilkan produk dalam grid card:
- Foto produk
- Nama produk
- Kategori
- Harga
- Stok
- Tombol "Tambah ke Keranjang"

Kategori:
- Pulpen
- Pensil
- Buku
- Kertas
- Map
- Penghapus
- Perlengkapan lainnya

Tambahkan:
- Search
- Filter kategori
- Sorting harga
- Indikator stok

10. DETAIL PRODUK
Tampilkan:
- Foto produk besar
- Nama produk
- Harga
- Stok tersedia
- Deskripsi
- Pilihan jumlah
- Tombol "Tambah ke Keranjang"
- Tombol "Beli Sekarang"

11. KERANJANG
Tampilkan:
- Daftar produk
- Foto produk
- Nama produk
- Harga
- Quantity
- Subtotal
- Tombol hapus
- Ringkasan total

Keranjang dapat berisi produk ATK DAN layanan print/fotocopy/jilid.

Tampilkan:
- Subtotal
- Biaya layanan jika ada
- Total pembayaran
- Tombol "Checkout"

12. CHECKOUT
Tampilkan:
- Informasi user
- Detail produk
- Detail layanan
- File yang diupload
- Total pembayaran

Pilihan metode pembayaran:
- Bayar Online
- Bayar di Koperasi

Jika memilih Bayar di Koperasi, tampilkan informasi:
"Pembayaran dilakukan saat mengambil pesanan di koperasi."

Jika memilih pembayaran online, tampilkan tampilan pembayaran sederhana/mock payment.

Tombol:
"Konfirmasi Pesanan"

13. PESANAN BERHASIL
Tampilkan:
- Icon success
- "Pesanan berhasil dibuat!"
- Nomor pesanan
- Total pembayaran
- Metode pembayaran
- Estimasi pesanan selesai
- Tombol "Lihat Detail Pesanan"
- Tombol "Kembali ke Beranda"

14. DETAIL PESANAN
Tampilkan:
- Nomor pesanan
- Tanggal
- Daftar produk
- Daftar layanan
- File yang dikirim
- Total harga
- Metode pembayaran
- Status pembayaran
- Status pesanan

Gunakan timeline status:

Pesanan Dibuat
↓
Dikonfirmasi
↓
Sedang Diproses
↓
Siap Diambil
↓
Selesai

Gunakan warna berbeda untuk setiap status.

15. RIWAYAT PESANAN
Tampilkan daftar semua pesanan user.
Filter:
- Semua
- Pending
- Diproses
- Siap Diambil
- Selesai
- Dibatalkan

Setiap card menampilkan:
- Nomor pesanan
- Tanggal
- Ringkasan pesanan
- Total
- Status
- Tombol "Detail"

16. PROFILE USER
Tampilkan:
- Foto profile
- Nama
- NIM
- Email
- Nomor HP
- Edit profile
- Ubah password
- Logout


==================================================
B. ADMIN / PEGAWAI KOPERASI
==================================================

Buat dashboard admin dengan layout sidebar di sebelah kiri dan content area di sebelah kanan.

Sidebar:
- Dashboard
- Pesanan
- Produk
- Kategori
- Layanan
- Stok
- Pelanggan
- Pembayaran
- Laporan
- Pengaturan
- Logout

17. ADMIN DASHBOARD
Tampilkan statistik dalam card:
- Total Pesanan Hari Ini
- Pesanan Pending
- Pesanan Sedang Diproses
- Pesanan Siap Diambil
- Pendapatan Hari Ini
- Total Produk

Tambahkan:
- Grafik penjualan
- Grafik jumlah pesanan
- Pesanan terbaru
- Produk dengan stok hampir habis

18. ADMIN PESANAN
Tampilkan tabel pesanan:
- ID Pesanan
- Customer
- Jenis Pesanan
- Total
- Pembayaran
- Status
- Tanggal
- Action

Filter:
- Status
- Tanggal
- Jenis layanan
- Metode pembayaran

Action:
- Lihat detail
- Download file
- Ubah status
- Batalkan pesanan

19. DETAIL PESANAN ADMIN
Tampilkan:
- Informasi customer
- Detail produk
- Detail layanan
- File yang diupload
- Spesifikasi print/fotocopy/jilid
- Total harga
- Metode pembayaran
- Status pembayaran
- Status pesanan

Admin dapat mengubah status:
- Pending
- Dikonfirmasi
- Diproses
- Siap Diambil
- Selesai
- Dibatalkan

20. MANAJEMEN PRODUK
Buat halaman CRUD produk.
Tampilkan tabel:
- Foto
- Nama produk
- Kategori
- Harga
- Stok
- Status
- Action

Tombol:
"+ Tambah Produk"

Form produk:
- Nama produk
- Kategori
- Harga
- Stok
- Deskripsi
- Upload foto
- Status aktif/nonaktif

21. MANAJEMEN KATEGORI
CRUD kategori produk:
- Nama kategori
- Jumlah produk
- Status
- Action

22. MANAJEMEN LAYANAN
CRUD layanan:
- Nama layanan
- Deskripsi
- Harga
- Unit harga
- Status
- Action

Contoh:
Print Hitam Putih - Rp500/lembar
Print Warna - Rp1.500/lembar
Fotocopy - Rp300/lembar
Jilid Spiral - Rp5.000
Laminasi - Rp3.000

23. MANAJEMEN STOK
Tampilkan:
- Nama produk
- Stok saat ini
- Stok minimum
- Status stok
- Update stok

Gunakan indikator:
- Hijau = stok aman
- Kuning = stok menipis
- Merah = stok habis

Tambahkan riwayat perubahan stok.

24. PELANGGAN
Tampilkan:
- Nama
- NIM
- Email
- Nomor HP
- Jumlah pesanan
- Total transaksi
- Status akun

25. PEMBAYARAN
Tampilkan:
- ID pembayaran
- ID pesanan
- Customer
- Metode pembayaran
- Jumlah
- Status
- Tanggal

26. LAPORAN
Buat dashboard laporan dengan:
- Total pendapatan
- Total pesanan
- Produk terlaris
- Layanan terlaris
- Grafik pendapatan
- Grafik transaksi

Berikan filter:
- Hari ini
- Minggu ini
- Bulan ini
- Custom tanggal

Sediakan tombol:
"Export Laporan"


==================================================
C. KOMPONEN UI
==================================================

Buat design system yang konsisten:
- Primary button
- Secondary button
- Danger button
- Input field
- Search field
- Dropdown
- Checkbox
- Radio button
- Modal
- Toast notification
- Badge status
- Product card
- Service card
- Order card
- Table
- Pagination
- Sidebar
- Navbar
- Breadcrumb
- Empty state
- Loading state
- Error state
- Success state

Gunakan icon yang sederhana dan mudah dipahami.

==================================================
D. USER EXPERIENCE
==================================================

Pastikan seluruh halaman memiliki navigasi yang jelas dan konsisten.

Prioritaskan:
- Kemudahan penggunaan
- Tampilan bersih
- Informasi tidak terlalu padat
- CTA/button mudah ditemukan
- Form sederhana
- Status pesanan mudah dipahami
- Upload file mudah digunakan
- Responsive pada desktop, tablet, dan mobile

Buat prototype flow yang saling terhubung:

Landing Page
→ Login/Register
→ User Dashboard
→ Pilih Layanan
→ Upload File
→ Atur Spesifikasi
→ Keranjang
→ Checkout
→ Pembayaran
→ Pesanan Berhasil
→ Detail Pesanan
→ Tracking Status

Dan flow produk:

Dashboard
→ Katalog ATK
→ Detail Produk
→ Keranjang
→ Checkout
→ Pesanan Berhasil

Admin flow:

Login Admin
→ Dashboard
→ Pesanan
→ Detail Pesanan
→ Download File
→ Update Status

serta:

Dashboard Admin
→ Produk
→ Tambah/Edit Produk
→ Stok

Gunakan Bahasa Indonesia pada seluruh interface.

Buat desain high-fidelity yang siap digunakan sebagai acuan implementasi aplikasi web.