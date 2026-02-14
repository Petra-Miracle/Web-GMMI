import pool from './src/config/db.js';

const VALID_PEKERJAAN = [
    'Buruh',
    'Petani',
    'Nelayan',
    'PNS',
    'TNI / POLRI',
    'Guru / Dosen',
    'Tenaga Kesehatan',
    'Rohaniawan',
    'Lainnya'
];

const PENDIDIKAN = [
    'TK',
    'SD',
    'SMP',
    'SMA',
    'S1',
    'S2',
    'S3'
];

const KATEGORIAL = [
    'P_PRIA',      // Persekutuan Pria
    'P_WANITA',    // Persekutuan Wanita
    'AMMI',        // Anak-anak
    'ARMI',        // Remaja
    'SM'           // Sekolah Minggu
];

const JENIS_KELAMIN = ['L', 'P'];

const NAMA_PRIA = [
    'Andreas Sitorus',
    'David Panjaitan',
    'Eliezer Hutabarat',
    'Gabriel Simanjuntak',
    'Hosea Sinaga',
    'Immanuel Siahaan',
    'Jeremia Manurung',
    'Kaleb Simbolon',
    'Lukas Tampubolon',
    'Mikael Simatupang',
    'Nathanael Pardede',
    'Obaja Situmorang',
    'Petrus Sihombing',
    'Rafael Nababan',
    'Samuel Hutapea'
];

const NAMA_WANITA = [
    'Debora Sitorus',
    'Ester Panjaitan',
    'Hana Hutabarat',
    'Lea Simanjuntak',
    'Maria Sinaga',
    'Naomi Siahaan',
    'Rut Manurung',
    'Sara Simbolon',
    'Tabita Tampubolon',
    'Tirza Simatupang'
];

const TEMPAT_LAHIR = [
    'Medan',
    'Pematang Siantar',
    'Tarutung',
    'Balige',
    'Sibolga',
    'Padang Sidempuan',
    'Tanjung Balai',
    'Binjai',
    'Tebing Tinggi',
    'Jakarta'
];

// Fungsi untuk mendapatkan random item dari array
function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// Fungsi untuk mendapatkan tanggal lahir random
function getRandomBirthDate(kategorial) {
    const today = new Date();
    let minAge, maxAge;

    switch (kategorial) {
        case 'SM':      // Sekolah Minggu
        case 'AMMI':    // Anak-anak
            minAge = 5;
            maxAge = 12;
            break;
        case 'ARMI':    // Remaja
            minAge = 13;
            maxAge = 17;
            break;
        case 'P_PRIA':  // Persekutuan Pria
        case 'P_WANITA': // Persekutuan Wanita
            minAge = 25;
            maxAge = 70;
            break;
        default:
            minAge = 20;
            maxAge = 60;
    }

    const age = Math.floor(Math.random() * (maxAge - minAge + 1)) + minAge;
    const birthYear = today.getFullYear() - age;
    const birthMonth = Math.floor(Math.random() * 12) + 1;
    const birthDay = Math.floor(Math.random() * 28) + 1;

    return `${birthYear}-${String(birthMonth).padStart(2, '0')}-${String(birthDay).padStart(2, '0')}`;
}

async function seedJemaat() {
    const client = await pool.connect();

    try {
        console.log('🚀 Memulai seeding data jemaat...\n');

        // Ambil semua sektor yang tersedia
        const sectorResult = await client.query('SELECT id, nama_sektor FROM sectors ORDER BY nama_sektor ASC');
        const sectors = sectorResult.rows;

        if (sectors.length === 0) {
            console.error('❌ Tidak ada sektor yang tersedia. Silakan buat sektor terlebih dahulu.');
            return;
        }

        console.log(`✅ Ditemukan ${sectors.length} sektor:`);
        sectors.forEach((s, i) => console.log(`   ${i + 1}. ${s.nama_sektor}`));
        console.log('');

        let successCount = 0;
        let failCount = 0;

        // Generate 20 data jemaat
        for (let i = 0; i < 20; i++) {
            await client.query('BEGIN');

            try {
                const jenisKelamin = getRandomItem(JENIS_KELAMIN);
                const nama = jenisKelamin === 'L' ? getRandomItem(NAMA_PRIA) : getRandomItem(NAMA_WANITA);
                const sektor = getRandomItem(sectors);
                const pendidikan = getRandomItem(PENDIDIKAN);
                const pekerjaan = getRandomItem(VALID_PEKERJAAN);
                const kategorial = getRandomItem(KATEGORIAL);
                const tempatLahir = getRandomItem(TEMPAT_LAHIR);
                const tanggalLahir = getRandomBirthDate(kategorial);
                const keterangan = `Data testing jemaat ke-${i + 1}`;

                // Sakramen random
                const bpts = Math.random() > 0.3; // 70% sudah BPTS
                const sidi = Math.random() > 0.5; // 50% sudah SIDI
                const nikah = (kategorial === 'P_PRIA' || kategorial === 'P_WANITA') ? Math.random() > 0.4 : false;
                const meninggal = false;

                // Insert jemaat
                const jemaatQuery = `
                    INSERT INTO jemaat (nama, sektor_id, pendidikan_terakhir, pekerjaan, kategorial, keterangan, jenis_kelamin, tempat_lahir, tanggal_lahir)
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
                    RETURNING id
                `;
                const jemaatRes = await client.query(jemaatQuery, [
                    nama, sektor.id, pendidikan, pekerjaan, kategorial, keterangan,
                    jenisKelamin, tempatLahir, tanggalLahir
                ]);
                const jemaatId = jemaatRes.rows[0].id;

                // Insert sakramen
                const sakramenQuery = `
                    INSERT INTO jemaat_sakramen (jemaat_id, bpts, sidi, nikah, meninggal)
                    VALUES ($1, $2, $3, $4, $5)
                `;
                await client.query(sakramenQuery, [
                    jemaatId, bpts, sidi, nikah, meninggal
                ]);

                await client.query('COMMIT');
                successCount++;
                console.log(`✅ [${successCount}/20] ${nama} - ${sektor.nama_sektor} - ${pekerjaan}`);

            } catch (error) {
                await client.query('ROLLBACK');
                failCount++;
                console.error(`❌ [Error ${failCount}] Gagal insert data ke-${i + 1}:`, error.message);
            }
        }

        console.log('\n' + '='.repeat(60));
        console.log(`🎉 Seeding selesai!`);
        console.log(`   ✅ Berhasil: ${successCount} data`);
        console.log(`   ❌ Gagal: ${failCount} data`);
        console.log('='.repeat(60));

    } catch (error) {
        console.error('❌ Error saat seeding:', error);
    } finally {
        client.release();
        await pool.end();
    }
}

// Jalankan seeding
seedJemaat();
