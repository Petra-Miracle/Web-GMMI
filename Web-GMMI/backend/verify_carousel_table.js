import pool from './src/config/db.js';

async function verifyTable() {
    try {
        const res = await pool.query("SELECT * FROM carousel_slides ORDER BY order_index ASC");
        console.log("Carousel Slides in Database:");
        console.table(res.rows);
    } catch (err) {
        console.error("Error verifying table:", err);
    } finally {
        await pool.end();
    }
}

verifyTable();
