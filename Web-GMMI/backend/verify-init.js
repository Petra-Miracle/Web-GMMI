import pool from './src/config/db.js';

async function check() {
    try {
        const adminRes = await pool.query("SELECT count(*) FROM admins");
        console.log('Admins count:', adminRes.rows[0].count);
    } catch (e) {
        console.log('Admins table error:', e.message);
    }

    try {
        const progRes = await pool.query("SELECT count(*) FROM program_kegiatan_gereja");
        console.log('Program table count:', progRes.rows[0].count);
    } catch (e) {
        console.log('Program table error:', e.message);
    }

    process.exit(0);
}

check();
