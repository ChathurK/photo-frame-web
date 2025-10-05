const testOrderSubmission = async () => {
  try {
    const testOrder = {
      categoryId: 1,
      frameTypeId: 1,
      sizeId: 1,
      customerName: "Test Customer",
      customerAddress: "123 Test Street",
      customerWhatsapp: "+94701234567",
      deliveryTo: "Sri Lanka",
      numberOfPersons: 1,
      backgroundColor: "#ffffff",
      notes: "Test order"
    };

    console.log('Testing order submission...');
    console.log('Order data:', testOrder);

    const response = await fetch('http://localhost:3001/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testOrder)
    });

    console.log('Response status:', response.status);
    console.log('Response ok:', response.ok);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response:', errorText);
      return;
    }

    const result = await response.json();
    console.log('Success result:', result);

  } catch (error) {
    console.error('Test failed:', error);
  }
};

testOrderSubmission();