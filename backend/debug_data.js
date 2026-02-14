import pool from './src/config/db.js';

async function debugData() {
    try {
        console.log('Fetching all announcements directly from DB...');
        const result = await pool.query('SELECT * FROM announcements');
        console.log(`Found ${result.rows.length} rows.`);
        console.log('Sample rows:', JSON.stringify(result.rows.slice(0, 2), null, 2));

        console.log('Testing the specific query used in controller (with join)...');
        const queryWithJoin = `
            SELECT a.*, admin.nama as author_name 
            FROM announcements a
            LEFT JOIN admins admin ON a.created_by = admin.id
            ORDER BY a.tanggal DESC, a.created_at DESC
        `;
        const resultJoin = await pool.query(queryWithJoin);
        console.log(`Join query returned ${resultJoin.rows.length} rows.`);

        process.exit(0);
    } catch (error) {
        console.error('Debug failed:', error.message);
        process.exit(1);
    }
}

debugData();
