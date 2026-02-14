-- Root Table
CREATE TABLE IF NOT EXISTS pewartaan (
    id SERIAL PRIMARY KEY,
    judul VARCHAR(255) NOT NULL,
    tanggal_ibadah DATE NOT NULL,
    hari VARCHAR(50),
    tempat_jemaat VARCHAR(255),
    ayat_firman TEXT,
    tema_khotbah TEXT,
    status VARCHAR(20) DEFAULT 'draft',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- Tata Ibadah (Repeater)
CREATE TABLE IF NOT EXISTS pewartaan_tata_ibadah (
    id SERIAL PRIMARY KEY,
    pewartaan_id INTEGER REFERENCES pewartaan(id) ON DELETE CASCADE,
    urutan INTEGER,
    nama_bagian VARCHAR(255),
    keterangan TEXT,
    judul_pujian VARCHAR(255),
    isi_konten TEXT
);
-- Pokok Doa
CREATE TABLE IF NOT EXISTS pewartaan_pokok_doa (
    id SERIAL PRIMARY KEY,
    pewartaan_id INTEGER REFERENCES pewartaan(id) ON DELETE CASCADE,
    kategori VARCHAR(255),
    keterangan TEXT
);
-- Jemaat Berulang Tahun
CREATE TABLE IF NOT EXISTS pewartaan_jemaat_ultah (
    id SERIAL PRIMARY KEY,
    pewartaan_id INTEGER REFERENCES pewartaan(id) ON DELETE CASCADE,
    tanggal DATE,
    nama_jemaat VARCHAR(255),
    keterangan TEXT
);
-- Jemaat Sakit
CREATE TABLE IF NOT EXISTS pewartaan_jemaat_sakit (
    id SERIAL PRIMARY KEY,
    pewartaan_id INTEGER REFERENCES pewartaan(id) ON DELETE CASCADE,
    nama_jemaat VARCHAR(255),
    keterangan TEXT
);
-- Pemulihan
CREATE TABLE IF NOT EXISTS pewartaan_pemulihan (
    id SERIAL PRIMARY KEY,
    pewartaan_id INTEGER REFERENCES pewartaan(id) ON DELETE CASCADE,
    nama_jemaat VARCHAR(255),
    keterangan TEXT
);
-- Lansia
CREATE TABLE IF NOT EXISTS pewartaan_lansia (
    id SERIAL PRIMARY KEY,
    pewartaan_id INTEGER REFERENCES pewartaan(id) ON DELETE CASCADE,
    nama_jemaat VARCHAR(255),
    keterangan TEXT
);
-- Informasi Ibadah
CREATE TABLE IF NOT EXISTS pewartaan_info_ibadah (
    id SERIAL PRIMARY KEY,
    pewartaan_id INTEGER REFERENCES pewartaan(id) ON DELETE CASCADE,
    tanggal DATE,
    jam VARCHAR(50),
    jenis_ibadah VARCHAR(255),
    pemimpin VARCHAR(255),
    sektor VARCHAR(100)
);
-- Pelayanan Sektor
CREATE TABLE IF NOT EXISTS pewartaan_pelayanan_sektor (
    id SERIAL PRIMARY KEY,
    pewartaan_id INTEGER REFERENCES pewartaan(id) ON DELETE CASCADE,
    nomor_sektor VARCHAR(50),
    tempat VARCHAR(255),
    pemimpin VARCHAR(255),
    liturgos VARCHAR(255)
);
-- Pelayanan Kategorial
CREATE TABLE IF NOT EXISTS pewartaan_pelayanan_kategorial (
    id SERIAL PRIMARY KEY,
    pewartaan_id INTEGER REFERENCES pewartaan(id) ON DELETE CASCADE,
    tanggal_waktu TIMESTAMP,
    kategori_pelayanan VARCHAR(255),
    tempat VARCHAR(255),
    pemimpin VARCHAR(255),
    liturgos_petugas VARCHAR(255)
);