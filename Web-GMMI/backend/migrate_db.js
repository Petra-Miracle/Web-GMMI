import pool from './src/config/db.js';

async function migrate() {
    try {
        console.log('Starting migration...');
        await pool.query(`
            ALTER TABLE announcements 
            ADD COLUMN IF NOT EXISTS created_by INTEGER REFERENCES admins(id)
        `);
        console.log('Migration successful: Column created_by added to announcements table.');
        process.exit(0);
    } catch (error) {
        console.error('Migration failed:', error.message);
        process.exit(1);
    }
}

migrate();
