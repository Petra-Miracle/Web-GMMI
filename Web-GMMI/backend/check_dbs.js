import pkg from 'pg';
const { Pool } = pkg;

async function checkMultipleDbs() {
    const dbs = ['gmmi-bst', 'gmmi', 'postgres'];
    for (const dbName of dbs) {
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
        } catch (err) {
            console.log(`Database ${dbName} does not exist or error:`, err.message);
        } finally {
            await pool.end();
        }
    }
}

checkMultipleDbs();
