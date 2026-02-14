import pool from './src/config/db.js';
import fs from 'fs';

async function check() {
    try {
        const res = await pool.query(`
            SELECT column_name, data_type 
            FROM information_schema.columns 
            WHERE table_name = 'pewartaan_pelayanan_sektor'
        `);
        fs.writeFileSync('db_output.txt', JSON.stringify(res.rows, null, 2));
    } catch (e) {
        fs.writeFileSync('db_output.txt', e.message);
    } finally {
        process.exit();
    }
}

check();
