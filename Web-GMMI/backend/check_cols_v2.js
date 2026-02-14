import pool from './src/config/db.js';

async function check() {
    try {
        const res = await pool.query("SELECT * FROM renungan_mingguan LIMIT 0");
        console.log("Table: renungan_mingguan");
        res.fields.forEach(f => console.log(f.name));
    } catch (e) {
        console.error("Error:", e.message);
    } finally {
        await pool.end();
    }
}

check();
