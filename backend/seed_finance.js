import pool from './src/config/db.js';

async function seedFinance() {
    try {
        console.log("Seeding Finance Data (Testing Mode)...");

        // Clear existing data
        await pool.query('DELETE FROM laporan_keuangan');
        console.log("Cleared existing data.");

        const transactions = [
            // Saldo Awal
            {
                tanggal: '2024-02-01',
                keterangan: 'Saldo Awal Kas Bulan Februari',
                kas_penerimaan: 5000000,
                kas_pengeluaran: 0,
                bank_debit: 0,
                bank_kredit: 0
            },
            {
                tanggal: '2024-02-01',
                keterangan: 'Saldo Awal Rekening Bank Februari',
                kas_penerimaan: 0,
                kas_pengeluaran: 0,
                bank_debit: 15000000,
                bank_kredit: 0
            },
            // Minggu 1
            {
                tanggal: '2024-02-04',
                keterangan: 'Kolekte Ibadah Raya Minggu 1',
                kas_penerimaan: 2500000,
                kas_pengeluaran: 0,
                bank_debit: 0,
                bank_kredit: 0
            },
            {
                tanggal: '2024-02-05',
                keterangan: 'Pembayaran Tagihan Listrik & Air Gereja',
                kas_penerimaan: 0,
                kas_pengeluaran: 750000,
                bank_debit: 0,
                bank_kredit: 0
            },
            // Transfer Masuk
            {
                tanggal: '2024-02-07',
                keterangan: 'Persembahan Syukur Bpk. Budi via Transfer',
                kas_penerimaan: 0,
                kas_pengeluaran: 0,
                bank_debit: 1000000,
                bank_kredit: 0
            },
            // Operasional
            {
                tanggal: '2024-02-10',
                keterangan: 'Konsumsi Rapat Majelis',
                kas_penerimaan: 0,
                kas_pengeluaran: 300000,
                bank_debit: 0,
                bank_kredit: 0
            },
            // Minggu 2
            {
                tanggal: '2024-02-11',
                keterangan: 'Kolekte Ibadah Raya Minggu 2',
                kas_penerimaan: 2800000,
                kas_pengeluaran: 0,
                bank_debit: 0,
                bank_kredit: 0
            },
            // Bank Keluar
            {
                tanggal: '2024-02-12',
                keterangan: 'Service & Maintenance AC (Transfer Vendor)',
                kas_penerimaan: 0,
                kas_pengeluaran: 0,
                bank_debit: 0,
                bank_kredit: 1500000
            },
            // Kas Keluar Diakonia
            {
                tanggal: '2024-02-14',
                keterangan: 'Bantuan Diakonia Sakit (Ibu Susi)',
                kas_penerimaan: 0,
                kas_pengeluaran: 500000,
                bank_debit: 0,
                bank_kredit: 0
            },
            // Bank Bunga
            {
                tanggal: '2024-02-15',
                keterangan: 'Bunga Bank Bulan Februari',
                kas_penerimaan: 0,
                kas_pengeluaran: 0,
                bank_debit: 25000,
                bank_kredit: 0
            }
        ];

        for (const tx of transactions) {
            await pool.query(
                `INSERT INTO laporan_keuangan (tanggal, keterangan, kas_penerimaan, kas_pengeluaran, bank_debit, bank_kredit) 
                 VALUES ($1, $2, $3, $4, $5, $6)`,
                [tx.tanggal, tx.keterangan, tx.kas_penerimaan, tx.kas_pengeluaran, tx.bank_debit, tx.bank_kredit]
            );
        }

        console.log(`Successfully seeded ${transactions.length} finance records.`);

    } catch (err) {
        console.error("Seeding Failed:", err);
    } finally {
        pool.end();
    }
}

seedFinance();
