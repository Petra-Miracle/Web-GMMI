import pool from './src/config/db.js';

async function verify() {
    try {
        const res = await pool.query("SELECT COUNT(*) FROM renungan_mingguan");
        console.log("Renungan Count:", res.rows[0].count);
    } catch (e) {
        console.error("Error:", e.message);
    } finally {
        await pool.end();
    }
}

verify();
