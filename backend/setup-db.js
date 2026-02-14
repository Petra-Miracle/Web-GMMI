import pkg from 'pg';
import './src/config/env.js';

const { Client } = pkg;

async function setup() {
    const client = new Client({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: String(process.env.DB_PASSWORD),
        port: Number(process.env.DB_PORT) || 5432,
        database: 'postgres' // Connect to default DB
    });

    try {
        await client.connect();
        console.log('Connected to postgres default database');

        const dbName = 'gmmi_bst';
        const checkDb = await client.query(`SELECT 1 FROM pg_database WHERE datname = '${dbName}'`);

        if (checkDb.rows.length === 0) {
            console.log(`Creating database "${dbName}"...`);
            await client.query(`CREATE DATABASE "${dbName}"`);
            console.log(`Database "${dbName}" created successfully.`);
        } else {
            console.log(`Database "${dbName}" already exists.`);
        }

        await client.end();
        process.exit(0);
    } catch (err) {
        console.error('Setup failed:', err.message);
        process.exit(1);
    }
}

setup();
