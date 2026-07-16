# JUALIN — PRODUCT.md

## Product Overview

Jualin adalah platform katalog jualan berbasis langganan yang mempertemukan penjual dan pembeli tanpa menjadi perantara transaksi.

Platform ini memungkinkan siapa saja mempublikasikan produk atau jasa mereka agar mudah ditemukan oleh calon pembeli.

Jualin bukan platform checkout dan bukan e-commerce tradisional.

Fokus utama Jualin adalah membantu seller memperoleh eksposur secara cepat dan mudah.

---

# Problem Statement

Saat ini banyak penjual memasarkan produk melalui:

- WhatsApp Group
- Telegram Group
- Facebook Group
- Komunitas kantor
- Komunitas perumahan

Masalah yang muncul:

- Chat cepat tenggelam.
- Produk sulit dicari kembali.
- Tidak ada katalog.
- Tidak ada pencarian.
- Tidak ada filter.
- Tidak ada profil usaha.
- Pembeli harus scroll ribuan chat.
- Penjual harus spam ulang produk setiap hari.

---

# Solution

Jualin menyediakan satu tempat bagi seluruh seller untuk mempublikasikan listing mereka.

Buyer cukup membuka Jualin untuk:

- mencari produk
- mencari jasa
- mencari seller
- melihat detail usaha
- langsung menghubungi seller

Tidak perlu mencari kembali di WhatsApp Group.

---

# Core Value

## Untuk Seller

- Tidak perlu membuat website.
- Tidak perlu mengelola hosting.
- Produk mudah ditemukan.
- Memiliki halaman store sendiri.
- Listing dapat diperpanjang kapan saja.
- Semua data tetap aman walaupun masa aktif habis.

---

## Untuk Buyer

- Mudah mencari produk.
- Mudah membandingkan seller.
- Informasi lebih lengkap.
- Langsung menghubungi seller.
- Tidak perlu mencari posting lama di grup.

---

# Business Model

Pendapatan utama berasal dari Publishing License.

Seller membeli masa publikasi listing.

Selama Publishing License aktif:

- Listing tampil di marketplace.
- Listing muncul pada pencarian.
- Listing dapat dibagikan menggunakan URL publik.

Ketika Publishing License berakhir:

- Store tetap ada.
- Akun tetap aktif.
- Dashboard tetap dapat digunakan.
- Listing tetap tersimpan.
- Listing tidak lagi tampil ke publik.

---

# Product Scope

Platform hanya menyediakan:

- publikasi listing
- pencarian
- katalog
- profil store
- komunikasi antara buyer dan seller

Platform tidak menangani:

- pembayaran buyer
- pengiriman barang
- ongkos kirim
- retur
- komplain transaksi

Seluruh transaksi dilakukan langsung antara buyer dan seller.

---

# Primary Domain

Domain utama aplikasi adalah **Store**.

Hubungan antar domain:

User

↓

Store

↓

Listing

↓

Publishing License

Store merupakan aset utama seller.

Listing merupakan konten yang dipublikasikan oleh Store.

Publishing License menentukan apakah Listing dapat dilihat oleh publik.

---

# Listing

Listing adalah segala sesuatu yang dipublikasikan oleh seller.

Jenis Listing pada MVP:

- Product
- Service

Roadmap berikutnya:

- Rental
- Pre Order
- Digital Product
- Event
- Voucher

Karena itu seluruh sistem menggunakan istilah Listing, bukan Product.

---

# Store

Setiap seller memiliki minimal satu Store.

Store memiliki:

- nama
- logo
- banner
- deskripsi
- alamat
- kota
- WhatsApp
- Instagram
- Facebook
- TikTok
- jam operasional

Roadmap jangka panjang memungkinkan satu User memiliki lebih dari satu Store.

Karena itu relasi User → Store dibuat one-to-many sejak awal.

---

# Publishing License

Publishing License adalah hak untuk mempublikasikan Listing.

Masa aktif ditentukan oleh paket yang dibeli.

Contoh paket MVP:

3 Hari

Rp5.000

7 Hari

Rp10.000

30 Hari

Rp25.000

Setelah masa aktif habis:

Store tetap aktif.

Listing tetap tersimpan.

Visibilitas publik dinonaktifkan.

---

# User Roles

Guest

Dapat melihat marketplace.

Tidak dapat membuat Store.

Seller

Dapat membuat Store.

Dapat membuat Listing.

Dapat membeli Publishing License.

Admin

Mengelola seluruh sistem.

Melakukan approval pembayaran.

Mengelola Store.

Mengelola Listing.

Mengelola Subscription.

---

# Future Roadmap

Tahap 1

Marketplace Catalog

↓

Tahap 2

Marketplace Checkout

↓

Tahap 3

Escrow Marketplace

↓

Tahap 4

Payment Gateway

Arsitektur aplikasi harus mendukung seluruh roadmap tersebut tanpa perlu melakukan redesign besar.

---

# Product Principles

- Simplicity over Complexity.
- Fast First Load.
- Mobile First.
- Search First.
- Store Centric.
- Listing Based.
- Subscription Driven.
- Future Transaction Ready.
- AI Friendly Architecture.

---

# Out of Scope (MVP)

- Shopping Cart
- Checkout
- Kurir
- Ongkir
- Voucher
- Affiliate
- Multi Vendor Settlement
- Escrow
- Wallet
- Live Chat
- Review
- Rating
- Loyalty Program

Semua fitur di atas akan dipertimbangkan setelah MVP tervalidasi dan memiliki traction.
