import pool from './src/config/db.js';

async function recreateTable() {
    const dropQuery = "DROP TABLE IF EXISTS renungan_mingguan";
    const createQuery = `
    CREATE TABLE renungan_mingguan (
      id SERIAL PRIMARY KEY,
      judul VARCHAR(255) NOT NULL,
      isi TEXT NOT NULL,
      tanggal DATE DEFAULT CURRENT_DATE,
      gambar VARCHAR(255),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
    try {
        await pool.query(dropQuery);
        console.log("Table renungan_mingguan dropped.");
        await pool.query(createQuery);
        console.log("Table renungan_mingguan created successfully with 'gambar' column.");
    } catch (err) {
        console.error("Error recreating table:", err);
    } finally {
        await pool.end();
    }
}

recreateTable();
