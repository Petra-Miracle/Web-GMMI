import pkg from 'pg';
import './src/config/env.js';
const { Client } = pkg;

async function checkUnderscoreDb() {
    const client = new Client({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: String(process.env.DB_PASSWORD),
        port: Number(process.env.DB_PORT) || 5432,
        database: 'gmmi_bst'
    });

    try {
        await client.connect();
        const res = await client.query("SELECT * FROM admins");
        console.log('Admins in gmmi_bst:', res.rows);
        await client.end();
        process.exit(0);
    } catch (err) {
        console.error('Failed in gmmi_bst:', err.message);
        process.exit(1);
    }
}

checkUnderscoreDb();
