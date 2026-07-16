# JUALIN — BUSINESS_RULE.md

## Purpose

Dokumen ini mendefinisikan seluruh aturan bisnis Jualin.

Semua implementasi aplikasi wajib mengikuti aturan pada dokumen ini.

Jika terjadi perbedaan antara implementasi dan dokumen ini, maka dokumen ini menjadi acuan utama.

---

# BR-001 User Registration

Pengguna dapat membuat akun menggunakan email.

Email harus unik.

Password harus dienkripsi.

Status akun baru adalah Active.

Email verification tidak diwajibkan pada MVP.

---

# BR-002 Authentication

User harus login untuk mengakses Dashboard.

Guest hanya dapat mengakses halaman publik.

Session akan berakhir sesuai konfigurasi Better Auth.

---

## BR-003 User Roles

Platform memiliki empat jenis pengguna.

### Guest

Tidak memiliki akun.

Hak akses:

- Melihat Homepage
- Search Listing
- Melihat Detail Listing
- Melihat Detail Store

Guest **tidak dapat melakukan pembelian** , menyimpan aktivitas, atau menghubungi seller melalui fitur yang membutuhkan identitas pengguna.

---

### User (Buyer)

User adalah pembeli yang telah memiliki akun.

Hak akses:

- Login
- Mengelola profil
- Mengubah password
- Login menggunakan Google (Roadmap)
- Melihat riwayat aktivitas
- Menyimpan Listing favorit (Roadmap)
- Melakukan pembelian ketika fitur checkout tersedia
- Melihat status transaksi (Roadmap)

Semua pembeli diwajibkan memiliki akun sebelum melakukan transaksi.

---

### Seller

Seller adalah User yang memiliki minimal satu Store.

Hak akses User tetap dimiliki.

Tambahan hak akses:

- Membuat Store
- Mengelola Store
- Membuat Listing
- Mengelola Listing
- Membeli Publishing License
- Mengunggah bukti pembayaran
- Melihat statistik Store (Roadmap)

Pada MVP satu User hanya dapat memiliki satu Store.

Batas ini dapat diubah melalui konfigurasi aplikasi tanpa mengubah struktur database.

---

### Admin

Admin memiliki akses penuh terhadap seluruh sistem.

Hak akses:

- Mengelola User
- Mengelola Store
- Mengelola Listing
- Mengelola Publishing License
- Approval pembayaran
- Suspend User
- Suspend Store
- Suspend Listing

# BR-004 Store

Satu User dapat memiliki lebih dari satu Store.

Pada MVP:

maksimal satu Store.

Batas ini disimpan pada konfigurasi aplikasi sehingga dapat diubah tanpa migrasi database.

Store memiliki status:

ACTIVE

Store dapat diakses Dashboard.

Store memiliki visibilitas terpisah dari Publishing License.

Store tidak pernah otomatis dihapus.

---

# BR-005 Listing

Listing adalah konten yang dipublikasikan oleh Store.

Jenis Listing MVP:

PRODUCT

SERVICE

Listing memiliki status:

DRAFT

PUBLISHED

ARCHIVED

Listing dapat dibuat walaupun Publishing License belum aktif.

Listing DRAFT tidak tampil ke publik.

Listing ARCHIVED tidak tampil ke publik.

Listing PUBLISHED hanya tampil jika seluruh syarat publikasi terpenuhi.

---

# BR-006 Publishing License

Publishing License adalah hak untuk mempublikasikan Listing.

Store dapat memiliki beberapa riwayat Publishing License.

Hanya satu Publishing License yang boleh aktif pada satu waktu.

Status Publishing License:

PENDING_PAYMENT

WAITING_APPROVAL

ACTIVE

EXPIRED

REJECTED

CANCELLED

Listing hanya dapat tampil jika Publishing License berstatus ACTIVE.

---

# BR-007 Expired License

Ketika Publishing License berakhir:

Store tetap aktif.

Dashboard tetap dapat diakses.

Listing tetap tersimpan.

Listing tidak tampil ke publik.

URL Listing tetap valid tetapi menampilkan halaman "Listing tidak tersedia".

Seller dapat mengaktifkan kembali Listing tanpa menginput ulang data.

