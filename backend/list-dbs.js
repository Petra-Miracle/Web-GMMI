import pool from './src/config/db.js';

async function listDbs() {
    try {
        const res = await pool.query('SELECT datname FROM pg_database');
        console.log('Databases:', res.rows.map(row => row.datname));
        process.exit(0);
    } catch (err) {
        console.error('Failed:', err.message);
        process.exit(1);
    }
}

listDbs();
