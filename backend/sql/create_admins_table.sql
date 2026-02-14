CREATE TABLE IF NOT EXISTS admins (
    id SERIAL PRIMARY KEY,
    nama VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role VARCHAR(50) CHECK (role IN ('super_admin', 'admin_majelis')) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);