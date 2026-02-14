import pool from './src/config/db.js';

async function checkJemaatData() {
    try {
        // Count total jemaat
        const countResult = await pool.query('SELECT COUNT(*) as total FROM jemaat WHERE deleted_at IS NULL');
        console.log('📊 Total Jemaat:', countResult.rows[0].total);

        // Get latest 20 jemaat
        const jemaatResult = await pool.query(`
            SELECT 
                j.nama, 
                s.nama_sektor, 
                j.pekerjaan, 
                j.kategorial, 
                j.jenis_kelamin,
                j.pendidikan_terakhir,
                j.tempat_lahir,
                TO_CHAR(j.tanggal_lahir, 'DD-MM-YYYY') as tanggal_lahir
            FROM jemaat j
            JOIN sectors s ON j.sektor_id = s.id
            WHERE j.deleted_at IS NULL
            ORDER BY j.created_at DESC
            LIMIT 20
        `);

        console.log('\n' + '='.repeat(100));
        console.log('📋 20 DATA JEMAAT TERBARU:');
        console.log('='.repeat(100));
        console.log('No | Nama                      | Sektor          | Pekerjaan          | L/P | Kategorial | Pendidikan');
        console.log('-'.repeat(100));

        jemaatResult.rows.forEach((row, i) => {
            const no = String(i + 1).padStart(2, ' ');
            const nama = (row.nama || 'N/A').padEnd(25).substring(0, 25);
            const sektor = (row.nama_sektor || 'N/A').padEnd(15).substring(0, 15);
            const pekerjaan = (row.pekerjaan || 'N/A').padEnd(18).substring(0, 18);
            const jk = (row.jenis_kelamin || '-').padEnd(3);
            const kategorial = (row.kategorial || 'N/A').padEnd(10);
            const pendidikan = (row.pendidikan_terakhir || 'N/A').padEnd(10);

            console.log(`${no} | ${nama} | ${sektor} | ${pekerjaan} | ${jk} | ${kategorial} | ${pendidikan}`);
        });

        console.log('='.repeat(100));
        console.log(`\n✅ Berhasil menampilkan ${jemaatResult.rows.length} data jemaat`);

    } catch (error) {
        console.error('❌ Error:', error.message);
    } finally {
        await pool.end();
    }
}

checkJemaatData();
