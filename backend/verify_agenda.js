import pool from './src/config/db.js';

async function verifyAgenda() {
    try {
        const result = await pool.query("SELECT * FROM agenda ORDER BY created_at DESC LIMIT 10");
        console.log('Last 10 Agenda Items:', result.rows);
    } catch (err) {
        console.error(err);
    } finally {
        pool.end();
    }
}

verifyAgenda();
