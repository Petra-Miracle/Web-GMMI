import pool from './src/config/db.js';

async function checkColumns() {
    try {
        const tables = ['pewartaan', 'announcements', 'program_kegiatan_gereja', 'renungan_mingguan'];

        for (const table of tables) {
            console.log(`Checking columns for ${table}...`);
            const res = await pool.query(`
                SELECT column_name, data_type 
                FROM information_schema.columns 
                WHERE table_name = '${table}'
            `);
            console.log(res.rows.map(r => r.column_name));
        }
    } catch (err) {
        console.error(err);
    } finally {
        pool.end();
    }
}

checkColumns();
