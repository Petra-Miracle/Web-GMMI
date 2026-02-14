import pool from './src/config/db.js';

const dummyData = [
    {
        kegiatan: "Ibadah Raya Minggu Pagi",
        tanggal: "2026-02-15",
        jam_mulai: "09:00",
        lokasi: "Gedung Utama GMMI",
        penanggung_jawab: "Pdt. Samuel Johnson",
        status: "aktif"
    },
    {
        kegiatan: "Persekutuan Doa Rabu",
        tanggal: "2026-02-18",
        jam_mulai: "19:00",
        lokasi: "Ruang Doa",
        penanggung_jawab: "Ibu Maria",
        status: "aktif"
    },
    {
        kegiatan: "Latihan Musik & Pujian",
        tanggal: "2026-02-20",
        jam_mulai: "18:00",
        lokasi: "Studio Musik",
        penanggung_jawab: "Sdr. David",
        status: "aktif"
    },
    {
        kegiatan: "Ibadah Kaum Muda (Youth)",
        tanggal: "2026-02-21",
        jam_mulai: "17:00",
        lokasi: "Hall Youth Center",
        penanggung_jawab: "Pdm. Michael",
        status: "aktif"
    },
    {
        kegiatan: "Sekolah Minggu",
        tanggal: "2026-02-15",
        jam_mulai: "09:00",
        lokasi: "Kelas Anak",
        penanggung_jawab: "Kak Sarah",
        status: "aktif"
    },
    {
        kegiatan: "Rapat Majelis Gereja",
        tanggal: "2026-02-22",
        jam_mulai: "13:00",
        lokasi: "Ruang Rapat",
        penanggung_jawab: "Bpk. Andreas",
        status: "aktif"
    },
    {
        kegiatan: "Seminar Keluarga Bahagia",
        tanggal: "2026-03-01",
        jam_mulai: "10:00",
        lokasi: "Aula Serbaguna",
        penanggung_jawab: "Dr. Robert",
        status: "aktif"
    },
    {
        kegiatan: "Doa Pagi",
        tanggal: "2026-02-16",
        jam_mulai: "05:00",
        lokasi: "Gedung Utama",
        penanggung_jawab: "Ibu Elisabeth",
        status: "aktif"
    },
    {
        kegiatan: "Kunjungan Kasih ke Panti Asuhan",
        tanggal: "2026-03-05",
        jam_mulai: "08:00",
        lokasi: "Titik Kumpul Gereja",
        penanggung_jawab: "Diaken Thomas",
        status: "aktif"
    },
    {
        kegiatan: "Ibadah Ucapan Syukur Bulanan",
        tanggal: "2026-01-31",
        jam_mulai: "19:00",
        lokasi: "Gedung Utama",
        penanggung_jawab: "Pdt. Samuel Johnson",
        status: "selesai"
    }
];

async function seedAgenda() {
    try {
        console.log('Starting seeding agenda...');

        // Optional: Clear existing data first
        // await pool.query("DELETE FROM agenda"); 
        // console.log('Cleared existing agenda data.');

        for (const data of dummyData) {
            const query = `
        INSERT INTO agenda (kegiatan, tanggal, jam_mulai, lokasi, penanggung_jawab, status, is_publish, created_at, updated_at)
        VALUES ($1, $2, $3, $4, $5, $6, true, NOW(), NOW())
      `;
            await pool.query(query, [
                data.kegiatan,
                data.tanggal,
                data.jam_mulai,
                data.lokasi,
                data.penanggung_jawab,
                data.status
            ]);
            console.log(`Inserted: ${data.kegiatan}`);
        }

        console.log('Seeding completed successfully!');
    } catch (err) {
        console.error('Error seeding agenda:', err);
    } finally {
        pool.end();
    }
}

seedAgenda();
