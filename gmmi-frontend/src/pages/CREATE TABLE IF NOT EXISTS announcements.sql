CREATE TABLE IF NOT EXISTS announcements (
    id SERIAL PRIMARY KEY,
    isi TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'draft',
    tanggal DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS warta (
    id SERIAL PRIMARY KEY,
    judul VARCHAR(255) NOT NULL,
    tanggal DATE NOT NULL,
    isi TEXT,
    status VARCHAR(20) DEFAULT 'draft',
    files TEXT[],
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS jadwal_pelayanan (
    id SERIAL PRIMARY KEY,
    nama_kegiatan VARCHAR(255) NOT NULL,
    tanggal DATE NOT NULL,
    pelayan JSONB,
    status VARCHAR(20) DEFAULT 'aktif',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
