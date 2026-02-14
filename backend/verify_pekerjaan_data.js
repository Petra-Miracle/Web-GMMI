import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
});

async function verifyPekerjaanData() {
    const client = await pool.connect();
    try {
        console.log('🔍 Verifying Pekerjaan Data...\n');

        // Check pekerjaan table
        const pekerjaanResult = await client.query('SELECT * FROM pekerjaan ORDER BY nama_pekerjaan');
        console.log(`✅ Found ${pekerjaanResult.rows.length} pekerjaan in database:`);
        pekerjaanResult.rows.forEach((p, i) => {
            console.log(`   ${i + 1}. ${p.nama_pekerjaan} (ID: ${p.id})`);
        });

        // Check jemaat table structure
        console.log('\n🔍 Checking jemaat table structure...');
        const columnsResult = await client.query(`
            SELECT column_name, data_type 
            FROM information_schema.columns 
            WHERE table_name = 'jemaat' 
            AND column_name IN ('pekerjaan', 'pekerjaan_id')
            ORDER BY column_name
        `);

        console.log('✅ Jemaat table columns:');
        columnsResult.rows.forEach(col => {
            console.log(`   - ${col.column_name}: ${col.data_type}`);
        });

        // Check sample jemaat data with JOIN
        console.log('\n🔍 Sample jemaat data with pekerjaan:');
        const sampleResult = await client.query(`
            SELECT j.nama, p.nama_pekerjaan 
            FROM jemaat j
            LEFT JOIN pekerjaan p ON j.pekerjaan_id = p.id
            LIMIT 5
        `);

        if (sampleResult.rows.length > 0) {
            console.log('✅ Sample data:');
            sampleResult.rows.forEach((row, i) => {
                console.log(`   ${i + 1}. ${row.nama} → ${row.nama_pekerjaan || '(belum diset)'}`);
            });
        } else {
            console.log('ℹ️  No jemaat data yet');
        }

        console.log('\n✅ Database verification complete!');
    } catch (error) {
        console.error('❌ Error:', error.message);
    } finally {
        client.release();
        await pool.end();
    }
}

verifyPekerjaanData();
