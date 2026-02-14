# Dokumentasi: Menampilkan Data Super Admin di Halaman Utama

## Ringkasan
Sistem telah dikonfigurasi untuk menampilkan data yang diinput oleh Super Admin (Agenda, Warta, Program & Kegiatan) di halaman utama website GMMI. Data yang ditampilkan adalah data yang sudah **disetujui/dipublikasikan** oleh Super Admin.

---

## 1. WARTA (Berita Gereja)

### Backend
**File:** `backend/src/controllers/warta.controllers.js`
**Endpoint:** `GET /api/warta`

```javascript
// Hanya menampilkan warta dengan status 'approved'
const result = await pool.query(
    `SELECT id, judul, tanggal_ibadah, tempat_jemaat, tema_khotbah, ayat_firman, hari, status, created_at, updated_at
     FROM pewartaan 
     WHERE status = 'approved'
     ORDER BY tanggal_ibadah DESC, created_at DESC 
     LIMIT $1 OFFSET $2`,
    [limit, offset]
);
```

### Frontend
**File:** `gmmi-frontend/src/Home.tsx` (baris 447-518)

**Service:** `gmmi-frontend/src/services/dashboard.services.ts`
```typescript
export async function getWarta() {
  const res = await api.get('/api/warta');
  return res.data;
}
```

**Tampilan:**
- Menampilkan 3 warta terbaru
- Menampilkan: Judul, Tanggal Ibadah, Tempat Jemaat, Tema Khotbah
- Link "Lihat Semua" untuk melihat semua warta

---

## 2. PENGUMUMAN

### Backend
**File:** `backend/src/controllers/pengumuman.controllers.js`
**Endpoint:** `GET /api/announcements`

```javascript
// Hanya menampilkan pengumuman dengan status 'publish'
const result = await pool.query(
    "SELECT * FROM announcements WHERE status = 'publish' ORDER BY tanggal DESC, created_at DESC"
);
```

### Frontend
**File:** `gmmi-frontend/src/Home.tsx` (baris 522-576)

**Service:** `gmmi-frontend/src/services/dashboard.services.ts`
```typescript
export async function getPengumuman() {
  const res = await api.get('/api/announcements');
  return res.data;
}
```

**Tampilan:**
- Menampilkan 5 pengumuman terbaru
- Menampilkan: Isi pengumuman dan tanggal
- Desain card dengan background navy dan efek glassmorphism

---

## 3. JADWAL / AGENDA

### Backend
**File:** `backend/src/controllers/ibadah.controllers.js`
**Endpoint:** `GET /api/jadwal`

```javascript
// Hanya menampilkan jadwal dengan status 'aktif'
const result = await pool.query(
    "SELECT * FROM jadwal_pelayanan WHERE status = 'aktif' ORDER BY tanggal DESC, waktu DESC"
);
```

### Frontend
**File:** `gmmi-frontend/src/Home.tsx` (baris 580-638)

**Service:** `gmmi-frontend/src/services/dashboard.services.ts`
```typescript
export async function getJadwal() {
  const res = await api.get('/api/jadwal');
  return res.data;
}
```

**Tampilan:**
- Menampilkan 4 jadwal teratas
- Menampilkan: Judul kegiatan dan waktu
- Desain timeline dengan efek modern
- Card dengan background navy dan dekorasi emas

---

## 4. PROGRAM & KEGIATAN

### Backend
**File:** `backend/src/controllers/program.controller.js`
**Endpoint:** `GET /api/programs`

```javascript
// Menampilkan semua program yang aktif
const result = await pool.query(query, params);
return res.status(200).json(result.rows);
```

### Frontend
**File:** `gmmi-frontend/src/Home.tsx` (baris 697-775)

**Service:** `gmmi-frontend/src/services/program.service.ts`
```typescript
export const getPrograms = async (params?: { bidang?: string; startDate?: string; endDate?: string }) => {
    const response = await api.get('/api/programs', { params });
    return response.data;
};
```

**Tampilan:**
- Menampilkan 6 program teratas
- Menampilkan: Bidang, Nama Program, Jenis Kegiatan, Waktu Pelaksanaan, Rencana Biaya
- Grid layout 3 kolom (responsive)
- Card dengan hover effect dan border emas

---

## Alur Kerja Super Admin

