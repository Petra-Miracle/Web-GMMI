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
            console.log(`\nTABLE_NAME: ${table}`);
            console.log('--------------------------------------------------');
            res.rows.forEach(row => {
                console.log(`${row.column_name.padEnd(20)} | ${row.data_type.padEnd(15)} | ${row.is_nullable}`);
            });
        } catch (err) {
            console.error(`Error checking table ${table}:`, err.message);
        }
    }
    pool.end();
}

check();
