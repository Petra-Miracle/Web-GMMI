import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pool from './src/config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function initDb() {
    try {
        console.log('Starting Database Initialization in gmmi_bst...');

        const sqlFiles = [
            path.join(__dirname, 'sql', 'create_admins_table.sql'),
            path.join(__dirname, 'src', 'config', 'init_schema.sql'),
            path.join(__dirname, 'sql', 'create_program_table.sql'),
            path.join(__dirname, 'sql', 'create_sejarah_table.sql')
        ];

        for (const file of sqlFiles) {
            console.log(`Executing ${path.basename(file)}...`);
            const sql = fs.readFileSync(file, 'utf8');
            await pool.query(sql);
            console.log(`${path.basename(file)} executed successfully.`);
        }

        // Add is_active column if it doesn't exist (expected by AdminController)
        console.log('Checking for is_active column in admins table...');
        await pool.query(`
            DO $$ 
            BEGIN 
                IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='admins' AND column_name='is_active') THEN
                    ALTER TABLE admins ADD COLUMN is_active BOOLEAN DEFAULT true;
                END IF;
            END $$;
        `);
        console.log('Column is_active checked/added.');

        // Add missing columns to warta table (tempat_jemaat, tema_khotbah)
        console.log('Checking for missing columns in warta table...');
        await pool.query(`
            DO $$ 
            BEGIN 
                IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='warta' AND column_name='tempat_jemaat') THEN
                    ALTER TABLE warta ADD COLUMN tempat_jemaat VARCHAR(100) DEFAULT 'GMMI Pusat';
                END IF;

                IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='warta' AND column_name='tema_khotbah') THEN
                    ALTER TABLE warta ADD COLUMN tema_khotbah VARCHAR(255);
                END IF;
            END $$;
        `);
        console.log('Columns tempat_jemaat & tema_khotbah checked/added.');

        console.log('Database Initialization Completed Successfully.');
        process.exit(0);
    } catch (error) {
        console.error('Database Initialization Failed:', error);
        process.exit(1);
    }
}

initDb();
