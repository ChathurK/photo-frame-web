async function testAPI() {
  try {
    console.log('Testing categories endpoint...');
    const response = await fetch('http://localhost:3001/api/categories');
    const data = await response.json();
    console.log('Response status:', response.status);
    console.log('Response data:', JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error:', error.message);
  }
}

testAPI();