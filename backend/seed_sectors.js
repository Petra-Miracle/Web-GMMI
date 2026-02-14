import pool from './src/config/db.js';

const seedSectors = async () => {
    const sectors = [
        { nama: 'Sektor 1', alamat: 'Wilayah 1', no_hp: '-' },
        { nama: 'Sektor 2', alamat: 'Wilayah 2', no_hp: '-' },
        { nama: 'Sektor 3', alamat: 'Wilayah 3', no_hp: '-' },
        { nama: 'Sektor 4', alamat: 'Wilayah 4', no_hp: '-' },
        { nama: 'Sektor 5', alamat: 'Wilayah 5', no_hp: '-' },
        { nama: 'Sektor 6', alamat: 'Wilayah 6', no_hp: '-' },
        { nama: 'Sektor 7', alamat: 'Wilayah 7', no_hp: '-' },
    ];

    try {
        console.log('Seeding sectors...');
        for (const sector of sectors) {
            const check = await pool.query('SELECT id FROM sectors WHERE nama_sektor = $1', [sector.nama]);
            if (check.rows.length === 0) {
                await pool.query(
                    'INSERT INTO sectors (nama_sektor, alamat, no_hp) VALUES ($1, $2, $3)',
                    [sector.nama, sector.alamat, sector.no_hp]
                );
                console.log(`Inserted: ${sector.nama}`);
            } else {
                console.log(`Already exists: ${sector.nama}`);
            }
        }

        const allSectors = await pool.query('SELECT * FROM sectors');
        console.log('Current Sectors in DB:', allSectors.rows.length);
        console.log('Seeding completed successfully!');
    } catch (error) {
        console.error('Error seeding sectors:', error);
    } finally {
        process.exit();
    }
};

seedSectors();
