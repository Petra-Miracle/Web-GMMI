import pkg from 'pg';
const { Pool } = pkg;

async function checkPewartaan() {
    const pool = new Pool({
        host: 'localhost',
        user: 'postgres',
        password: 'admin123',
        database: 'gmmi_bst',
        port: 5432,
    });
    try {
        const res = await pool.query('SELECT judul, status FROM pewartaan');
        console.log(`Pewartaan in gmmi_bst: ${res.rows.length}`);
        console.table(res.rows);
    } catch (err) {
        console.error(err);
    } finally {
        await pool.end();
        process.exit();
    }
}

checkPewartaan();
