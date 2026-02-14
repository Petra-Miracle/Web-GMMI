CREATE TABLE IF NOT EXISTS sejarah (
    id SERIAL PRIMARY KEY,
    judul VARCHAR(255) NOT NULL,
    tanggal_peristiwa DATE,
    deskripsi TEXT NOT NULL,
    gambar_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);