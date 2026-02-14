import pkg from 'pg';
const { Pool } = pkg;

async function checkColumns() {
    const pool = new Pool({
        host: 'localhost',
        user: 'postgres',
        password: 'admin123',
        database: 'gmmi_bst',
        port: 5432,
    });
    try {
        const res = await pool.query(`
            SELECT column_name 
            FROM information_schema.columns 
            WHERE table_name = 'admins'
        `);
        console.log('Columns in admins table:', res.rows.map(r => r.column_name));
    } catch (err) {
        console.error(err);
    } finally {
        await pool.end();
        process.exit();
    }
}

checkColumns();
