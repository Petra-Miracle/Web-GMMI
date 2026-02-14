import pool from './src/config/db.js';
import fs from 'fs';

async function checkTables() {
    try {
        const tables = await pool.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
    `);
        let output = 'Tables: ' + JSON.stringify(tables.rows.map(r => r.table_name), null, 2) + '\n';

        const checkAgenda = await pool.query("SELECT * FROM information_schema.tables WHERE table_name = 'agenda'");
        if (checkAgenda.rowCount > 0) {
            const columns = await pool.query("SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'agenda'");
            output += 'Agenda Columns: ' + JSON.stringify(columns.rows, null, 2) + '\n';
        } else {
            output += 'Table agenda not found\n';
        }

        const checkJadwal = await pool.query("SELECT * FROM information_schema.tables WHERE table_name = 'jadwal_pelayanan'");
        if (checkJadwal.rowCount > 0) {
            const columns = await pool.query("SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'jadwal_pelayanan'");
            output += 'Jadwal Columns: ' + JSON.stringify(columns.rows, null, 2) + '\n';
        } else {
            output += 'Table jadwal_pelayanan not found\n';
        }

        fs.writeFileSync('agenda_check_output.txt', output);
        console.log('Output written to agenda_check_output.txt');

    } catch (err) {
        console.error(err);
    } finally {
        pool.end();
    }
}

checkTables();
