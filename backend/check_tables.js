import pool from './src/config/db.js';

async function check() {
    try {
        console.log('--- PEWARTAN TABLE ---');
        const resP = await pool.query('SELECT id, judul, status FROM pewartaan ORDER BY created_at DESC');
        console.log(JSON.stringify(resP.rows, null, 2));

        console.log('--- WARTA TABLE ---');
        const resW = await pool.query('SELECT id, judul, status FROM warta ORDER BY created_at DESC');
        console.log(JSON.stringify(resW.rows, null, 2));
    } catch (err) {
        console.error(err);
    } finally {
        process.exit(0);
    }
}

check();
