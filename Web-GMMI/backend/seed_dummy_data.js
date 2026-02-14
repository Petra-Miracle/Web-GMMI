import pool from './src/config/db.js';

const seedData = async () => {
    console.log('Starting seed process...');
    const client = await pool.connect();

    try {
        // --- 1. Announcements ---
        console.log('Recreating Announcements...');
        await client.query(`DROP TABLE IF EXISTS announcements CASCADE`);
        await client.query(`
            CREATE TABLE announcements (
                id SERIAL PRIMARY KEY,
                isi TEXT NOT NULL,
                status VARCHAR(20) DEFAULT 'draft',
                tanggal TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        const announcements = [
            { isi: 'Ibadah Padang akan dilaksanakan pada bulan depan di Taman Bunga.', status: 'publish' },
            { isi: 'Rapat Evaluasi Majelis diadakan hari Sabtu ini pukul 19.00 WIB.', status: 'publish' },
            { isi: 'Pendaftaran Baptisan Air telah dibuka, harap hubungi sekretariat.', status: 'publish' },
            { isi: 'Persiapan Natal GMMI tahun ini dimulai minggu depan.', status: 'draft' },
            { isi: 'Kerja bakti membersihkan gedung gereja Sabtu pagi.', status: 'publish' },
            { isi: 'Kunjungan kasih ke Panti Asuhan Kasih Bunda.', status: 'publish' },
            { isi: 'Seminar Keluarga Bahagia bersama Pdt. Yudi.', status: 'draft' },
            { isi: 'Donor darah sukarela bekerja sama dengan PMI.', status: 'publish' },
            { isi: 'Latihan gabungan tim musik dan pemuji.', status: 'publish' },
            { isi: 'Doa puasa bersama seluruh jemaat.', status: 'publish' }
        ];

        console.log('Seeding Announcements...');
        for (const ann of announcements) {
            await client.query('INSERT INTO announcements (isi, status) VALUES ($1, $2)', [ann.isi, ann.status]);
        }

        // --- 2. Program Kegiatan Gereja ---
        console.log('Recreating Program Kegiatan Gereja...');
        await client.query(`DROP TABLE IF EXISTS program_kegiatan_gereja CASCADE`);
        await client.query(`
            CREATE TABLE program_kegiatan_gereja (
                id SERIAL PRIMARY KEY,
                bidang VARCHAR(50) NOT NULL,
                sub_bidang VARCHAR(100),
                nama_program VARCHAR(255) NOT NULL,
                jenis_kegiatan VARCHAR(255) NOT NULL,
                volume INTEGER DEFAULT 1,
                waktu_pelaksanaan VARCHAR(100) NOT NULL,
                rencana_biaya DECIMAL(15, 2) DEFAULT 0,
                keterangan TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        const programs = [
            { bidang: 'Pewartaan', nama_program: 'Khotbah Minggu', jenis_kegiatan: 'Ibadah Raya', volume: 52, waktu: 'Setiap Minggu', biaya: 5000000 },
            { bidang: 'Persekutuan', nama_program: 'Ibadah Kaum Wanita', jenis_kegiatan: 'Persekutuan Doa', volume: 12, waktu: 'Bulanan', biaya: 1200000 },
            { bidang: 'Pelayanan', nama_program: 'Bantuan Sembako', jenis_kegiatan: 'Diakonia', volume: 4, waktu: 'Triwulan', biaya: 10000000 },
            { bidang: 'Pendidikan', nama_program: 'Sekolah Minggu', jenis_kegiatan: 'Pengajaran Anak', volume: 52, waktu: 'Setiap Minggu', biaya: 3000000 },
            { bidang: 'Penatalayanan', sub_bidang: 'Sarana Prasarana', nama_program: 'Renovasi Atap', jenis_kegiatan: 'Pembangunan', volume: 1, waktu: 'Juni 2024', biaya: 25000000 },
            { bidang: 'Pewartaan', nama_program: 'KKR Pemuda', jenis_kegiatan: 'Kebaktian Kebangunan Rohani', volume: 1, waktu: 'Agustus 2024', biaya: 15000000 },
            { bidang: 'Persekutuan', nama_program: 'Retreat Majelis', jenis_kegiatan: 'Pembinaan', volume: 1, waktu: 'Oktober 2024', biaya: 20000000 },
            { bidang: 'Pelayanan', nama_program: 'Kunjungan Orang Sakit', jenis_kegiatan: 'Pastoral', volume: 24, waktu: 'Kondisional', biaya: 2400000 },
            { bidang: 'Pendidikan', nama_program: 'Katekisasi', jenis_kegiatan: 'Kelas Persiapan Baptisan', volume: 2, waktu: 'Semester', biaya: 500000 },
            { bidang: 'Penatalayanan', sub_bidang: 'Administrasi', nama_program: 'Pengadaan Komputer', jenis_kegiatan: 'Inventaris', volume: 2, waktu: 'April 2024', biaya: 15000000 }
        ];

        console.log('Seeding Programs...');
        for (const prog of programs) {
            await client.query(
                `INSERT INTO program_kegiatan_gereja (bidang, sub_bidang, nama_program, jenis_kegiatan, volume, waktu_pelaksanaan, rencana_biaya) 
                 VALUES ($1, $2, $3, $4, $5, $6, $7)`,
                [prog.bidang, prog.sub_bidang || null, prog.nama_program, prog.jenis_kegiatan, prog.volume, prog.waktu, prog.biaya]
            );
        }

        // --- 3. Transactions ---
        console.log('Recreating Transactions...');
        await client.query(`DROP TABLE IF EXISTS transactions CASCADE`);
        await client.query(`
            CREATE TABLE transactions (
                id SERIAL PRIMARY KEY,
                type VARCHAR(10) CHECK (type IN ('income', 'expense')),
                amount NUMERIC(15, 2) NOT NULL,
                description TEXT,
                date DATE NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        const transactions = [
            { type: 'income', amount: 5000000, desc: 'Kolekte Minggu 1', date: '2024-02-04' },
            { type: 'income', amount: 4500000, desc: 'Kolekte Minggu 2', date: '2024-02-11' },
            { type: 'expense', amount: 1500000, desc: 'Bayar Listrik & Air', date: '2024-02-05' },
            { type: 'income', amount: 10000000, desc: 'Perpuluhan Jemaat', date: '2024-02-10' },
            { type: 'expense', amount: 500000, desc: 'Konsumsi Rapat', date: '2024-02-12' },
            { type: 'income', amount: 3000000, desc: 'Sumbangan Pembangunan', date: '2024-02-15' },
            { type: 'expense', amount: 2000000, desc: 'Bantuan Diakonia', date: '2024-02-18' },
            { type: 'income', amount: 5200000, desc: 'Kolekte Minggu 3', date: '2024-02-18' },
            { type: 'expense', amount: 300000, desc: 'Alat Kebersihan', date: '2024-02-20' },
            { type: 'income', amount: 2000000, desc: 'Ucapan Syukur Keluarga', date: '2024-02-22' }
        ];

        console.log('Seeding Transactions...');
        for (const trx of transactions) {
            await client.query(
                `INSERT INTO transactions (type, amount, description, date) VALUES ($1, $2, $3, $4)`,
                [trx.type, trx.amount, trx.desc, trx.date]
            );
        }

        // --- 4. Pewartaan ---
        console.log('Recreating Pewartaan and Related Tables...');
        const relatedTablesList = [
            'pewartaan_tata_ibadah', 'pewartaan_pokok_doa', 'pewartaan_jemaat_ultah',
            'pewartaan_jemaat_sakit', 'pewartaan_pemulihan', 'pewartaan_lansia',
            'pewartaan_info_ibadah', 'pewartaan_pelayanan_sektor', 'pewartaan_pelayanan_kategorial'
        ];

        for (const tbl of relatedTablesList) {
            await client.query(`DROP TABLE IF EXISTS ${tbl} CASCADE`);
        }
        await client.query(`DROP TABLE IF EXISTS pewartaan CASCADE`);

        await client.query(`
            CREATE TABLE pewartaan (
                id SERIAL PRIMARY KEY,
                judul VARCHAR(255) NOT NULL,
                tanggal_ibadah DATE NOT NULL,
                hari VARCHAR(50),
                tempat_jemaat VARCHAR(255),
                ayat_firman TEXT,
                tema_khotbah VARCHAR(255),
                status VARCHAR(50) DEFAULT 'draft',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Execute creates separately to avoid multi-statement issues if any
        const tables = [
            `CREATE TABLE pewartaan_tata_ibadah (
                id SERIAL PRIMARY KEY,
                pewartaan_id INTEGER REFERENCES pewartaan(id) ON DELETE CASCADE,
                urutan INTEGER,
                nama_bagian VARCHAR(255),
                keterangan TEXT,
                judul_pujian VARCHAR(255),
                isi_konten TEXT
            )`,
            `CREATE TABLE pewartaan_pokok_doa (
                id SERIAL PRIMARY KEY,
                pewartaan_id INTEGER REFERENCES pewartaan(id) ON DELETE CASCADE,
                kategori VARCHAR(255),
                keterangan TEXT
            )`,
            `CREATE TABLE pewartaan_jemaat_ultah (
                id SERIAL PRIMARY KEY,
                pewartaan_id INTEGER REFERENCES pewartaan(id) ON DELETE CASCADE,
                tanggal DATE,
                nama_jemaat VARCHAR(255),
                keterangan TEXT
            )`,
            `CREATE TABLE pewartaan_jemaat_sakit (
                id SERIAL PRIMARY KEY,
                pewartaan_id INTEGER REFERENCES pewartaan(id) ON DELETE CASCADE,
                nama_jemaat VARCHAR(255),
                keterangan TEXT
            )`,
            `CREATE TABLE pewartaan_pemulihan (
                id SERIAL PRIMARY KEY,
                pewartaan_id INTEGER REFERENCES pewartaan(id) ON DELETE CASCADE,
                nama_jemaat VARCHAR(255),
                keterangan TEXT
            )`,
            `CREATE TABLE pewartaan_lansia (
                id SERIAL PRIMARY KEY,
                pewartaan_id INTEGER REFERENCES pewartaan(id) ON DELETE CASCADE,
                nama_jemaat VARCHAR(255),
                keterangan TEXT
            )`,
            `CREATE TABLE pewartaan_info_ibadah (
                id SERIAL PRIMARY KEY,
                pewartaan_id INTEGER REFERENCES pewartaan(id) ON DELETE CASCADE,
                tanggal DATE,
                jam VARCHAR(50),
                jenis_ibadah VARCHAR(255),
                pemimpin VARCHAR(255),
                sektor VARCHAR(100)
            )`,
            `CREATE TABLE pewartaan_pelayanan_sektor (
                id SERIAL PRIMARY KEY,
                pewartaan_id INTEGER REFERENCES pewartaan(id) ON DELETE CASCADE,
                nomor_sektor VARCHAR(50),
                tempat VARCHAR(255),
                pemimpin VARCHAR(255),
                liturgos VARCHAR(255),
                nomor_hp VARCHAR(50)
            )`,
            `CREATE TABLE pewartaan_pelayanan_kategorial (
                id SERIAL PRIMARY KEY,
                pewartaan_id INTEGER REFERENCES pewartaan(id) ON DELETE CASCADE,
                tanggal_waktu VARCHAR(100),
                kategori_pelayanan VARCHAR(255),
                tempat VARCHAR(255),
                pemimpin VARCHAR(255),
                liturgos_petugas VARCHAR(255)
            )`
        ];

        for (const sql of tables) {
            await client.query(sql);
        }

        const themes = [
            "Hidup Baru dalam Kristus", "Kasih yang Memulihkan", "Menjadi Garam Dunia",
            "Iman dan Perbuatan", "Kesetiaan dalam Perkara Kecil", "Keluarga Allah",
            "Pengharapan yang Hidup", "Kuasa Doa", "Melayani dengan Hati", "Buah Roh Kudus"
        ];

        console.log('Seeding Pewartaan Data...');
        for (let i = 0; i < 10; i++) {
            const date = new Date();
            date.setDate(date.getDate() - (i * 7)); // Backwards weekly

            const pewartaanData = {
                judul: `Warta Jemaat - Minggu ke-${i + 1}`,
                tanggal_ibadah: date.toISOString().split('T')[0],
                hari: 'Minggu',
                tempat_jemaat: 'Gedung Gereja Utama',
                ayat_firman: `Mazmur 23:${i + 1}`,
                tema_khotbah: themes[i],
                status: i < 2 ? 'draft' : 'approved'
            };

            const insertPewartaan = await client.query(`
                INSERT INTO pewartaan (judul, tanggal_ibadah, hari, tempat_jemaat, ayat_firman, tema_khotbah, status)
                VALUES ($1, $2, $3, $4, $5, $6, $7)
                RETURNING id
            `, [pewartaanData.judul, pewartaanData.tanggal_ibadah, pewartaanData.hari, pewartaanData.tempat_jemaat, pewartaanData.ayat_firman, pewartaanData.tema_khotbah, pewartaanData.status]);

            const pId = insertPewartaan.rows[0].id;

            // Tata Ibadah
            await client.query(`INSERT INTO pewartaan_tata_ibadah (pewartaan_id, urutan, nama_bagian, keterangan, judul_pujian) VALUES 
                ($1, 1, 'Pujian Pembukaan', 'Berdiri', 'Ku Masuk Ruang Maha Kudus'),
                ($1, 2, 'Votum & Salam', 'Jemaat Berdiri', NULL),
                ($1, 3, 'Pujian Penyembahan', 'Duduk', 'Bagaikan Bejana')
            `, [pId]);

            // Pokok Doa
            await client.query(`INSERT INTO pewartaan_pokok_doa (pewartaan_id, kategori, keterangan) VALUES 
                ($1, 'Bangsa & Negara', 'Berdoa untuk persatuan bangsa'),
                ($1, 'Gereja', 'Pertumbuhan iman jemaat')
            `, [pId]);

            // Info Ibadah
            await client.query(`INSERT INTO pewartaan_info_ibadah (pewartaan_id, tanggal, jam, jenis_ibadah, pemimpin, sektor) VALUES 
                ($1, $2, '09:00', 'Ibadah Raya', 'Pdt. Yudi', 'Semua Sektor')
            `, [pId, pewartaanData.tanggal_ibadah]);

            // Pelayanan Sektor
            await client.query(`INSERT INTO pewartaan_pelayanan_sektor (pewartaan_id, nomor_sektor, tempat, pemimpin) VALUES
                ($1, 'Sektor 1', 'Kel. Bpk. Andi', 'Dkn. Budi'),
                ($1, 'Sektor 2', 'Kel. Ibu Susi', 'Dkn. Tono')
            `, [pId]);

            // Jemaat Ultah
            await client.query(`INSERT INTO pewartaan_jemaat_ultah (pewartaan_id, tanggal, nama_jemaat, keterangan) VALUES 
                ($1, $2, 'Sdr. Kevin', 'HUT ke-25')
            `, [pId, pewartaanData.tanggal_ibadah]);
        }

        console.log('Seeding completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding data:', error.message);
        process.exit(1);
    } finally {
        client.release();
    }
};

seedData();
