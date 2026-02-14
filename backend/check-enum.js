import pool from './src/config/db.js';

async function checkEnum() {
    try {
        const res = await pool.query("SELECT typname, enumlabel FROM pg_enum e JOIN pg_type t ON e.enumtypid = t.oid WHERE t.typname = 'bidang_gereja_enum'");
        console.log('Enum labels:', res.rows.map(r => r.enumlabel));
        process.exit(0);
    } catch (err) {
        console.error('Error:', err.message);
        process.exit(1);
    }
}

checkEnum();
