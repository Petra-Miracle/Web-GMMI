import AdminService from './src/services/admin.service.js';

async function testLogin() {
    try {
        const admin = await AdminService.loginAdmin({
            email: 'petra221106@gmail.com',
            password: 'PETRA20LENGGU06'
        });
        console.log('Login Success:', admin);
        process.exit(0);
    } catch (err) {
        console.error('Login Failed:', err.message);
        process.exit(1);
    }
}

testLogin();
