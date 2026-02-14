import pool from './src/config/db.js';

async function checkRows() {
    try {
        const tables = ['pewartaan', 'announcements', 'program_kegiatan_gereja', 'renungan_mingguan', 'agenda'];

        for (const table of tables) {
            console.log(`\n--- ${table} ---`);
            try {
                const res = await pool.query(`SELECT * FROM ${table} LIMIT 1`);
                if (res.rows.length > 0) {
                    console.log(JSON.stringify(Object.keys(res.rows[0]))); // Log keys only
                } else {
                    console.log("No data found");
                    // If no data, list columns from schema
                    const cols = await pool.query(`
                        SELECT column_name 
                        FROM information_schema.columns 
                        WHERE table_name = '${table}'
                    `);
                    console.log(cols.rows.map(r => r.column_name));
                }
            } catch (err) {
                console.log(`Error querying ${table}: ${err.message}`);
            }
        }
    } catch (err) {
        console.error(err);
    } finally {
        pool.end();
    }
}

checkRows();
