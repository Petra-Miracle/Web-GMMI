import pkg from 'pg';
const { Pool } = pkg;

async function checkDetails() {
    const pool = new Pool({
        host: 'localhost',
        user: 'postgres',
        password: 'admin123',
        database: 'gmmi_bst',
        port: 5432,
    });
    try {
        const res = await pool.query(`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public'
        `);
        console.log('Tables in gmmi_bst:', res.rows.map(r => r.table_name));

        // Check program data
        const progData = await pool.query('SELECT bidang, nama_program FROM program_kegiatan_gereja');
        console.log('Program Data:', progData.rows);
    } catch (err) {
        console.error(err);
    } finally {
        await pool.end();
        process.exit();
    }
}

checkDetails();
