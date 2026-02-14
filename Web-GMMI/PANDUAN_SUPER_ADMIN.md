# Panduan Super Admin - Menampilkan Konten di Halaman Utama

## 🎯 Tujuan
Panduan ini menjelaskan cara menampilkan konten (Agenda, Warta, Program & Kegiatan) di halaman utama website GMMI.

---

## 📋 Langkah-Langkah

### 1️⃣ MENAMBAHKAN WARTA

**Langkah:**
1. Login ke Dashboard Super Admin
2. Klik menu **"Warta"**
3. Klik tombol **"Tambah Warta Baru"**
4. Isi form:
   - Judul Warta
   - Tanggal Ibadah
   - Tempat Jemaat
   - Tema Khotbah
   - Ayat Firman
   - Hari
5. Pilih status: **"Draft"** (untuk review nanti) atau **"Approved"** (langsung publish)
6. Klik **"Simpan"**

**Untuk Menampilkan di Homepage:**
- Jika status masih "Draft", ubah menjadi **"Approved"**
- Warta akan otomatis muncul di halaman utama
- Menampilkan **3 warta terbaru**

---

### 2️⃣ MENAMBAHKAN PENGUMUMAN

**Langkah:**
1. Login ke Dashboard Super Admin
2. Klik menu **"Pengumuman"**
3. Klik tombol **"Tambah Pengumuman"**
4. Isi form:
   - Isi Pengumuman
   - Tanggal
5. Pilih status: **"Draft"** atau **"Publish"**
6. Klik **"Simpan"**

**Untuk Menampilkan di Homepage:**
- Ubah status menjadi **"Publish"**
- Pengumuman akan otomatis muncul di halaman utama
- Menampilkan **5 pengumuman terbaru**

---

### 3️⃣ MENAMBAHKAN JADWAL/AGENDA

**Langkah:**
1. Login ke Dashboard Super Admin
2. Klik menu **"Jadwal"** atau **"Agenda"**
3. Klik tombol **"Tambah Jadwal"**
4. Isi form:
   - Judul Kegiatan
   - Tanggal
   - Waktu
   - Lokasi
   - Penanggung Jawab
5. Pilih status: **"Draft"** atau **"Aktif"**
6. Klik **"Simpan"**

**Untuk Menampilkan di Homepage:**
- Ubah status menjadi **"Aktif"**
- Jadwal akan otomatis muncul di halaman utama
- Menampilkan **4 jadwal teratas**

---

### 4️⃣ MENAMBAHKAN PROGRAM & KEGIATAN

**Langkah:**
1. Login ke Dashboard Super Admin
2. Klik menu **"Program & Kegiatan"**
3. Klik tombol **"Tambah Program"**
4. Isi form:
   - Bidang (Pewartaan/Persekutuan/Pelayanan/Penatalayanan)
   - Sub Bidang (jika Penatalayanan)
   - Nama Program
   - Jenis Kegiatan
   - Volume
   - Waktu Pelaksanaan
   - Rencana Biaya
   - Keterangan
5. Klik **"Simpan"**

**Untuk Menampilkan di Homepage:**
- Program otomatis aktif setelah disimpan
- Program akan langsung muncul di halaman utama
- Menampilkan **6 program teratas**

---

## ⚙️ Mengubah Status Konten

### Warta
```
Draft → Approved ✅ (Tampil di Homepage)
Draft → Rejected ❌ (Tidak tampil)
```

### Pengumuman
```
Draft → Publish ✅ (Tampil di Homepage)
```

### Jadwal
```
Draft → Aktif ✅ (Tampil di Homepage)
```

### Program
```
(Langsung Aktif) ✅ (Tampil di Homepage)
```

---

## 🔄 Cara Mengubah Status

1. Buka halaman daftar konten (Warta/Pengumuman/Jadwal)
2. Cari konten yang ingin diubah statusnya
3. Klik tombol **"Edit"** atau **"Ubah Status"**
4. Pilih status baru:
   - **Warta:** Approved
   - **Pengumuman:** Publish
   - **Jadwal:** Aktif
