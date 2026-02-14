import pool from './src/config/db.js';
import fs from 'fs';

async function checkFinance() {
    let output = '';
    const log = (msg) => { output += msg + '\n'; console.log(msg); };

    try {
        log("Checking Finance Tables...");

        const tables = ['laporan_keuangan', 'transactions'];

        for (const table of tables) {
            log(`\n--- ${table} ---`);

            // Check Columns
            const cols = await pool.query(`
                SELECT column_name, data_type 
                FROM information_schema.columns 
                WHERE table_name = '${table}'
                ORDER BY ordinal_position
            `);
            const columnList = cols.rows.map(c => `${c.column_name} (${c.data_type})`);
            log("Columns: " + JSON.stringify(columnList));

            // Allow check of empty count
            try {
                const count = await pool.query(`SELECT COUNT(*) FROM ${table}`);
                log("Count: " + count.rows[0].count);

                // Show sample
                if (parseInt(count.rows[0].count) > 0) {
                    const sample = await pool.query(`SELECT * FROM ${table} LIMIT 1`);
                    log("Sample: " + JSON.stringify(sample.rows[0]));
                }
            } catch (err) {
                log("Count error: " + err.message);
            }
        }

    } catch (err) {
        log(`FATAL ERROR: ${err.message}`);
    } finally {
        pool.end();
        fs.writeFileSync('finance_output.txt', output);
        console.log("Output saved to finance_output.txt");
    }
}

checkFinance();
