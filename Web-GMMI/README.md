# GMMI Web System

Sistem Informasi Manajemen Gereja Mase Musafir Indonesia (GMMI). Terdiri dari aplikasi Frontend (React/Vite) dan Backend (Node.js/Express).

## Struktur Project

- `gmmi-frontend/`: Aplikasi tampilan antarmuka (website & dashboard admin).
- `backend/`: API server dan manajemen database.

## Persiapan (Local Development)

### 1. Backend

1.  Masuk ke folder backend: `cd backend`
2.  Install dependencies: `npm install`
3.  Buat file `.env` (bisa copy dari `.env.example`):
    ```bash
    cp .env.example .env
    ```
    Sesuaikan isinya dengan database PostgreSQL lokal Anda.
4.  Jalankan server:
    - Development (auto-reload): `npm run dev`
    - Start biasa: `npm start`
    - Server akan berjalan di `http://localhost:3000`

### 2. Frontend

1.  Masuk ke folder frontend: `cd gmmi-frontend`
2.  Install dependencies: `npm install`
3.  Buat file `.env` (copy dari `.env.example`):
    ```bash
    cp .env.example .env
    ```
    Pastikan `VITE_API_URL` mengarah ke backend (misal: `http://localhost:3000`).
4.  Jalankan frontend:
    ```bash
    npm run dev
    ```
    - Website akan berjalan di `http://localhost:5173`

## Panduan Upload ke GitHub

1.  Pastikan file `.env` **sudah ada di `.gitignore`** (sudah disetting otomatis). Jangan pernah upload file ini karena berisi password database.
2.  Inisialisasi Git (jika belum):
    ```bash
    git init
    git add .
    git commit -m "Upload project pertama kali"
    ```
3.  Push ke Repository GitHub Anda.

## Panduan Deployment (Domainesia / cPanel)

Jika Anda menggunakan hosting seperti Domainesia (cPanel), berikut alur umumnya:

### Frontend
1.  Jalankan build di lokal:
    ```bash
    cd gmmi-frontend
    npm run build
    ```
2.  Akan muncul folder `dist`.
3.  Upload **isi** folder `dist` ke `public_html` (atau folder subdomain) di File Manager cPanel.

### Backend
1.  Pastikan hosting mendukung **Node.js**. Gunakan menu "Setup Node.js App" di cPanel.
2.  Upload seluruh folder `backend` (kecuali `node_modules` dan `.env`).
3.  Di cPanel, jalankan `npm install` dari terminal/interface Node.js.
4.  Buat database PostgreSQL/MySQL di cPanel.
5.  Buat file `.env` baru di cPanel dan masukkan konfigurasi database hosting.
6.  Start aplikasinya.

---
© 2026 GMMI Centrum
