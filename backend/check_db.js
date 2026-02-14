import pool from './src/config/db.js';

async function check() {
    try {
        const res = await pool.query('SELECT count(*) FROM announcements');
        console.log(`Total announcements: ${res.rows[0].count}`);
        process.exit(0);
    } catch (error) {
        console.error('Check failed:', error.message);
        process.exit(1);
    }
}

check();
