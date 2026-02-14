import pool from './src/config/db.js';

async function checkAdmins() {
    try {
        const res = await pool.query('SELECT username, role FROM admins');
        console.log('Admins found:', res.rows.length);
        console.table(res.rows);
    } catch (err) {
        console.error('Admins check error:', err.message);
    } finally {
        process.exit();
    }
}

checkAdmins();
