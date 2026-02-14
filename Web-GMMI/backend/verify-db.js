import pool from './src/config/db.js';

async function verify() {
    try {
        const res = await pool.query('SELECT NOW()');
        console.log('✅ DATABASE CONNECTED:', res.rows[0]);

        const tableCheck = await pool.query("SELECT to_regclass('public.admins')");
        if (tableCheck.rows[0].to_regclass) {
            console.log('✅ TABLE "admins" EXISTS');
        } else {
            console.log('❌ TABLE "admins" DOES NOT EXIST');
            console.log('Creating table...');
            await pool.query(`
        CREATE TABLE IF NOT EXISTS admins (
            id SERIAL PRIMARY KEY,
            nama VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            role VARCHAR(50) CHECK (role IN ('super_admin', 'admin_majelis')) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);
            console.log('✅ TABLE "admins" CREATED SUCCESSFULLY');
        }
        process.exit(0);
    } catch (err) {
        console.error('❌ VERIFICATION FAILED:', err.message);
        process.exit(1);
    }
}

verify();
