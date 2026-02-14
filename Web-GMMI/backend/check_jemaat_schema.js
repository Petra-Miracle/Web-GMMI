import pool from './src/config/db.js';

async function check() {
    const tables = ['sectors', 'jemaat', 'jemaat_sakramen'];
    for (const table of tables) {
        try {
            const res = await pool.query(`
        SELECT column_name, data_type, is_nullable
        FROM information_schema.columns 
        WHERE table_name = $1 
        ORDER BY ordinal_position
      `, [table]);
            console.log(`\nTable: ${table}`);
            console.table(res.rows);
        } catch (err) {
            console.error(`Error checking table ${table}:`, err.message);
        }
    }
    pool.end();
}

check();
