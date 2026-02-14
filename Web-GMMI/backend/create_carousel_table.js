import pool from './src/config/db.js';

async function createAndSeedTable() {
    const createTableQuery = `
    CREATE TABLE IF NOT EXISTS carousel_slides (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        subtitle TEXT,
        quote TEXT,
        badge VARCHAR(255),
        image_url VARCHAR(255) NOT NULL,
        cta_text VARCHAR(100),
        cta_link VARCHAR(255),
        order_index INTEGER DEFAULT 0,
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    `;

    const seedData = [
        {
            title: "Gereja Masehi Musafir Indonesia",
            subtitle: "Bersatu dalam kasih, bertumbuh dalam iman, dan melayani dengan segenap hati untuk kemuliaan nama Tuhan.",
            quote: "Kasihilah Tuhan, Allahmu, dengan segenap hatimu dan dengan segenap jiwamu dan dengan segenap akal budimu. (Matius 22:37)",
            badge: "Selamat Datang di Keluarga Allah",
            image_url: "/img/Carousel 1.jpeg",
            cta_text: "Jadwal Ibadah",
            cta_link: "/jadwal",
            order_index: 1
        },
        {
            title: "Persekutuan & Kasih Persaudaraan",
            subtitle: "Mengalami kehadiran Tuhan melalui ibadah yang transformatif dan persekutuan yang hangat.",
            quote: "Sebab di mana dua atau tiga orang berkumpul dalam Nama-Ku, di situ Aku ada di tengah-tengah mereka. (Matius 18:20)",
            badge: "Ibadah Setiap Minggu",
            image_url: "/img/Carousel 2.jpeg",
            cta_text: "Hubungi Kami",
            cta_link: "/kontak",
            order_index: 2
        },
        {
            title: "Melayani Generasi Bagi Kemuliaan Tuhan",
            subtitle: "Mempersiapkan setiap jemaat untuk menjadi berkat di tengah-tengah dunia melalui talenta setiap pribadi.",
            quote: "Segala perkara dapat kutanggung di dalam Dia yang memberi kekuatan kepadaku. (Filipi 4:13)",
            badge: "Program Pelayanan",
            image_url: "/img/Carousel 3.jpeg",
            cta_text: "Lihat Program",
            cta_link: "#program",
            order_index: 3
        }
    ];

    try {
        console.log("Checking and creating carousel_slides table...");
        await pool.query(createTableQuery);
        console.log("Table created successfully or already exists.");

        // Check if data already exists
        const countRes = await pool.query("SELECT COUNT(*) FROM carousel_slides");
        if (parseInt(countRes.rows[0].count) === 0) {
            console.log("Seeding initial data...");
            for (const slide of seedData) {
                await pool.query(
                    `INSERT INTO carousel_slides (title, subtitle, quote, badge, image_url, cta_text, cta_link, order_index) 
                     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
                    [slide.title, slide.subtitle, slide.quote, slide.badge, slide.image_url, slide.cta_text, slide.cta_link, slide.order_index]
                );
            }
            console.log("Seeding completed.");
        } else {
            console.log("Table already has data, skipping seed.");
        }

    } catch (err) {
        console.error("Error:", err);
    } finally {
        await pool.end();
    }
}

createAndSeedTable();
