import pool from './src/config/db.js';

async function check() {
    try {
        const res = await pool.query('SELECT status, count(*) FROM announcements GROUP BY status');
        console.log('Announcement statuses:');
        res.rows.forEach(row => console.log(`${row.status}: ${row.count}`));
        process.exit(0);
    } catch (error) {
        console.error('Check failed:', error.message);
        process.exit(1);
    }
}

check();
