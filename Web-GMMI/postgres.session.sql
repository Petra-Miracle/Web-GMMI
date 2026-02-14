CREATE TABLE warta_ulang_tahun (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    warta_id UUID REFERENCES warta_ibadah(id) ON DELETE CASCADE,
    tanggal DATE,
    nama VARCHAR(150),
    keterangan TEXT
);
CREATE TABLE warta_jemaat_sakit (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    warta_id UUID REFERENCES warta_ibadah(id) ON DELETE CASCADE,
    nama VARCHAR(150),
    keterangan TEXT
);
CREATE TABLE warta_pemulihan (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    warta_id UUID REFERENCES warta_ibadah(id) ON DELETE CASCADE,
    nama VARCHAR(150),
    keterangan TEXT
);
CREATE TABLE warta_lansia (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    warta_id UUID REFERENCES warta_ibadah(id) ON DELETE CASCADE,
    nama VARCHAR(150),
    keterangan TEXT
);
CREATE TABLE warta_informasi_ibadah (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    warta_id UUID REFERENCES warta_ibadah(id) ON DELETE CASCADE,
    tanggal DATE,
    jam VARCHAR(20),
    jenis_ibadah VARCHAR(100),
    pemimpin VARCHAR(100),
    sektor VARCHAR(100)
);
CREATE TABLE warta_pelayanan_sektor (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    warta_id UUID REFERENCES warta_ibadah(id) ON DELETE CASCADE,
    sektor VARCHAR(50),
    tempat VARCHAR(150),
    pemimpin VARCHAR(100),
    liturgos VARCHAR(100)
);
CREATE TABLE warta_pelayanan_kategorial (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    warta_id UUID REFERENCES warta_ibadah(id) ON DELETE CASCADE,
    hari_tanggal VARCHAR(100),
    kategori VARCHAR(100),
    tempat VARCHAR(150),
    pemimpin VARCHAR(100),
    liturgos VARCHAR(100)
);