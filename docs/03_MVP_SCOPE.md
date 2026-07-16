# JUALIN — MVP_SCOPE.md

## Purpose

Dokumen ini mendefinisikan ruang lingkup MVP (Minimum Viable Product).

Semua fitur di luar dokumen ini dianggap **Out of Scope** dan tidak boleh dikerjakan sampai MVP dinyatakan selesai.

---

# MVP Objective

Membuktikan bahwa seller bersedia membayar untuk mempublikasikan listing mereka di Jualin.

Target MVP bukan mengejar jumlah fitur.

Target MVP adalah validasi model bisnis.

---

# Success Criteria

MVP dianggap berhasil apabila:

- Seller berhasil membuat akun.
- Seller berhasil membuat Store.
- Seller berhasil membuat Listing.
- Seller berhasil membeli Publishing License.
- Admin berhasil melakukan approval pembayaran.
- Listing tampil ke publik.
- Buyer dapat menemukan Listing.
- Buyer dapat menghubungi Seller.
- Seller berhasil memperpanjang Publishing License.

---

# User Journey

## Buyer

Landing Page

↓

Search Listing

↓

Filter

↓

Detail Listing

↓

Klik Hubungi Seller

↓

WhatsApp

↓

Transaksi di luar platform

---

## Seller

Register

↓

Login

↓

Lengkapi Profil

↓

Buat Store

↓

Buat Listing

↓

Pilih Paket Publishing

↓

Upload Bukti Pembayaran

↓

Menunggu Approval

↓

Listing Published

---

## Admin

Login

↓

Review Pembayaran

↓

Approve

↓

Publishing License Active

↓

Listing otomatis tampil

---

# MVP Features

## Authentication

- Register
- Login
- Logout
- Forgot Password
- Reset Password

---

## User Profile

- Edit Nama
- Edit Avatar
- Edit Password

---

## Store

- Create Store
- Edit Store
- Logo
- Banner
- Deskripsi
- WhatsApp
- Instagram
- Facebook
- TikTok
- Alamat
- Kota
- Jam Operasional

---

## Listing

- Create Listing
- Edit Listing
- Draft
- Publish
- Archive
- Upload Multiple Images

---

## Category

- Kategori Listing
- Filter Kategori

---

## Search

- Search berdasarkan Judul
- Search berdasarkan Store
- Search berdasarkan Kategori

---

## Publishing

- Daftar Paket
- Pilih Paket
- Upload Bukti Pembayaran
- Status Approval
- Riwayat Publishing License

---

## Admin

Dashboard

User Management

Store Management

Listing Management

Publishing Management

Payment Approval

Category Management

Site Settings

---

# Homepage

Homepage hanya memiliki tujuan:

1. Menampilkan Listing terbaru.
2. Menampilkan Listing populer.
3. Menampilkan kategori.
4. Mengarahkan pengunjung menjadi Seller.

Homepage bukan landing page yang penuh animasi.

Kecepatan lebih penting daripada efek visual.

---

# Dashboard Seller

Dashboard hanya berisi:

Overview

Store

Listing

Publishing

Profile

Settings

Tidak ada analytics pada MVP.

---

# Dashboard Admin

Overview

Users

Stores

Listings

Publishing

Payments

Categories

Settings

---

# Out of Scope

Fitur berikut sengaja tidak dibuat pada MVP:

- Checkout
- Cart
- Ongkir
- Kurir
- Voucher
- Promo
- Wishlist
- Review
- Rating
- Chat Internal
- Escrow
- Wallet
- Komisi Marketplace
- Live Tracking
- Multi Store per User
- Analytics Seller
- AI Recommendation
- Push Notification
- Mobile App

---

# Technical Scope

Frontend

Next.js

Backend

Route Handlers

Database

MySQL

ORM

Prisma

Authentication

Better Auth

Image Storage

Cloudinary

Email

Resend

Deployment

Ubuntu VPS

---

# KPI MVP

Target awal:

100 Seller

1.000 Listing

500 User

5.000 Visitor

Validasi utama:

Seller bersedia membayar Publishing License.

Buyer berhasil menemukan Listing lebih mudah dibanding mencari di WhatsApp Group.

---

# Exit Criteria

MVP dinyatakan selesai apabila seluruh fitur pada dokumen ini telah memenuhi Definition of Done.

Tidak ada fitur tambahan yang boleh dimasukkan sebelum MVP selesai, kecuali perbaikan bug atau isu keamanan.