---

# BR-008 Public Visibility

Listing hanya dapat tampil jika seluruh kondisi berikut terpenuhi:

Store Active.

Listing Published.

Publishing License Active.

Listing tidak dihapus.

Jika salah satu kondisi gagal, Listing tidak boleh tampil pada:

Homepage

Search

Category

Store Public

API Public

Sitemap

Search Engine Feed

---

# BR-009 Payment (MVP)

Pembayaran dilakukan melalui transfer manual.

Seller memilih paket.

Seller mentransfer pembayaran.

Seller mengunggah bukti transfer.

Admin melakukan verifikasi.

Admin mengaktifkan Publishing License.

Masa aktif dihitung sejak approval Admin.

---

# BR-010 Future Payment

Versi berikutnya akan mendukung:

Virtual Account

QRIS

E-Wallet

Escrow

Payment Gateway

Arsitektur database harus mendukung penambahan metode pembayaran tanpa mengubah tabel utama.

---

# BR-011 Listing URL

Setiap Listing memiliki URL permanen.

Contoh:

/listing/kursi-gaming-ergonomis

Slug harus unik.

Jika judul berubah:

Slug lama tetap melakukan redirect permanen ke slug baru.

---

# BR-012 Store URL

Setiap Store memiliki URL permanen.

/store/namastore

Slug unik.

Tidak berubah walaupun nama Store berubah.

---

# BR-013 Soft Delete

Data utama tidak pernah dihapus secara fisik.

User

Store

Listing

Publishing License

Payment

Semua menggunakan Soft Delete.

---

# BR-014 Audit

Semua tabel utama memiliki:

createdAt

updatedAt

deletedAt

createdBy

updatedBy

---

# BR-015 Search

Search hanya mengindeks Listing yang memenuhi aturan publikasi.

Listing expired tidak boleh muncul.

Store expired tidak boleh muncul.

---

# BR-016 Communication

Jualin tidak menjadi pihak transaksi.

Buyer berkomunikasi langsung dengan Seller.

Media komunikasi MVP:

WhatsApp

Instagram

Telepon

Email (opsional)

---

# BR-017 Analytics

Sistem mencatat:

Jumlah view Listing.

Jumlah klik WhatsApp.

Jumlah klik Store.

Jumlah pencarian.

Jumlah Publishing License.

Jumlah renewal.

Data analytics tidak boleh hilang walaupun Listing sudah expired.

---

# BR-018 Admin

Admin dapat:

Melihat seluruh User.

Melihat seluruh Store.

Melihat seluruh Listing.

Menyetujui pembayaran.

Menolak pembayaran.

Suspend Store.

Suspend User.

Mengubah status Publishing License.

---

# BR-019 Security

Semua endpoint Dashboard wajib login.

Semua endpoint Admin wajib memiliki role Admin.

Semua validasi dilakukan di server.

Client validation hanya sebagai bantuan UX.

---

# BR-020 Future Escrow

Ketika Escrow diimplementasikan:

Domain Order.

Domain Payment.

Domain Settlement.

ditambahkan tanpa mengubah struktur Store, Listing, maupun Publishing License.

Arsitektur MVP wajib mendukung keputusan tersebut.

# BR-021 Authentication

MVP

Metode login:

- Email + Password

Roadmap

Metode login tambahan:

- Google OAuth

Semua metode login harus menghasilkan satu identitas User yang sama.

Apabila email Google sama dengan email yang sudah terdaftar, sistem wajib menghubungkan akun tersebut ke User yang sudah ada dan tidak membuat akun baru.

---

# BR-022 Password Recovery

User dapat melakukan reset password melalui email.

Alur:

1. User memasukkan email.
2. Sistem mengirim tautan reset password.
3. Link memiliki masa berlaku terbatas.
4. Setelah password berhasil diubah, token reset tidak dapat digunakan kembali.

---

# BR-023 User Identity

Setiap User memiliki:

- Full Name
- Email
- Password (jika menggunakan Email Login)
- Avatar (opsional)
- Status
- Last Login
- Login Provider

Login Provider mendukung lebih dari satu metode autentikasi agar siap untuk Google OAuth dan provider lain di masa depan.
