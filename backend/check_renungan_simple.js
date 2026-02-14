import pool from './src/config/db.js';

async function check() {
    try {
        const res = await pool.query("SELECT * FROM renungan_mingguan LIMIT 1");
        console.log("Columns:", Object.keys(res.fields).map(f => res.fields[f].name));
    } catch (e) {
        console.error("Error:", e.message);
    } finally {
        await pool.end();
    }
}

check();