### 1. Input Data
Super Admin mengakses dashboard dan menginput data:
- **Warta:** Form input warta dengan status (draft/approved)
- **Pengumuman:** Form input pengumuman dengan status (draft/publish)
- **Jadwal:** Form input jadwal dengan status (draft/aktif)
- **Program:** Form input program & kegiatan

### 2. Approval/Publish
Super Admin mengubah status data:
- **Warta:** `draft` → `approved`
- **Pengumuman:** `draft` → `publish`
- **Jadwal:** `draft` → `aktif`
- **Program:** Langsung aktif setelah dibuat

### 3. Tampil di Homepage
Setelah status diubah menjadi approved/publish/aktif, data otomatis muncul di halaman utama website.

---

## Struktur Database

### Tabel: `pewartaan` (untuk Warta)
```sql
- id
- judul
- tanggal_ibadah
- tempat_jemaat
- tema_khotbah
- ayat_firman
- hari
- status (draft/approved/rejected)
- created_at
- updated_at
```

### Tabel: `announcements` (untuk Pengumuman)
```sql
- id
- isi
- tanggal
- status (draft/publish)
- created_at
- updated_at
```

### Tabel: `jadwal_pelayanan` (untuk Jadwal/Agenda)
```sql
- id
- judul
- tanggal
- waktu
- lokasi
- penanggung_jawab
- status (draft/aktif)
- created_at
- updated_at
```

### Tabel: `program_kegiatan_gereja` (untuk Program)
```sql
- id
- bidang
- sub_bidang
- nama_program
- jenis_kegiatan
- volume
- waktu_pelaksanaan
- rencana_biaya
- keterangan
- created_at
```

---

## Cara Menggunakan

### Untuk Super Admin:

1. **Login** ke dashboard super admin
2. **Pilih menu** yang ingin diinput (Warta/Pengumuman/Jadwal/Program)
3. **Isi form** dengan data yang diperlukan
4. **Simpan** sebagai draft terlebih dahulu
5. **Review** data yang sudah diinput
6. **Ubah status** menjadi approved/publish/aktif
7. **Data otomatis muncul** di halaman utama website

### Untuk Pengunjung Website:

1. **Buka** halaman utama website GMMI
2. **Scroll** ke bawah untuk melihat:
   - **Warta Terkini** (3 warta terbaru)
   - **Pengumuman** (5 pengumuman terbaru)
   - **Jadwal Ibadah & Kegiatan** (4 jadwal teratas)
   - **Program Kerja Gereja** (6 program teratas)
3. **Klik "Lihat Semua"** untuk melihat data lengkap (jika tersedia)

---

## Fitur Tambahan

### Auto-refresh
Data di halaman utama akan otomatis ter-update setiap kali halaman di-refresh atau dibuka ulang.

### Responsive Design
Semua section menggunakan desain responsive yang menyesuaikan dengan ukuran layar:
- **Desktop:** Grid 3 kolom untuk program, 2 kolom untuk pengumuman
- **Tablet:** Grid 2 kolom
- **Mobile:** Grid 1 kolom (stack vertical)

### Loading State
Setiap section memiliki skeleton loading untuk memberikan feedback visual saat data sedang dimuat.

### Empty State
Jika tidak ada data, akan ditampilkan pesan yang informatif dengan icon yang sesuai.

---

## Troubleshooting

### Data tidak muncul di homepage?
1. Pastikan status data sudah diubah menjadi approved/publish/aktif
2. Cek koneksi backend (pastikan server berjalan di port 3000)
3. Cek console browser untuk error
4. Refresh halaman

### Error saat fetch data?
1. Pastikan backend server berjalan
2. Cek CORS configuration di backend
3. Cek network tab di browser developer tools
4. Pastikan endpoint API sudah benar

---

## Update Terbaru

### Perubahan yang Dilakukan:
1. ✅ **Pengumuman Controller** - Ditambahkan filter `status = 'publish'`
2. ✅ **Jadwal Controller** - Ditambahkan filter `status = 'aktif'`
3. ✅ **Warta Controller** - Sudah memiliki filter `status = 'approved'`
4. ✅ **Program Controller** - Menampilkan semua program aktif

Sekarang semua data yang ditampilkan di halaman utama adalah data yang sudah **disetujui/dipublikasikan** oleh Super Admin.

---

## Kontak Developer
Jika ada pertanyaan atau masalah, silakan hubungi tim developer GMMI.
