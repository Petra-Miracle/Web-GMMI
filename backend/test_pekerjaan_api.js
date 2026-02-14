import axios from 'axios';

const API_URL = 'http://localhost:3000';

async function testPekerjaanAPI() {
    try {
        console.log('🧪 Testing Pekerjaan API...\n');

        // Test GET all pekerjaan
        console.log('1️⃣ Testing GET /api/pekerjaan');
        const response = await axios.get(`${API_URL}/api/pekerjaan`);

        if (response.data.success) {
            console.log('✅ Success!');
            console.log(`📋 Found ${response.data.data.length} pekerjaan:`);
            response.data.data.slice(0, 5).forEach((p, i) => {
                console.log(`   ${i + 1}. ${p.nama_pekerjaan} (ID: ${p.id})`);
            });
            if (response.data.data.length > 5) {
                console.log(`   ... and ${response.data.data.length - 5} more`);
            }
        } else {
            console.log('❌ Failed:', response.data);
        }

        console.log('\n✅ All tests passed!');
    } catch (error) {
        if (error.response) {
            console.error('❌ API Error:', error.response.status, error.response.data);
        } else if (error.request) {
            console.error('❌ No response from server. Is the backend running?');
        } else {
            console.error('❌ Error:', error.message);
        }
    }
}

testPekerjaanAPI();
