import pkg from 'pg';
const { Pool } = pkg;

async function checkPrograms() {
    const pool = new Pool({
        host: 'localhost',
        user: 'postgres',
        password: 'admin123',
        database: 'gmmi_bst',
        port: 5432,
    });
    try {
        const res = await pool.query('SELECT nama_program FROM program_kegiatan_gereja');
        console.log(res.rows.map(r => r.nama_program));
    } catch (err) {
        console.error(err);
    } finally {
        await pool.end();
        process.exit();
    }
}

checkPrograms();
