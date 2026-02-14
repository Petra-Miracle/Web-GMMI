import pool from './src/config/db.js';

async function reset() {
    try {
        console.log('Resetting program_kegiatan_gereja and bidang_gereja_enum...');

        await pool.query('DROP TABLE IF EXISTS program_kegiatan_gereja');
        await pool.query('DROP TYPE IF EXISTS bidang_gereja_enum');

        console.log('Dropped successfully.');
        process.exit(0);
    } catch (err) {
        console.error('Error:', err.message);
        process.exit(1);
    }
}

reset();
