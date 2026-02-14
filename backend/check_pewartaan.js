import pool from './src/config/db.js';

async function check() {
    try {
        const res = await pool.query('SELECT status, COUNT(*) FROM pewartaan GROUP BY status');
        console.log(JSON.stringify(res.rows, null, 2));

        const all = await pool.query('SELECT id, judul, status FROM pewartaan ORDER BY created_at DESC');
        console.log('All records:');
        console.log(JSON.stringify(all.rows, null, 2));
    } catch (err) {
        console.error(err);
    } finally {
        process.exit(0);
    }
}

check();
