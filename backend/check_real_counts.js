import pool from './src/config/db.js';

async function checkCounts() {
    try {
        console.log("Checking table counts...");

        const tables = [
            'pewartaan', 'warta', 'warta_ibadah', // Check variants
            'announcements', 'pengumuman', // Check variants
            'agenda', 'jadwal_pelayanan', // Check variants
            'program_kegiatan_gereja',
            'renungan_mingguan'
        ];

        for (const table of tables) {
            try {
                const res = await pool.query(`SELECT COUNT(*) FROM ${table}`);
                console.log(`${table}: ${res.rows[0].count}`);
            } catch (err) {
                console.log(`${table}: ERROR/NOT FOUND (${err.message})`);
            }
        }

        console.log("\nChecking recent activity queries...");

        // Test query for Agenda activity
        try {
            const recentAgenda = await pool.query("SELECT id, 'agenda' as type, kegiatan as title, created_at as date FROM agenda ORDER BY created_at DESC LIMIT 5");
            console.log(`Recent Agenda: ${recentAgenda.rows.length} items Found`);
            if (recentAgenda.rows.length > 0) console.log(recentAgenda.rows[0]);
        } catch (err) {
            console.log(`Recent Agenda Query Failed: ${err.message}`);
        }

    } catch (err) {
        console.error(err);
    } finally {
        pool.end();
    }
}

checkCounts();
