// Test script to check order submission
const testOrder = async () => {
  try {
    const response = await fetch('http://localhost:3001/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        categoryId: 1,
        frameTypeId: 1,
        sizeId: 1,
        customerName: 'Test User',
        customerAddress: 'Test Address',
        customerWhatsapp: '1234567890',
        deliveryTo: 'Sri Lanka',
        numberOfPersons: 1,
        backgroundColor: '#ffffff',
        notes: 'Test order'
      })
    });

    const result = await response.json();
    console.log('Test Order Result:', result);
  } catch (error) {
    console.error('Test Order Error:', error);
  }
};

testOrder();