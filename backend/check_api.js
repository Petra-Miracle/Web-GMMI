async function checkApi() {
    try {
        const response = await fetch('http://localhost:3000/api/warta');
        const data = await response.json();
        console.log('Results count:', data.data?.length || 0);
        if (data.data?.length > 0) {
            console.log('First Title:', data.data[0].judul);
        }
    } catch (err) {
        console.error(err);
    }
}

checkApi();
