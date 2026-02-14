import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
});

async function createPekerjaanTable() {
    const client = await pool.connect();
    try {
        console.log('🔧 Membuat tabel pekerjaan...');

        // 1. Buat tabel pekerjaan
        await client.query(`
            CREATE TABLE IF NOT EXISTS pekerjaan (
                id SERIAL PRIMARY KEY,
                nama_pekerjaan VARCHAR(100) NOT NULL UNIQUE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log('✅ Tabel pekerjaan berhasil dibuat');

        // 2. Insert data pekerjaan standar
        const pekerjaanList = [
            'Pelajar',
            'Mahasiswa',
            'PNS',
            'TNI',
            'Polri',
            'Karyawan Swasta',
            'Wiraswasta',
            'Guru',
            'Dosen',
            'Dokter',
            'Perawat',
            'Bidan',
            'Petani',
            'Nelayan',
            'Buruh',
            'Pedagang',
            'Pengusaha',
            'Ibu Rumah Tangga',
            'Pensiunan',
            'Belum Bekerja',
            'Lainnya'
        ];

        console.log('📝 Mengisi data pekerjaan...');
        for (const pekerjaan of pekerjaanList) {
            await client.query(
                'INSERT INTO pekerjaan (nama_pekerjaan) VALUES ($1) ON CONFLICT (nama_pekerjaan) DO NOTHING',
                [pekerjaan]
            );
        }
        console.log('✅ Data pekerjaan berhasil diisi');

        // 3. Cek apakah kolom pekerjaan_id sudah ada
        const checkColumn = await client.query(`
            SELECT column_name 
            FROM information_schema.columns 
            WHERE table_name = 'jemaat' AND column_name = 'pekerjaan_id'
        `);

        if (checkColumn.rows.length === 0) {
            console.log('🔧 Menambahkan kolom pekerjaan_id ke tabel jemaat...');

            // Tambah kolom pekerjaan_id
            await client.query(`
                ALTER TABLE jemaat 
                ADD COLUMN pekerjaan_id INTEGER REFERENCES pekerjaan(id);
            `);
            console.log('✅ Kolom pekerjaan_id berhasil ditambahkan');

            // 4. Migrasi data lama (pekerjaan text -> pekerjaan_id)
            console.log('🔄 Migrasi data pekerjaan lama...');

            // Ambil semua jemaat dengan pekerjaan text
            const jemaatWithPekerjaan = await client.query(`
                SELECT id, pekerjaan FROM jemaat WHERE pekerjaan IS NOT NULL AND pekerjaan != ''
            `);

            for (const jemaat of jemaatWithPekerjaan.rows) {
                // Cari pekerjaan_id yang cocok atau paling mirip
                let pekerjaanId = null;

                // Coba exact match dulu
                const exactMatch = await client.query(
                    'SELECT id FROM pekerjaan WHERE LOWER(nama_pekerjaan) = LOWER($1)',
                    [jemaat.pekerjaan.trim()]
                );

                if (exactMatch.rows.length > 0) {
                    pekerjaanId = exactMatch.rows[0].id;
                } else {
                    // Kalau tidak ada exact match, set ke "Lainnya"
                    const lainnya = await client.query(
                        "SELECT id FROM pekerjaan WHERE nama_pekerjaan = 'Lainnya'"
                    );
                    pekerjaanId = lainnya.rows[0].id;
                }

                // Update jemaat dengan pekerjaan_id
                await client.query(
                    'UPDATE jemaat SET pekerjaan_id = $1 WHERE id = $2',
                    [pekerjaanId, jemaat.id]
                );
            }
            console.log(`✅ Berhasil migrasi ${jemaatWithPekerjaan.rows.length} data jemaat`);

            // 5. Hapus kolom pekerjaan lama (opsional - bisa dikomentari jika ingin backup)
            // console.log('🗑️ Menghapus kolom pekerjaan lama...');
            // await client.query('ALTER TABLE jemaat DROP COLUMN pekerjaan');
            // console.log('✅ Kolom pekerjaan lama berhasil dihapus');
        } else {
            console.log('ℹ️ Kolom pekerjaan_id sudah ada, skip migrasi');
        }

        // 6. Tampilkan hasil
        const result = await client.query('SELECT * FROM pekerjaan ORDER BY nama_pekerjaan');
        console.log('\n📋 Daftar Pekerjaan:');
        console.table(result.rows);

        console.log('\n✅ Setup pekerjaan selesai!');
    } catch (error) {
        console.error('❌ Error:', error.message);
        throw error;
    } finally {
        client.release();
        await pool.end();
    }
}

createPekerjaanTable();
