import pool from './src/config/db.js';
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

async function seedData() {
    try {
        console.log("Starting data seeding...");

        // 1. Seed Admins
        const hashedPassword = await bcrypt.hash('admin123', SALT_ROUNDS);

        // Super Admin
        await pool.query(`
            INSERT INTO admins (nama, email, password_hash, role, is_active)
            VALUES ($1, $2, $3, $4, $5)
            ON CONFLICT (email) DO NOTHING
        `, ['Super Admin', 'super@gmmi.com', hashedPassword, 'super_admin', true]);

        // Admin Majelis
        await pool.query(`
            INSERT INTO admins (nama, email, password_hash, role, is_active)
            VALUES ($1, $2, $3, $4, $5)
            ON CONFLICT (email) DO NOTHING
        `, ['Admin Majelis', 'admin@gmmi.com', hashedPassword, 'admin_majelis', true]);

        console.log("Admins seeded.");

        // 2. Seed Pengumuman
        await pool.query(`TRUNCATE TABLE announcements RESTART IDENTITY CASCADE`); // Clear first 
        await pool.query(`
            INSERT INTO announcements (isi, status, tanggal)
            VALUES 
            ('Ibadah Raya Minggu ini akan dilaksanakan pukul 08.00 WIB dan 10.00 WIB. Mohon kehadiran jemaat tepat waktu.', 'publish', CURRENT_DATE),
            ('Persiapan Natal akan dimulai minggu depan. Bagi jemaat yang ingin bergabung dalam panitia dapat menghubungi sekretariat.', 'publish', CURRENT_DATE - 1),
            ('Doa Malam akan diadakan via Zoom Meeting setiap hari Rabu pukul 19.30 WIB.', 'publish', CURRENT_DATE - 2)
        `);
        console.log("Pengumuman seeded.");

        // 3. Seed Warta
        await pool.query(`TRUNCATE TABLE warta RESTART IDENTITY CASCADE`);
        await pool.query(`
            INSERT INTO warta (judul, tanggal, isi, status, tempat_jemaat, tema_khotbah)
            VALUES 
            ('Warta Jemaat Minggu Ini', CURRENT_DATE, 'Berikut adalah warta jemaat untuk minggu ini, mencakup jadwal pelayanan dan laporan keuangan.', 'publish', 'GMMI Pusat', 'Hidup yang Berbuah'),
            ('Warta Jemaat Minggu Lalu', CURRENT_DATE - 7, 'Ringkasan kegiatan minggu lalu dan rencana pelayanan ke depan.', 'publish', 'GMMI Pusat', 'Iman yang Menang')
        `);
        console.log("Warta seeded.");

        // 4. Seed Program
        await pool.query(`TRUNCATE TABLE program_kegiatan_gereja RESTART IDENTITY CASCADE`);
        await pool.query(`
            INSERT INTO program_kegiatan_gereja (bidang, nama_program, jenis_kegiatan, waktu_pelaksanaan, rencana_biaya, keterangan)
            VALUES 
            ('Kategorial', 'KKR Pemuda', 'Ibadah Kebangunan Rohani khusus pemuda', 'Juni 2026', 5000000, 'Target 200 pemuda'),
            ('Pemberdayaan Jemaat', 'Bakti Sosial', 'Pembagian sembako untuk warga sekitar', 'Agustus 2026', 10000000, 'Sesuai agenda tahunan'),
            ('BP2K2', 'Retreat Keluarga', 'Kegiatan kebersamaan keluarga jemaat', 'Oktober 2026', 15000000, 'Lokasi di Puncak')
        `);
        console.log("Program seeded.");

        // 5. Seed Sejarah
        // We insert the default "static" content into DB so it acts as the initial dynamic data
        await pool.query(`TRUNCATE TABLE sejarah RESTART IDENTITY CASCADE`);
        await pool.query(`
            INSERT INTO sejarah (judul, tanggal_peristiwa, deskripsi, gambar_url)
            VALUES 
            ('Awal Mula Berdiri', '1999-05-12', 'GMMI lahir dari kerinduan untuk menyediakan wadah persekutuan yang berakar kuat pada Alkitab dan memiliki kepedulian sosial yang nyata bagi sesama. Sejak didirikan pada tahun 1999, GMMI terus berkomitmen untuk membangun jemaat yang militan dalam iman namun inklusif dalam pelayanan.', NULL)
        `);
        console.log("Sejarah seeded.");

        console.log("✅ Seeding completed successfully!");
        process.exit(0);
    } catch (err) {
        console.error("❌ Seeding failed:", err);
        process.exit(1);
    }
}

seedData();
