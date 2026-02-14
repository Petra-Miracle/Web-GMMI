import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

async function verify() {
    try {
        console.log('--- Verifying Jemaat API ---');

        // 1. Get Sectors
        console.log('1. Testing GET /jemaat/sectors...');
        const sectorsRes = await axios.get(`${API_URL}/jemaat/sectors`);
        console.log('Success:', sectorsRes.data.success, 'Count:', sectorsRes.data.data.length);
        const sectorId = sectorsRes.data.data[0].id;

        // 2. Create Member
        console.log('\n2. Testing POST /jemaat (Create)...');
        const createRes = await axios.post(`${API_URL}/jemaat`, {
            nama: 'Test Member ' + Date.now(),
            sektor_id: sectorId,
            pendidikan_terakhir: 'S1',
            pekerjaan: 'Tester',
            kategorial: 'AMMI,ARMI',
            keterangan: 'Verification testing',
            sakramen: { bpts: true, sidi: false, nikah: false, meninggal: false }
        });
        console.log('Success:', createRes.data.success, 'ID:', createRes.data.id);
        const memberId = createRes.data.id;

        // 3. Get Members
        console.log('\n3. Testing GET /jemaat...');
        const listRes = await axios.get(`${API_URL}/jemaat`);
        console.log('Success:', listRes.data.success, 'Count:', listRes.data.data.length);

        // 4. Update Member
        console.log('\n4. Testing PUT /jemaat/:id...');
        const updateRes = await axios.put(`${API_URL}/jemaat/${memberId}`, {
            nama: 'Updated Tester',
            sektor_id: sectorId,
            pendidikan_terakhir: 'S2',
            pekerjaan: 'Senior Tester',
            kategorial: 'AMMI',
            keterangan: 'Updated verification testing',
            sakramen: { bpts: true, sidi: true, nikah: false, meninggal: false }
        });
        console.log('Success:', updateRes.data.success);

        // 5. Delete Member
        console.log('\n5. Testing DELETE /jemaat/:id (Soft Delete)...');
        const deleteRes = await axios.delete(`${API_URL}/jemaat/${memberId}`);
        console.log('Success:', deleteRes.data.success);

        console.log('\n--- Verification Completed Successfully ---');
    } catch (error) {
        console.error('\nVerification failed:', error.response?.data || error.message);
    }
}

verify();
