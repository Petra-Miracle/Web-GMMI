import pool from './src/config/db.js';

async function checkDeps() {
    try {
        const res = await pool.query(`
            SELECT 
                t.relname as table_name, 
                a.attname as column_name
            FROM pg_attribute a
            JOIN pg_class t ON a.attrelid = t.oid
            JOIN pg_type typ ON a.atttypid = typ.oid
            WHERE typ.typname = 'bidang_gereja_enum'
        `);
        console.log('Dependencies:', res.rows);
        process.exit(0);
    } catch (err) {
        console.error('Error:', err.message);
        process.exit(1);
    }
}

checkDeps();
