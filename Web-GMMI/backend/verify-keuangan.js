import pool from './src/config/db.js';

async function verify() {
    try {
        console.log("Verifying Keuangan Table Creation...");
        // 1. Try to get all transactions (should trigger table creation if I was calling the controller, but here I am calling DB directly, wait. The controller creates the table on CREATE, not GET. My controller logic: "Create table if not exists" is in `create` method.)
        // Actually, valid point. `getAll` does NOT create the table. It just returns empty if 42P01.
        // So I should try to INSERT one transaction via the controller logic concept or just call the create logic here.

        // Let's mimic the controller create logic
        await pool.query(`
            CREATE TABLE IF NOT EXISTS transactions (
                id SERIAL PRIMARY KEY,
                type VARCHAR(10) CHECK (type IN ('income', 'expense')),
                amount NUMERIC(15, 2) NOT NULL,
                description TEXT,
                date DATE NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        console.log("Table 'transactions' ensured.");

        // 2. Insert dummy if empty
        const count = await pool.query('SELECT COUNT(*) FROM transactions');
        if (parseInt(count.rows[0].count) === 0) {
            console.log("Inserting initial data...");
            await pool.query("INSERT INTO transactions (type, amount, description, date) VALUES ('income', 1000000, 'Persembahan Awal', NOW())");
        }

        const res = await pool.query('SELECT * FROM transactions');
        console.log("Transactions found:", res.rows.length);
        console.log(res.rows);

        process.exit(0);
    } catch (err) {
        console.error("Verification failed:", err);
        process.exit(1);
    }
}

verify();
