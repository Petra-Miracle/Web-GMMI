-- Create Enum
DO $$ BEGIN
    CREATE TYPE bidang_gereja_enum AS ENUM (
        'Sekretariat',
        'Penatalayanan',
        'Kategorial',
        'Pemberdayaan Jemaat',
        'Rumah Tangga, Sarana, dan Prasarana',
        'BP2K2',
        'Kebendaharaan'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Create Table
CREATE TABLE IF NOT EXISTS program_kegiatan_gereja (
    id SERIAL PRIMARY KEY,
    bidang bidang_gereja_enum NOT NULL,
    sub_bidang VARCHAR(50), -- Only for Penatalayanan: 'Pelayanan Umum' or 'Pelayanan Khusus'
    nama_program VARCHAR(255) NOT NULL,
    jenis_kegiatan TEXT,
    volume INTEGER DEFAULT 1,
    waktu_pelaksanaan VARCHAR(100),
    rencana_biaya DECIMAL(15, 2),
    keterangan TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
