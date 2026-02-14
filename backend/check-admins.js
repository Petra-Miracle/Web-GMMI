import pool from './src/config/db.js';

async function check() {
    try {
        const res = await pool.query('SELECT * FROM admins');
        console.log('Admins in DB:', res.rows);
        process.exit(0);
    } catch (err) {
        console.error('Check failed:', err.message);
        process.exit(1);
    }
}

check();
