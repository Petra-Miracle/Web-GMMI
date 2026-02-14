import pool from './src/config/db.js';

async function check() {
    try {
        const res = await pool.query("SELECT * FROM renungan_mingguan LIMIT 5");
        console.log(JSON.stringify(res.rows, null, 2));
    } catch (err) {
        console.error(err);
    } finally {
        process.exit(0);
    }
}

check();
