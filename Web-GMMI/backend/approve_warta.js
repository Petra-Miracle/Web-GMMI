import pool from './src/config/db.js';

async function approve() {
    try {
        const res = await pool.query("UPDATE pewartaan SET status = 'approved' WHERE id = 2 RETURNING *");
        console.log('Approved:', JSON.stringify(res.rows[0], null, 2));
    } catch (err) {
        console.error(err);
    } finally {
        process.exit(0);
    }
}

approve();
