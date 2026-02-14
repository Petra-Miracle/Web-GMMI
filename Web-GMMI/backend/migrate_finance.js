import pool from './src/config/db.js';

async function migrateFinance() {
    try {
        console.log("Starting Migration for Financial Management...");

        // Drop existing table if exists
        await pool.query('DROP TABLE IF EXISTS laporan_keuangan');
        console.log("Dropped old laporan_keuangan table.");

        // Create new table
        await pool.query(`
            CREATE TABLE laporan_keuangan (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                tanggal DATE NOT NULL,
                keterangan TEXT NOT NULL,
                kas_penerimaan NUMERIC(15, 2) DEFAULT 0,
                kas_pengeluaran NUMERIC(15, 2) DEFAULT 0,
                saldo_kas NUMERIC(15, 2) GENERATED ALWAYS AS (0) STORED, -- Placeholder, calculated in query
                bank_debit NUMERIC(15, 2) DEFAULT 0,
                bank_kredit NUMERIC(15, 2) DEFAULT 0,
                saldo_bank NUMERIC(15, 2) GENERATED ALWAYS AS (0) STORED, -- Placeholder
                created_by UUID,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        // Actually, GENERATED ALWAYS AS (0) is useless. I'll remove the stored columns and just calculate them.
        // Re-doing query without those columns.
        await pool.query('DROP TABLE IF EXISTS laporan_keuangan');
        await pool.query(`
            CREATE TABLE laporan_keuangan (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                tanggal DATE NOT NULL,
                keterangan TEXT NOT NULL,
                kas_penerimaan NUMERIC(15, 2) DEFAULT 0,
                kas_pengeluaran NUMERIC(15, 2) DEFAULT 0,
                bank_debit NUMERIC(15, 2) DEFAULT 0,
                bank_kredit NUMERIC(15, 2) DEFAULT 0,
                created_by UUID, -- Optional: link to admin
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        console.log("Created new laporan_keuangan table successfully.");

        // Create index on tanggal for performance
        await pool.query('CREATE INDEX idx_laporan_keuangan_tanggal ON laporan_keuangan(tanggal)');
        console.log("Created index on tanggal.");

    } catch (err) {
        console.error("Migration Failed:", err);
    } finally {
        pool.end();
    }
}

migrateFinance();
