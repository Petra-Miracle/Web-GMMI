import axios from 'axios';

const API_URL = 'http://localhost:3000';

async function testBackendHealth() {
    try {
        console.log('🏥 Testing Backend Health...\n');

        // Test root endpoint
        console.log('1️⃣ Testing GET /');
        const rootResponse = await axios.get(`${API_URL}/`);
        console.log('✅ Backend is running!');
        console.log('   Response:', rootResponse.data.message);

        // Test pekerjaan endpoint (will get 401 but that's OK - means endpoint exists)
        console.log('\n2️⃣ Testing GET /api/pekerjaan (without auth)');
        try {
            await axios.get(`${API_URL}/api/pekerjaan`);
        } catch (error) {
            if (error.response && error.response.status === 401) {
                console.log('✅ Endpoint exists! (Got 401 - authentication required)');
                console.log('   This is expected - endpoint is protected');
            } else {
                throw error;
            }
        }

        console.log('\n✅ Backend is healthy and all endpoints are accessible!');
        console.log('📝 Note: /api/pekerjaan requires authentication token from login');

    } catch (error) {
        if (error.response) {
            console.error('❌ API Error:', error.response.status, error.response.data);
        } else if (error.request) {
            console.error('❌ No response from server. Backend is not running!');
        } else {
            console.error('❌ Error:', error.message);
        }
        process.exit(1);
    }
}

testBackendHealth();
