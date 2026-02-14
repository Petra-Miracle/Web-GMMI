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
        const res = await client.query("SELECT table_name, column_name, data_type, is_nullable FROM information_schema.columns WHERE table_name IN ('jemaat', 'jemaat_sakramen')");
        console.log('Columns:', JSON.stringify(res.rows, null, 2));
    } catch (err) {
        console.error(err);
    } finally {
        await client.end();
    }
}

run();
