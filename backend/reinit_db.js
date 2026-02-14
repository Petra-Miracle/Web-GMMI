import pool from './src/config/db.js';
import fs from 'fs';
import path from 'path';

async function fullInit() {
    try {
        console.log('--- STARTING DATABASE INITIALIZATION ---');

        // 1. Check current tables
        const tablesRes = await pool.query(`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public'
        `);
        console.log('Current tables:', tablesRes.rows.map(r => r.table_name));

        // 2. Read and execute init_schema.sql
        console.log('Running init_schema.sql...');
        const initSchema = fs.readFileSync('./src/config/init_schema.sql', 'utf8');
        await pool.query(initSchema);
        console.log('init_schema.sql completed.');

        // 3. Read and execute create_program_table.sql
        console.log('Running create_program_table.sql...');
        const programSchema = fs.readFileSync('./sql/create_program_table.sql', 'utf8');
        await pool.query(programSchema);
        console.log('create_program_table.sql completed.');

        // 4. Check tables again
        const tablesResFinal = await pool.query(`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public'
        `);
        console.log('Final tables:', tablesResFinal.rows.map(r => r.table_name));

    } catch (err) {
        console.error('CRITICAL DATABASE ERROR:', err);
    } finally {
        process.exit();
    }
}

fullInit();
