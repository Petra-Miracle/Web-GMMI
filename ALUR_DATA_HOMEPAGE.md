# Alur Data dari Super Admin ke Homepage

```
┌─────────────────────────────────────────────────────────────────────┐
│                         SUPER ADMIN DASHBOARD                        │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                                    │ Input Data
                                    ▼
        ┌───────────────────────────────────────────────────┐
        │                                                   │
        │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐
        │  │  WARTA   │  │PENGUMUMAN│  │  JADWAL  │  │ PROGRAM  │
        │  └──────────┘  └──────────┘  └──────────┘  └──────────┘
        │       │              │              │              │
        │       │              │              │              │
        │  Status:        Status:        Status:        Status:
        │  draft          draft          draft          (langsung
        │  approved       publish        aktif          aktif)
        │  rejected
        │                                                   │
        └───────────────────────────────────────────────────┘
                                    │
                                    │ Simpan ke Database
                                    ▼
        ┌───────────────────────────────────────────────────┐
        │                   DATABASE (PostgreSQL)            │
        │                                                   │
        │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
        │  │  pewartaan   │  │ announcements│  │jadwal_pelayan│
        │  │              │  │              │  │              │
        │  │ status:      │  │ status:      │  │ status:      │
        │  │ 'approved'   │  │ 'publish'    │  │ 'aktif'      │
        │  └──────────────┘  └──────────────┘  └──────────────┘
        │                                                   
        │  ┌──────────────────────────────────────────────┐
        │  │     program_kegiatan_gereja                  │
        │  │     (semua program aktif)                    │
        │  └──────────────────────────────────────────────┘
        │                                                   │
        └───────────────────────────────────────────────────┘
                                    │
                                    │ API Request
                                    ▼
        ┌───────────────────────────────────────────────────┐
        │                  BACKEND API (Express.js)          │
        │                                                   │
        │  GET /api/warta           → WartaController       │
        │  GET /api/announcements   → PengumumanController  │
        │  GET /api/jadwal          → JadwalController      │
        │  GET /api/programs        → ProgramController     │
        │                                                   │
        │  Filter: WHERE status = 'approved/publish/aktif'  │
        └───────────────────────────────────────────────────┘
                                    │
                                    │ JSON Response
                                    ▼
        ┌───────────────────────────────────────────────────┐
        │              FRONTEND (React + TypeScript)         │
        │                                                   │
        │  Services:                                        │
        │  - dashboard.services.ts (warta, pengumuman, jadwal)
        │  - program.service.ts (program & kegiatan)        │
        │                                                   │
        │  Component: Home.tsx                              │
        └───────────────────────────────────────────────────┘
                                    │
                                    │ Render UI
                                    ▼
        ┌───────────────────────────────────────────────────┐
        │                  HALAMAN UTAMA WEBSITE             │
        │                                                   │
        │  ┌─────────────────────────────────────────────┐  │
        │  │         HERO CAROUSEL (Slide Show)          │  │
        │  └─────────────────────────────────────────────┘  │
        │                                                   │
        │  ┌─────────────────────────────────────────────┐  │
        │  │         SEJARAH GEREJA                      │  │
        │  └─────────────────────────────────────────────┘  │
        │                                                   │
        │  ┌──────────────────────┐  ┌──────────────────┐  │
        │  │  WARTA TERKINI       │  │ JADWAL IBADAH &  │  │
        │  │  (3 terbaru)         │  │ KEGIATAN         │  │
        │  │                      │  │ (4 teratas)      │  │
        │  │  - Judul             │  │                  │  │
        │  │  - Tanggal Ibadah    │  │ - Judul          │  │
        │  │  - Tempat Jemaat     │  │ - Waktu          │  │
        │  │  - Tema Khotbah      │  │                  │  │
        │  └──────────────────────┘  │                  │  │
        │                            │ DUKUNGAN DOA     │  │
        │  ┌──────────────────────┐  │ (Prayer Support) │  │
        │  │  PENGUMUMAN          │  │                  │  │
        │  │  (5 terbaru)         │  │                  │  │
        │  │                      │  │                  │  │
        │  │  - Isi               │  │                  │  │
        │  │  - Tanggal           │  │                  │  │
        │  └──────────────────────┘  └──────────────────┘  │
        │                                                   │
        │  ┌─────────────────────────────────────────────┐  │
        │  │      PROGRAM & KEGIATAN GEREJA              │  │
        │  │      (6 program teratas)                    │  │
        │  │                                             │  │
        │  │  Grid 3 kolom:                              │  │
        │  │  - Bidang                                   │  │
        │  │  - Nama Program                             │  │
        │  │  - Jenis Kegiatan                           │  │
        │  │  - Waktu Pelaksanaan                        │  │
        │  │  - Rencana Biaya                            │  │
        │  └─────────────────────────────────────────────┘  │
        │                                                   │
        │  ┌─────────────────────────────────────────────┐  │
        │  │         FAQ / INFORMASI PENTING             │  │
        │  └─────────────────────────────────────────────┘  │
        │                                                   │
        │  ┌─────────────────────────────────────────────┐  │
        │  │              FOOTER                         │  │
        │  └─────────────────────────────────────────────┘  │
        └───────────────────────────────────────────────────┘
                                    │
                                    │
                                    ▼
                          PENGUNJUNG WEBSITE
```

## Keterangan:

### 1. Input Data (Super Admin)
- Super Admin login ke dashboard
- Mengisi form untuk Warta, Pengumuman, Jadwal, atau Program
- Menyimpan dengan status tertentu (draft/approved/publish/aktif)

### 2. Database Storage
- Data disimpan di PostgreSQL
- Setiap tabel memiliki kolom `status` untuk kontrol publikasi
- Hanya data dengan status tertentu yang akan ditampilkan di homepage

### 3. Backend API
- Express.js server menyediakan endpoint REST API
- Controller memfilter data berdasarkan status
- Mengembalikan data dalam format JSON

### 4. Frontend Service
- React component menggunakan service untuk fetch data
- Service memanggil API endpoint
- Data di-cache dalam state component

### 5. Homepage Rendering
- Component Home.tsx me-render semua section
- Menggunakan framer-motion untuk animasi
- Responsive design dengan @heroui/react dan Tailwind CSS
- Loading state dan empty state untuk UX yang baik

### 6. User Experience
- Pengunjung melihat data terbaru yang sudah disetujui
- Auto-refresh saat halaman dibuka
- Smooth animations dan transitions
- Mobile-friendly design

---

## Status Approval Flow:

```
WARTA:
draft → approved → Tampil di Homepage
      ↓
   rejected → Tidak tampil

PENGUMUMAN:
draft → publish → Tampil di Homepage

JADWAL:
draft → aktif → Tampil di Homepage

PROGRAM:
(langsung aktif) → Tampil di Homepage
```
