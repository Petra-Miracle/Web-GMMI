import pool from './src/config/db.js';

async function checkFinance() {
    try {
        console.log("Checking Finance Tables...");

        const tables = ['laporan_keuangan', 'transactions'];

        for (const table of tables) {
            console.log(`\n--- ${table} ---`);

            // Check Columns
            const cols = await pool.query(`
                SELECT column_name, data_type 
                FROM information_schema.columns 
                WHERE table_name = '${table}'
            `);
            console.log("Columns:", cols.rows.map(c => `${c.column_name} (${c.data_type})`));

            // Check Row Count
            try {
                const count = await pool.query(`SELECT COUNT(*) FROM ${table}`);
                console.log("Count:", count.rows[0].count);

                // Check sample data
                if (parseInt(count.rows[0].count) > 0) {
                    const sample = await pool.query(`SELECT * FROM ${table} LIMIT 1`);
                    console.log("Sample:", sample.rows[0]);
                }
            } catch (err) {
                console.log("Count error:", err.message);
            }
        }

    } catch (err) {
        console.error(err);
    } finally {
        pool.end();
    }
}

checkFinance();
