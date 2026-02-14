import pool from './src/config/db.js';

const createTable = async () => {
    try {
        const queryText = `
      CREATE TABLE IF NOT EXISTS aktivitas (
        id SERIAL PRIMARY KEY,
        admin_id INTEGER,
        admin_nama VARCHAR(100),
        aksi VARCHAR(50),
        modul VARCHAR(50),
        detail TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
        await pool.query(queryText);
        console.log('Table "aktivitas" created successfully or already exists.');
        process.exit(0);
    } catch (err) {
        console.error('Error creating table:', err);
        process.exit(1);
    }
};

createTable();
