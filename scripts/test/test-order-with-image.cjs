// Test order submission with image
async function testOrderSubmission() {
  try {
    console.log('🧪 Testing order submission with image...');
    
    // Create a small test image in base64 format
    const testImageBase64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
    
    const testOrder = {
      categoryId: 1,
      designSampleId: null,
      frameTypeId: 1,
      sizeId: 1,
      frameColorId: 1,
      customerName: 'Test Customer',
      customerAddress: 'Test Address',
      customerWhatsapp: '+1234567890',
      deliveryTo: 'Test Address',
      totalAmount: 100.00,
      numberOfPersons: 1,
      backgroundColor: '#ffffff',
      imageUrl: testImageBase64,
      notes: 'Test order with image'
    };
    
    console.log('📤 Sending order data...');
    console.log('Image size:', testImageBase64.length, 'characters');
    
    const response = await fetch('http://localhost:3001/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testOrder)
    });
    
    const result = await response.json();
    
    console.log('📥 Response status:', response.status);
    console.log('📥 Response data:', JSON.stringify(result, null, 2));
    
    if (result.success) {
      console.log('✅ Order submission successful!');
      console.log('Order ID:', result.data.id);
    } else {
      console.log('❌ Order submission failed');
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testOrderSubmission();