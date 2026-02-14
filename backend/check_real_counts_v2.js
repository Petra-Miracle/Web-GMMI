import pool from './src/config/db.js';
import fs from 'fs';

async function checkCounts() {
    let output = '';
    const log = (msg) => { output += msg + '\n'; console.log(msg); };

    try {
        log("Checking table counts...");

        const possibleTables = [
            'pewartaan',          // Likely main one for weekly news
            'warta',              // Old name? Or alias?
            'warta_ibadah',       // Specific one?
            'announcements',      // Likely for pengumuman
            'pengumuman',         // Indonesian variant?
            'agenda',             // Confirmed seeded
            'jadwal_pelayanan',   // Old schema?
            'program_kegiatan_gereja', // Confirmed
            'renungan_mingguan'   // Confirmed
        ];

        for (const table of possibleTables) {
            try {
                // Check if table exists first to avoid crashing loop on "relation does not exist"
                const exists = await pool.query(
                    "SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = $1)",
                    [table]
                );

                if (exists.rows[0].exists) {
                    const res = await pool.query(`SELECT COUNT(*) FROM ${table}`);
                    log(`${table}: ${res.rows[0].count}`);
                } else {
                    log(`${table}: NOT FOUND (Table Missing)`);
                }
            } catch (err) {
                log(`${table}: QUERY ERROR (${err.message})`);
            }
        }

        fs.writeFileSync('counts_output.txt', output);
        log("Output saved to counts_output.txt");

    } catch (err) {
        log(`FATAL ERROR: ${err.message}`);
    } finally {
        pool.end();
    }
}

checkCounts();
