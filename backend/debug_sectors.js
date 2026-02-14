import pkg from 'pg';
const { Client } = pkg;
import dotenv from 'dotenv';
dotenv.config();

const client = new Client({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: String(process.env.DB_PASSWORD),
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT) || 5432,
});

async function run() {
    try {
        await client.connect();
        const res = await client.query('SELECT * FROM sectors');
        console.log('Sectors Count:', res.rows.length);
        if (res.rows.length > 0) {
            console.log('First Sector Keys:', Object.keys(res.rows[0]));
            console.log('Sample Data:', JSON.stringify(res.rows[0]));
        }
    } catch (err) {
        console.error(err);
    } finally {
        await client.end();
    }
}

run();
