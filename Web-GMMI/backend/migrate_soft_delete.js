import pool from './src/config/db.js';

async function migrate() {
    try {
        console.log('Starting migration...');
        await pool.query('ALTER TABLE jemaat ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMP NULL');
        console.log('Column deleted_at added to jemaat table.');
    } catch (error) {
        console.error('Migration failed:', error.message);
    } finally {
        pool.end();
    }
}

migrate();
