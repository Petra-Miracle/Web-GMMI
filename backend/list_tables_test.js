import pool from './src/config/db.js';
import fs from 'fs';

async function check() {
    try {
        const res = await pool.query(`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public'
        `);
        fs.writeFileSync('tables_output.txt', JSON.stringify(res.rows, null, 2));
    } catch (e) {
        fs.writeFileSync('tables_output.txt', e.message);
    } finally {
        process.exit();
    }
}

check();
