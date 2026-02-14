import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pool from './src/config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function createTable() {
    try {
        const sqlPath = path.join(__dirname, 'sql', 'create_program_table.sql');
        const sql = fs.readFileSync(sqlPath, 'utf8');
        
        console.log('Executing SQL...');
        await pool.query(sql);
        console.log('Table program_kegiatan_gereja created successfully.');
    } catch (error) {
        console.error('Error creating table:', error);
    } finally {
        await pool.end();
    }
}

createTable();
