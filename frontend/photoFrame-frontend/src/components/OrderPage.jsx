import { useState, useEffect } from 'react';
import { databaseService } from '../services/databaseService';

// Import sample images for categories
import oilPaintSample from '../assets/oil paint collection/4.jpg';
import ghibliSample from '../assets/Ghibli collection/5.jpg';
import miniFrameSample from '../assets/mini frames/3.jpg';
import portraitSample from '../assets/oil paint collection/7.jpg';
// Additional samples for variety
import ghibliSample2 from '../assets/Ghibli collection/8.jpg';
import oilPaintSample2 from '../assets/oil paint collection/6.jpg';

const OrderPage = ({ language, translations, onPageChange }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [orderData, setOrderData] = useState({
    categoryId: '',
    designSampleId: '',
    frameTypeId: '',
    sizeId: '',
    frameColorId: '',
    numberOfPersons: 1,
    customerName: '',
    customerAddress: '',
    customerWhatsapp: '',
    deliveryTo: '',
    backgroundColor: '',
    imageUrl: '',
    notes: ''
  });

  // Data from database
  const [categories, setCategories] = useState([]);
  const [frameTypes, setFrameTypes] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [frameColors, setFrameColors] = useState([]);
  const [loading, setLoading] = useState(false);

  const t = translations[language];

  // Category sample images mapping
  const getCategorySampleImage = (categoryName, categoryId) => {
    const name = categoryName?.toLowerCase() || '';
    
    // Map based on common category names
    if (name.includes('oil') || name.includes('paint')) return oilPaintSample;
    if (name.includes('ghibli') || name.includes('anime') || name.includes('cartoon')) return ghibliSample;
    if (name.includes('mini') || name.includes('small') || name.includes('compact')) return miniFrameSample;
    if (name.includes('portrait') || name.includes('classic') || name.includes('traditional')) return portraitSample;
    if (name.includes('wedding') || name.includes('special')) return ghibliSample2;
    if (name.includes('family') || name.includes('group')) return oilPaintSample2;
    
    // Fallback based on category ID for consistent assignment
    const samples = [oilPaintSample, ghibliSample, miniFrameSample, portraitSample];
    return samples[categoryId % samples.length] || oilPaintSample;
  };

  const steps = [
    { id: 1, name: t.order?.steps?.category || 'Category' },
    { id: 2, name: t.order?.steps?.details || 'Details' },
    { id: 3, name: t.order?.steps?.frame || 'Frame' },
    { id: 4, name: t.order?.steps?.delivery || 'Delivery' },
    { id: 5, name: t.order?.steps?.confirm || 'Confirm' }
  ];

  // Load categories when component mounts
  useEffect(() => {
    loadCategories();
  }, []);

  // Load data when selections change
  useEffect(() => {
    if (orderData.categoryId) {
      loadFrameTypes(orderData.categoryId);
    }
  }, [orderData.categoryId]);

  useEffect(() => {
    if (orderData.frameTypeId) {
      loadSizes(orderData.frameTypeId);
      loadFrameColors(orderData.frameTypeId);
    }
  }, [orderData.frameTypeId]);

  const loadCategories = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3001/api/categories');
      const result = await response.json();
      if (result.success) {
        setCategories(result.data);
      }
    } catch (error) {
      console.error('Error loading categories:', error);
    } finally {
      setLoading(false);
    }
  };



  const loadFrameTypes = async (categoryId) => {
    try {
      const response = await fetch(`http://localhost:3001/api/frame-types/${categoryId}`);
      const result = await response.json();
      if (result.success) {
        setFrameTypes(result.data);
      }
    } catch (error) {
      console.error('Error loading frame types:', error);
    }
  };

  const loadSizes = async (frameTypeId) => {
    try {
      const response = await fetch(`http://localhost:3001/api/sizes/${frameTypeId}`);
      const result = await response.json();
      if (result.success) {
        setSizes(result.data);
      }
    } catch (error) {
      console.error('Error loading sizes:', error);
    }
  };

  const loadFrameColors = async (frameTypeId) => {
    try {
      const response = await fetch(`http://localhost:3001/api/frame-colors/${frameTypeId}`);
      const result = await response.json();
      if (result.success) {
        setFrameColors(result.data);
      }
    } catch (error) {
      console.error('Error loading frame colors:', error);
    }
  };

  const handleInputChange = (field, value) => {
    setOrderData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const nextStep = () => {
    // Validation based on current step
    if (currentStep === 1 && !orderData.categoryId) {
      alert('Please select a category');
      return;
    }
    if (currentStep === 2 && !orderData.frameTypeId) {
      alert('Please select a frame type');
      return;
    }
    if (currentStep === 3 && !orderData.sizeId) {
      alert('Please select a size');
      return;
    }
    if (currentStep === 4 && (!orderData.customerName || !orderData.customerWhatsapp || !orderData.customerAddress)) {
      alert('Please fill in all required customer information');
      return;
    }
    
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const sendWhatsAppSummary = async (orderData, orderId) => {
    try {
      console.log('📱 Preparing WhatsApp summary for order:', orderId);
      
      // Get selected names for better display
      const selectedCategory = categories.find(c => c.id == orderData.categoryId)?.name || 'Unknown';
      const selectedFrameType = frameTypes.find(f => f.id == orderData.frameTypeId)?.name || 'Unknown';
      const selectedSize = sizes.find(s => s.id == orderData.sizeId)?.display || 'Unknown';
      const selectedColor = frameColors.find(c => c.id == orderData.frameColorId)?.name || 'No color selected';
      
      const message = encodeURIComponent(
        `🖼️ *New Photo Frame Order #${orderId}*\n\n` +
        `📋 *Order Details:*\n` +
        `• Category: ${selectedCategory}\n` +
        `• Frame Type: ${selectedFrameType}\n` +
        `• Size: ${selectedSize}\n` +
        `• Color: ${selectedColor}\n` +
        `• Number of Persons: ${orderData.numberOfPersons || 1}\n\n` +
        `👤 *Customer Information:*\n` +
        `• Name: ${orderData.customerName}\n` +
        `• WhatsApp: ${orderData.customerWhatsapp}\n` +
        `• Address: ${orderData.customerAddress}\n` +
        `• Delivery: ${orderData.deliveryTo || orderData.customerAddress}\n\n` +
        `📝 *Notes:* ${orderData.notes || 'None'}\n\n` +
        `✅ Order received successfully!`
      );
      
      const whatsappUrl = `https://wa.me/94702923943?text=${message}`;
      console.log('📱 Opening WhatsApp with URL:', whatsappUrl);
      
      // Open WhatsApp
      window.open(whatsappUrl, '_blank');
      
      console.log('✅ WhatsApp summary sent successfully');
    } catch (error) {
      console.error('❌ Error sending WhatsApp summary:', error);
      alert('WhatsApp summary could not be sent, but your order was saved successfully!');
    }
  };

  const submitOrder = async () => {
    try {
      const orderPayload = {
        categoryId: orderData.categoryId,
        designSampleId: orderData.designSampleId || null,
        frameTypeId: orderData.frameTypeId,
        sizeId: orderData.sizeId,
        frameColorId: orderData.frameColorId || null,
        numberOfPersons: orderData.numberOfPersons || 1,
        customerName: orderData.customerName,
        customerAddress: orderData.customerAddress,
        customerWhatsapp: orderData.customerWhatsapp,
        deliveryTo: orderData.deliveryTo || orderData.customerAddress,
        backgroundColor: orderData.backgroundColor || null,  
        imageUrl: orderData.imageUrl || null,
        notes: orderData.notes || null
      };
      
      // Save order to database
      const result = await databaseService.saveOrder(orderPayload);
      console.log('📊 Order submission result:', result);
      
      // Send WhatsApp summary
      if (result.success && result.data?.id) {
        console.log('✅ Order saved successfully, sending WhatsApp summary...');
        await sendWhatsAppSummary(orderData, result.data.id);
      } else {
        console.log('❌ Order save failed or no order ID returned:', result);
      }
      
      alert(`Order submitted successfully! Your order ID is: ${result.data?.id}`);
      
      // Reset form or redirect
      setCurrentStep(1);
      setOrderData({
        categoryId: '',
        designSampleId: '',
        frameTypeId: '',
        sizeId: '',
        frameColorId: '',
        numberOfPersons: 1,
        customerName: '',
        customerAddress: '',
        customerWhatsapp: '',
        deliveryTo: '',
        backgroundColor: '',
        imageUrl: '',
        notes: ''
      });
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('Error submitting order. Please try again.');
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="form-step">
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-green-3 mb-4 text-center">
                {t.order?.selectCategory || 'Choose Your Style'}
              </h3>
              <p className="text-gray-600 text-center mb-8 leading-relaxed">
                Select the photo frame style that best matches your vision
              </p>
            </div>
            
            {loading ? (
              <div className="text-center">
                <p className="text-gray-500">Loading categories...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
                {categories.map(category => (
                  <div 
                    key={category.id}
                    onClick={() => handleInputChange('categoryId', category.id)}
                    className={`category-card cursor-pointer rounded-xl overflow-hidden shadow-lg transition-all duration-300 transform hover:scale-105 ${
                      orderData.categoryId == category.id 
                        ? 'ring-4 ring-green-2 shadow-2xl bg-green-50' 
                        : 'hover:shadow-xl bg-white'
                    }`}
                  >
                    <div className="relative">
                      <img 
                        src={getCategorySampleImage(category.name, category.id)} 
                        alt={category.name}
                        className={`w-full h-40 sm:h-48 object-cover transition-all duration-300 ${
                          orderData.categoryId == category.id ? 'brightness-110' : ''
                        }`}
                      />
                      {orderData.categoryId == category.id && (
                        <div className="absolute inset-0 bg-green-2 bg-opacity-20 flex items-center justify-center">
                          <div className="bg-green-2 text-white rounded-full p-3 shadow-lg animate-pulse">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        </div>
                      )}
                      {/* Category type badge */}
                      <div className="absolute bottom-2 left-2 bg-black bg-opacity-60 text-white px-2 py-1 rounded text-xs">
                        Click to Select
                      </div>
                    </div>
                    <div className="p-4 bg-white">
                      <h4 className="font-semibold text-lg text-gray-800 mb-2">
                        {category.name}
                      </h4>
                      <p className="text-gray-600 text-sm">
                        {category.description || 'Beautiful custom photo frames in this style'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {!loading && categories.length === 0 && (
              <div className="text-center text-gray-500">
                <p>No categories available at the moment.</p>
              </div>
            )}
            
            {orderData.categoryId && (
              <div className="mt-8 text-center">
                <p className="text-green-2 font-medium bg-green-50 py-3 px-4 rounded-lg inline-block">
                  ✓ Selected: {categories.find(c => c.id == orderData.categoryId)?.name}
                </p>
              </div>
            )}
          </div>
        );

      case 2:
        return (
          <div className="form-step space-y-6">
            <div className="form-group">
              <label className="block mb-3 font-medium text-green-3">
                Frame Type
              </label>
              <select
                value={orderData.frameTypeId}
                onChange={(e) => handleInputChange('frameTypeId', e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-2 focus:border-transparent"
                disabled={!orderData.categoryId}
              >
                <option value="">Choose frame type...</option>
                {frameTypes.map(frameType => (
                  <option key={frameType.id} value={frameType.id}>
                    {frameType.name} ({frameType.material})
                  </option>
                ))}
              </select>
              {!orderData.categoryId && <p className="text-sm text-gray-500 mt-3">Please select a category first</p>}
            </div>
            <div className="form-group">
              <label className="block mb-3 font-medium text-green-3">
                Number of Persons
              </label>
              <input
                type="number"
                min="1"
                max="10"
                value={orderData.numberOfPersons}
                onChange={(e) => handleInputChange('numberOfPersons', parseInt(e.target.value))}
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-2 focus:border-transparent"
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="form-step space-y-6">
            <div className="form-group">
              <label className="block mb-3 font-medium text-green-3">
                Size
              </label>
              <select
                value={orderData.sizeId}
                onChange={(e) => handleInputChange('sizeId', e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-2 focus:border-transparent"
                disabled={!orderData.frameTypeId}
              >
                <option value="">Choose size...</option>
                {sizes.map(size => (
                  <option key={size.id} value={size.id}>
                    {size.display} ({size.width} x {size.height} {size.unit})
                  </option>
                ))}
              </select>
              {!orderData.frameTypeId && <p className="text-sm text-gray-500 mt-3">Please select a frame type first</p>}
            </div>
            <div className="form-group">
              <label className="block mb-3 font-medium text-green-3">
                Frame Color <span className="text-sm text-gray-500 font-normal">(Optional)</span>
              </label>
              <select
                value={orderData.frameColorId}
                onChange={(e) => handleInputChange('frameColorId', e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-2 focus:border-transparent"
                disabled={!orderData.frameTypeId}
              >
                <option value="">Choose color (optional)...</option>
                {frameColors.map(color => (
                  <option key={color.id} value={color.id}>{color.name}</option>
                ))}
              </select>
              {!orderData.frameTypeId && <p className="text-sm text-gray-500 mt-3">Please select a frame type first</p>}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="form-step space-y-6">
            <div className="form-group">
              <label className="block mb-3 font-medium text-green-3">
                Full Name
              </label>
              <input
                type="text"
                value={orderData.customerName}
                onChange={(e) => handleInputChange('customerName', e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-2 focus:border-transparent"
                placeholder="Enter your full name"
              />
            </div>
            <div className="form-group">
              <label className="block mb-3 font-medium text-green-3">
                WhatsApp Number
              </label>
              <input
                type="tel"
                value={orderData.customerWhatsapp}
                onChange={(e) => handleInputChange('customerWhatsapp', e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-2 focus:border-transparent"
                placeholder="Enter your WhatsApp number"
              />
            </div>
            <div className="form-group">
              <label className="block mb-3 font-medium text-green-3">
                Customer Address
              </label>
              <textarea
                value={orderData.customerAddress}
                onChange={(e) => handleInputChange('customerAddress', e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-2 focus:border-transparent resize-none"
                rows="3"
                placeholder="Enter your complete address"
              />
            </div>
            <div className="form-group">
              <label className="block mb-3 font-medium text-green-3">
                Delivery Location
              </label>
              <select
                value={orderData.deliveryTo}
                onChange={(e) => handleInputChange('deliveryTo', e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-2 focus:border-transparent"
              >
                <option value="">Select delivery location</option>
                <option value="Sri Lanka">Sri Lanka</option>
                <option value="Abroad">Abroad</option>
              </select>
            </div>
            <div className="form-group">
              <label className="block mb-3 font-medium text-green-3">
                Additional Notes <span className="text-sm text-gray-500 font-normal">(Optional)</span>
              </label>
              <textarea
                value={orderData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-2 focus:border-transparent resize-none"
                rows="3"
                placeholder="Any special instructions or notes"
              />
            </div>
          </div>
        );

      case 5:
        return (
          <div className="form-step space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-green-3 mb-4">Order Summary</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between py-1">
                  <span>Category:</span>
                  <span className="font-medium">
                    {categories.find(c => c.id == orderData.categoryId)?.name || 'Not selected'}
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span>Frame Type:</span>
                  <span className="font-medium">
                    {frameTypes.find(f => f.id == orderData.frameTypeId)?.name || 'Not selected'}
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span>Size:</span>
                  <span className="font-medium">
                    {sizes.find(s => s.id == orderData.sizeId)?.display || 'Not selected'}
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span>Color:</span>
                  <span className="font-medium">
                    {frameColors.find(c => c.id == orderData.frameColorId)?.name || 'No color selected'}
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span>Number of Persons:</span>
                  <span className="font-medium">{orderData.numberOfPersons}</span>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg">
              <h4 className="font-semibold text-green-3 mb-4">Customer Information</h4>
              <div className="space-y-2 text-sm">
                <p><strong>Name:</strong> {orderData.customerName}</p>
                <p><strong>WhatsApp:</strong> {orderData.customerWhatsapp}</p>
                <p><strong>Address:</strong> {orderData.customerAddress}</p>
                <p><strong>Delivery Location:</strong> {orderData.deliveryTo || 'Not specified'}</p>
              </div>
            </div>
            
            <div className="form-group">
              <label className="block mb-3 font-medium text-green-3">
                Special Instructions <span className="text-sm text-gray-500 font-normal">(Optional)</span>
              </label>
              <textarea
                value={orderData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-2 focus:border-transparent resize-none"
                rows="3"
                placeholder="Any special instructions for your order..."
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-light py-8">
      <div className="max-w-container mx-auto px-5">
        {/* Header with back button */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => onPageChange && onPageChange('home')}
            className="flex items-center gap-2 text-green-2 hover:text-green-1 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </button>
          <div className="text-2xl font-bold text-green-3">
            FRAMES.LK
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-3 mb-2">
            {t.order?.title || 'Order Your Frame'}
          </h1>
          <p className="text-gray-600">
            {t.order?.subtitle || 'Create your perfect custom frame in just a few steps'}
          </p>
        </div>

        <div className="bg-white rounded-custom p-8 shadow-lg max-w-4xl mx-auto">
          {/* Progress Steps */}
          <div className="flex justify-between mb-10 relative">
            {steps.map((step, index) => (
              <div key={step.id} className="flex-1 text-center relative">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full text-sm font-semibold mb-3 ${
                  currentStep >= step.id 
                    ? 'bg-green-2 text-white' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {step.id}
                </div>
                <div className={`text-sm font-medium px-2 ${
                  currentStep >= step.id ? 'text-green-2' : 'text-gray-500'
                }`}>
                  {step.name}
                </div>
                {index < steps.length - 1 && (
                  <div className={`absolute top-6 left-1/2 w-full h-0.5 ${
                    currentStep > step.id ? 'bg-green-2' : 'bg-gray-200'
                  }`} style={{ zIndex: -1 }} />
                )}
              </div>
            ))}
          </div>

          {/* Form Content */}
          <div className="mb-8">
            {renderStep()}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6 mt-8 border-t border-gray-200">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`px-8 py-4 rounded-lg font-semibold transition-colors ${
                currentStep === 1
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
              }`}
            >
              Previous
            </button>

            {currentStep < 5 ? (
              <button
                onClick={nextStep}
                className="px-8 py-4 bg-green-2 text-white rounded-lg font-semibold hover:bg-green-1 transition-colors"
              >
                Next Step
              </button>
            ) : (
              <button
                onClick={submitOrder}
                className="px-10 py-4 bg-green-1 text-white rounded-lg font-semibold hover:bg-green-3 transition-colors"
              >
                Place Order
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;