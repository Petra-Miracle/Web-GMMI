import pkg from 'pg';
const { Pool } = pkg;

async function checkAdmins() {
    const pool = new Pool({
        host: 'localhost',
        user: 'postgres',
        password: 'admin123',
        database: 'gmmi_bst',
        port: 5432,
    });
    try {
        const res = await pool.query('SELECT username FROM admins');
        console.log('Admins in gmmi_bst:', res.rows.map(r => r.username));
    } catch (err) {
        console.error(err);
    } finally {
        await pool.end();
        process.exit();
    }
}

checkAdmins();
