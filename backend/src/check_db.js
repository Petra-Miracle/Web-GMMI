import pool from './config/db.js';

async function checkDb() {
    try {
        const tableCheck = await pool.query(`
            SELECT EXISTS (
                SELECT FROM information_schema.tables 
                WHERE table_name = 'sejarah'
            );
        `);
        console.log("Sejarah Table Exists:", tableCheck.rows[0].exists);

        if (tableCheck.rows[0].exists) {
            const count = await pool.query("SELECT COUNT(*) FROM sejarah");
            console.log("Sejarah count:", count.rows[0].count);
        }

        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

checkDb();
