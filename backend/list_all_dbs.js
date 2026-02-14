import pkg from 'pg';
const { Pool } = pkg;

async function listDbs() {
    const pool = new Pool({
        host: 'localhost',
        user: 'postgres',
        password: 'admin123',
        database: 'postgres',
        port: 5432,
    });
    try {
        const res = await pool.query('SELECT datname FROM pg_database WHERE datistemplate = false');
        console.log('Databases:', res.rows.map(r => r.datname));
    } catch (err) {
        console.error(err);
    } finally {
        await pool.end();
        process.exit();
    }
}

listDbs();
