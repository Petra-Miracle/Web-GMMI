
import pool from './config/db.js';

async function createSejarahTable() {
    try {
        const query = `
            CREATE TABLE IF NOT EXISTS sejarah (
                id SERIAL PRIMARY KEY,
                judul VARCHAR(255) NOT NULL,
                tanggal_peristiwa DATE NOT NULL,
                deskripsi TEXT,
                gambar_url TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `;
        await pool.query(query);
        console.log("Sejarah table created successfully (if not exists)");
        process.exit(0);
    } catch (err) {
        console.error("Error creating sejarah table:", err);
        process.exit(1);
    }
}

createSejarahTable();
