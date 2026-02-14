import pool from './src/config/db.js';

async function checkConstraints() {
    try {
        const result = await pool.query(`
            SELECT conname, pg_get_constraintdef(oid) as definition 
            FROM pg_constraint 
            WHERE conrelid = 'jemaat'::regclass AND contype = 'c'
        `);

        console.log('📋 Constraints on jemaat table:');
        console.log('='.repeat(80));
        result.rows.forEach(row => {
            console.log(`\n${row.conname}:`);
            console.log(`  ${row.definition}`);
        });
        console.log('\n' + '='.repeat(80));

    } catch (error) {
        console.error('❌ Error:', error.message);
    } finally {
        await pool.end();
    }
}

checkConstraints();
