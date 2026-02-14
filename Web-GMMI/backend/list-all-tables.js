import pool from './src/config/db.js';

async function listAllTables() {
    try {
        const res = await pool.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'");
        console.log('Tables in gmmi-bst:', res.rows.map(row => row.table_name));
        process.exit(0);
    } catch (err) {
        console.error('Failed:', err.message);
        process.exit(1);
    }
}

listAllTables();
