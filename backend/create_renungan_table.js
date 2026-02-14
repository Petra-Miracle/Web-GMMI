import pool from './src/config/db.js';

async function createTable() {
    const query = `
    CREATE TABLE IF NOT EXISTS renungan_mingguan (
      id SERIAL PRIMARY KEY,
      judul VARCHAR(255) NOT NULL,
      isi TEXT NOT NULL,
      tanggal DATE DEFAULT CURRENT_DATE,
      gambar VARCHAR(255),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
    try {
        await pool.query(query);
        console.log("Table renungan_mingguan created successfully (or already exists).");
    } catch (err) {
        console.error("Error creating table:", err);
    } finally {
        await pool.end();
    }
}

createTable();
