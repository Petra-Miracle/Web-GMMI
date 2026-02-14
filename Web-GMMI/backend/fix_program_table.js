import pool from './src/config/db.js';

async function testFetch() {
    try {
        console.log('Attempting to fetch programs...');
        const res = await pool.query('SELECT * FROM program_kegiatan_gereja');
        console.log(`Success! Found ${res.rows.length} programs.`);
    } catch (err) {
        console.error('FETCH ERROR:', err.message);
        if (err.message.includes('relation "program_kegiatan_gereja" does not exist')) {
            console.log('Table is missing. Re-creating schema...');
            // Try to create it
            const schema = `
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

                CREATE TABLE IF NOT EXISTS program_kegiatan_gereja (
                    id SERIAL PRIMARY KEY,
                    bidang bidang_gereja_enum NOT NULL,
                    sub_bidang VARCHAR(50),
                    nama_program VARCHAR(255) NOT NULL,
                    jenis_kegiatan TEXT,
                    volume INTEGER DEFAULT 1,
                    waktu_pelaksanaan VARCHAR(100),
                    rencana_biaya DECIMAL(15, 2),
                    keterangan TEXT,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                );
            `;
            await pool.query(schema);
            console.log('Schema created successfully.');
        }
    } finally {
        process.exit();
    }
}

testFetch();
