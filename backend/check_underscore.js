import pkg from 'pg';
const { Pool } = pkg;

async function checkUnderscoreDb() {
    const dbName = 'gmmi_bst';
    console.log(`Checking database: ${dbName}`);
    const pool = new Pool({
        host: 'localhost',
        user: 'postgres',
        password: 'admin123',
        database: dbName,
        port: 5432,
    });
    try {
        const res = await pool.query(`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public'
        `);
        console.log(`Tables in ${dbName}:`, res.rows.map(r => r.table_name));

        if (res.rows.some(r => r.table_name === 'program_kegiatan_gereja')) {
            const data = await pool.query('SELECT COUNT(*) FROM program_kegiatan_gereja');
            console.log(`FOUND ${data.rows[0].count} PROGRAMS IN ${dbName}`);
        }
    } catch (err) {
        console.log(`Database ${dbName} does not exist or error:`, err.message);
    } finally {
        await pool.end();
        process.exit();
    }
}

checkUnderscoreDb();
