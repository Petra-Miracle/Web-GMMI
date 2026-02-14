import pool from './src/config/db.js';

const renunganData = [
    {
        judul: 'Hidup dalam Pengharapan',
        isi: 'Pengharapan kita di dalam Kristus tidak akan pernah mengecewakan. Mari kita terus berpegang teguh pada janji-janji-Nya yang setia.',
        tanggal: '2024-03-03',
        gambar: null
    },
    {
        judul: 'Kekuatan Doa',
        isi: 'Doa adalah nafas hidup orang percaya. Ketika kita berdoa, Tuhan bekerja. Jangan pernah meremehkan kuasa doa yang dinaikkan dengan iman.',
        tanggal: '2024-03-10',
        gambar: null
    },
    {
        judul: 'Kasih yang Mengampuni',
        isi: 'Tuhan mengajarkan kita untuk mengampuni sesama seperti Dia telah mengampuni kita. Pengampunan membebaskan hati dari beban kepahitan.',
        tanggal: '2024-03-17',
        gambar: null
    },
    {
        judul: 'Melayani dengan Hati',
        isi: 'Pelayanan yang sejati lahir dari hati yang mengasihi Tuhan. Apapun yang kita lakukan, lakukanlah seperti untuk Tuhan dan bukan untuk manusia.',
        tanggal: '2024-03-24',
        gambar: null
    },
    {
        judul: 'Paskah: Kemenangan atas Maut',
        isi: 'Kebangkitan Kristus memberikan kita jaminan keselamatan dan hidup yang kekal. Mari rayakan kemenangan ini setiap hari.',
        tanggal: '2024-03-31',
        gambar: null
    },
    {
        judul: 'Buah Roh: Kesabaran',
        isi: 'Kesabaran adalah tanda kedewasaan rohani. Di tengah ujian, mari kita belajar untuk sabar menantikan waktunya Tuhan yang sempurna.',
        tanggal: '2024-04-07',
        gambar: null
    },
    {
        judul: 'Terang dan Garam Dunia',
        isi: 'Kita dipanggil untuk menjadi terang di tengah kegelapan dan garam yang memberi rasa. Biarlah hidup kita menjadi saksi bagi kemuliaan-Nya.',
        tanggal: '2024-04-14',
        gambar: null
    },
    {
        judul: 'Iman yang Bertumbuh',
        isi: 'Iman bukanlah sesuatu yang statis. Melalui firman dan pengalaman hidup bersama Tuhan, iman kita akan terus bertumbuh semakin kuat.',
        tanggal: '2024-04-21',
        gambar: null
    },
    {
        judul: 'Bersyukur dalam Segala Hal',
        isi: 'Ucapkanlah syukur senantiasa. Hati yang bersyukur adalah kunci kebahagiaan sejati, terlepas dari situasi yang kita hadapi.',
        tanggal: '2024-04-28',
        gambar: null
    },
    {
        judul: 'Panggilan untuk Memberitakan Injil',
        isi: 'Amanat Agung adalah tugas kita bersama. Mari wartakan kasih Kristus kepada dunia melalui perkataan dan perbuatan kita.',
        tanggal: '2024-05-05',
        gambar: null
    }
];

async function seed() {
    try {
        for (const data of renunganData) {
            await pool.query(
                'INSERT INTO renungan_mingguan (judul, isi, tanggal, gambar) VALUES ($1, $2, $3, $4)',
                [data.judul, data.isi, data.tanggal, data.gambar]
            );
        }
        console.log('Successfully seeded 10 renungan items.');
    } catch (error) {
        console.error('Error seeding data:', error);
    } finally {
        // End the pool to allow the script to exit
        await pool.end();
    }
}

seed();
