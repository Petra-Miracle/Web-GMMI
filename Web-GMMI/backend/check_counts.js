import pkg from 'pg';
const { Pool } = pkg;

async function checkAllCounts() {
    const pool = new Pool({
        host: 'localhost',
        user: 'postgres',
        password: 'admin123',
        database: 'gmmi_bst',
        port: 5432,
    });
    try {
        const tablesRes = await pool.query(`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public'
        `);
        for (const row of tablesRes.rows) {
            const countRes = await pool.query(`SELECT COUNT(*) FROM "${row.table_name}"`);
            console.log(`${row.table_name}: ${countRes.rows[0].count} rows`);
        }
    } catch (err) {
        console.error(err);
    } finally {
        await pool.end();
        process.exit();
    }
}

checkAllCounts();
