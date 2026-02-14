import pool from './src/config/db.js';

const migrate = async () => {
    try {
        console.log('Adding columns to jemaat table...');

        // Add jenis_kelamin
        await pool.query(`
            ALTER TABLE jemaat 
            ADD COLUMN IF NOT EXISTS jenis_kelamin VARCHAR(10),
            ADD COLUMN IF NOT EXISTS tempat_lahir VARCHAR(100),
            ADD COLUMN IF NOT EXISTS tanggal_lahir DATE;
        `);

        console.log('Migration successful!');
    } catch (error) {
        console.error('Migration failed:', error);
    } finally {
        process.exit();
    }
};

migrate();