5. Klik **"Simpan"**
6. Refresh halaman utama website untuk melihat perubahan

---

## 📊 Prioritas Tampilan

### Warta
- Urutkan berdasarkan: **Tanggal Ibadah** (terbaru)
- Tampilkan: **3 warta terbaru**

### Pengumuman
- Urutkan berdasarkan: **Tanggal** (terbaru)
- Tampilkan: **5 pengumuman terbaru**

### Jadwal
- Urutkan berdasarkan: **Tanggal & Waktu** (terbaru)
- Tampilkan: **4 jadwal teratas**

### Program
- Urutkan berdasarkan: **Tanggal Input** (terbaru)
- Tampilkan: **6 program teratas**

---

## ✅ Checklist Sebelum Publish

### Warta
- [ ] Judul sudah benar
- [ ] Tanggal ibadah sudah sesuai
- [ ] Tempat jemaat sudah benar
- [ ] Tema khotbah sudah lengkap
- [ ] Status diubah menjadi **"Approved"**

### Pengumuman
- [ ] Isi pengumuman jelas dan lengkap
- [ ] Tanggal sudah sesuai
- [ ] Status diubah menjadi **"Publish"**

### Jadwal
- [ ] Judul kegiatan jelas
- [ ] Tanggal dan waktu sudah benar
- [ ] Lokasi sudah dicantumkan
- [ ] Penanggung jawab sudah ditentukan
- [ ] Status diubah menjadi **"Aktif"**

### Program
- [ ] Bidang sudah dipilih
- [ ] Nama program jelas
- [ ] Jenis kegiatan sudah dijelaskan
- [ ] Waktu pelaksanaan sudah ditentukan
- [ ] Rencana biaya sudah diisi (jika ada)

---

## 🚨 Troubleshooting

### Konten tidak muncul di homepage?

**Solusi:**
1. ✅ Pastikan status sudah diubah menjadi:
   - Warta: **Approved**
   - Pengumuman: **Publish**
   - Jadwal: **Aktif**
2. ✅ Refresh halaman utama website (tekan F5 atau Ctrl+R)
3. ✅ Tunggu beberapa detik untuk loading data
4. ✅ Cek apakah ada konten lain yang lebih baru (prioritas tampilan)

### Data lama masih muncul?

**Solusi:**
1. Clear cache browser (Ctrl+Shift+Delete)
2. Refresh halaman (F5)
3. Coba buka di mode incognito/private

### Error saat menyimpan?

**Solusi:**
1. Pastikan semua field wajib sudah diisi
2. Cek koneksi internet
3. Coba logout dan login kembali
4. Hubungi tim IT jika masalah berlanjut

---

## 📞 Bantuan

Jika mengalami kesulitan, silakan hubungi:
- **Tim IT GMMI**
- **Administrator Website**

---

## 📝 Catatan Penting

1. **Hanya konten dengan status yang sesuai** yang akan ditampilkan di homepage
2. **Konten terbaru** akan muncul di posisi teratas
3. **Jumlah tampilan terbatas** untuk menjaga kerapihan halaman
4. **Gunakan status "Draft"** untuk review sebelum publish
5. **Pastikan data sudah benar** sebelum mengubah status menjadi publish/approved/aktif

---

## 🎨 Tampilan di Homepage

### Desktop
- Warta: Card dengan border dan hover effect
- Pengumuman: Grid 2 kolom dengan background navy
- Jadwal: Timeline vertical dengan dekorasi emas
- Program: Grid 3 kolom dengan card modern

### Mobile
- Semua section stack vertical (1 kolom)
- Responsive dan mobile-friendly
- Touch-friendly buttons dan cards

---

**Terakhir diperbarui:** 9 Februari 2026
**Versi:** 1.0
