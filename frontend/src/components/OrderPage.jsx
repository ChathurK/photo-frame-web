import React, { useState, useEffect } from "react";
import { databaseService } from "../services/databaseService";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DesignGallery from "./DesignGallery";

// Import sample images for categories
import oilPaintSample from "../assets/oil paint collection/4.jpg"; // Oil Painting - keeping as is
import miniFrameSample from "../assets/mini frames/12.jpg"; // Mini Frames
import hundredDesignSample from "../assets/100 design collection final/DT 36.jpg"; // 100 Designs
import cuteCollectionSample from "../assets/Ghibli collection/9.jpg"; // Cute Collection
// Additional samples for variety (keeping for fallback)
import ghibliSample2 from "../assets/Ghibli collection/8.jpg";
import oilPaintSample2 from "../assets/oil paint collection/6.jpg";
// Package images
import freePackageImg from "../assets/Boxes/Free Delivery.webp";
import premiumPackageImg from "../assets/Boxes/Premium Package.webp";

const OrderPage = ({ language, translations, onPageChange }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [orderData, setOrderData] = useState({
    categoryId: "",
    designSampleId: "",
    frameTypeId: "",
    sizeId: "",
    frameColorId: "",
    numberOfPersons: 1,
    packageType: "free", // free or premium
    customerName: "",
    customerAddress: "",
    customerWhatsapp: "",
    deliveryTo: "",
    deliveryDate: "",
    backgroundColor: "",
    notes: "",
  });

  // Data from database
  const [categories, setCategories] = useState([]);
  const [frameTypes, setFrameTypes] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [frameColors, setFrameColors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sizePrices, setSizePrices] = useState({}); // Store prices for each size
  const [framePreviewModal, setFramePreviewModal] = useState(null); // For frame zoom modal

  const t = translations[language];

  // Category sample images mapping
  const getCategorySampleImage = (categoryName, categoryId) => {
    const name = categoryName?.toLowerCase() || "";

    // Map based on common category names
    // Oil Painting - 4.jpg from oil paint collection
    if (name.includes("oil") || name.includes("paint")) return oilPaintSample;
    
    // Mini Frames - 12.jpg from mini frames
    if (name.includes("mini") || name.includes("small") || name.includes("compact"))
      return miniFrameSample;
    
    // 100 Designs - DT 36.jpg from 100 design collection
    if (name.includes("100") || name.includes("hundred") || name.includes("design"))
      return hundredDesignSample;
    
    // Cute Collection - 9.jpg from Ghibli collection
    if (name.includes("cute") || name.includes("ghibli") || name.includes("anime") || name.includes("cartoon"))
      return cuteCollectionSample;
    
    // Additional fallbacks
    if (name.includes("portrait") || name.includes("classic") || name.includes("traditional"))
      return oilPaintSample;
    if (name.includes("wedding") || name.includes("special"))
      return ghibliSample2;
    if (name.includes("family") || name.includes("group"))
      return oilPaintSample2;

    // Fallback based on category ID for consistent assignment
    const samples = [
      oilPaintSample,
      miniFrameSample,
      hundredDesignSample,
      cuteCollectionSample,
    ];
    return samples[categoryId % samples.length] || oilPaintSample;
  };

  // Helper function to get frame image based on frame type, color, and language
  const getFrameImage = (frameTypeName, frameColorName, language) => {
    if (!frameTypeName) return null;
    
    const lang = language === 'si' ? 'sinhala' : 'english';
    const frameName = frameTypeName.toLowerCase();
    // Use the selected color parameter (for both Fiber and Plymount frames with color selection)
    const colorName = frameColorName?.toLowerCase() || '';
    
    try {
      // Fiber Frame - Has 4 colors (Black, White, Brown, Pinewood)
      if (frameName.includes('fiber')) {
        // Fiber frames REQUIRE color selection
        if (!colorName) return null; // Don't show preview until color is selected
        
        let fileName = '';
        if (colorName.includes('black')) {
          fileName = lang === 'sinhala' 
            ? 'black fiber frame - with glass- sinhala.jpg'
            : 'black fiber frame - with glass.jpg';
        } else if (colorName.includes('white')) {
          fileName = lang === 'sinhala'
            ? 'white fiber frame - with glass - sinhala.jpg'
            : 'white fiber frame - with glass.jpg';
        } else if (colorName.includes('brown')) {
          fileName = lang === 'sinhala'
            ? 'brown fiber frame - with glass - sinhala.jpg'
            : 'brown fiber frame - with glass.jpg';
        } else if (colorName.includes('pine') || colorName.includes('wood')) {
          fileName = lang === 'sinhala'
            ? 'Pinewoord color  fiber frame - with glass - sinhala.jpg'
            : 'Pinewoord color  fiber frame - with glass.jpg';
        }
        if (fileName) {
          return new URL(`../assets/frames/fiber sinhala and english/${fileName}`, import.meta.url).href;
        }
      }
      
      // Plymount Nonmargine Normal - Black or White (now with color selection)
      if ((frameName.includes('nonmargine') || frameName.includes('non-margine') || 
           frameName.includes('non margine') || frameName.includes('without margine')) && 
          !frameName.includes('box')) {
        const suffix = lang === 'sinhala' ? 'sin' : 'eng';
        
        // Use color parameter if provided (new behavior), otherwise extract from name (backward compat)
        let fileName = '';
        if (colorName) {
          // Color selected via dropdown (Plymount frames now have color selection)
          if (colorName.includes('black')) {
            fileName = `Plymount Nonmargine Normal -Black - ${suffix}.jpg`;
          } else if (colorName.includes('white')) {
            fileName = `Plymount Nonmargine Normal -White - ${suffix}.jpg`;
          }
        } else {
          // Fallback: check frame name for color (old frames with color in name)
          if (frameName.includes('black')) {
            fileName = `Plymount Nonmargine Normal -Black - ${suffix}.jpg`;
          } else if (frameName.includes('white')) {
            fileName = `Plymount Nonmargine Normal -White - ${suffix}.jpg`;
          } else {
            // Default to black if no color specified
            fileName = `Plymount Nonmargine Normal -Black - ${suffix}.jpg`;
          }
        }
        if (fileName) {
          return new URL(`../assets/frames/Plymount Nonmargine Normal/${fileName}`, import.meta.url).href;
        }
      }
      
      // Plymount Margine Normal - Black or White (now with color selection)
      if ((frameName.includes('margine') || frameName.includes('margin')) && 
          !frameName.includes('nonmargine') && !frameName.includes('non-margine') && 
          !frameName.includes('box')) {
        const suffix = lang === 'sinhala' ? 'sin' : 'eng';
        
        let fileName = '';
        if (colorName) {
          // Color selected via dropdown
          if (colorName.includes('black')) {
            fileName = `Plymount Margine Normal- Black - ${suffix}.jpg`;
          } else if (colorName.includes('white')) {
            fileName = `Plymount Margine Normal- White - ${suffix}.jpg`;
          }
        } else {
          // Fallback: extract from name
          if (frameName.includes('black')) {
            fileName = `Plymount Margine Normal- Black - ${suffix}.jpg`;
          } else if (frameName.includes('white')) {
            fileName = `Plymount Margine Normal- White - ${suffix}.jpg`;
          } else {
            // Default to black
            fileName = `Plymount Margine Normal- Black - ${suffix}.jpg`;
          }
        }
        if (fileName) {
          return new URL(`../assets/frames/Plymount Margine Normal/${fileName}`, import.meta.url).href;
        }
      }
      
      // Plymount Box Frame - Black or White (now with color selection)
      if (frameName.includes('box')) {
        const langSuffix = lang === 'sinhala' ? 'sinhala' : 'english';
        
        let fileName = '';
        if (frameName.includes('plastic') || frameName.includes('beading')) {
          fileName = `Plymount Box Frame With Plastic Beading - ${lang === 'sinhala' ? 'sin' : 'eng'}.jpg`;
        } else {
          // Box Frame Nonmargine - now supports color selection
          if (colorName) {
            if (colorName.includes('black')) {
              fileName = `Plymount Box Frame Nonmargine -Black ${langSuffix}.jpg`;
            } else if (colorName.includes('white')) {
              fileName = `Plymount Box Frame Nonmargine -white ${langSuffix}.jpg`;
            }
          } else {
            // Fallback: extract from name
            if (frameName.includes('black')) {
              fileName = `Plymount Box Frame Nonmargine -Black ${langSuffix}.jpg`;
            } else if (frameName.includes('white')) {
              fileName = `Plymount Box Frame Nonmargine -white ${langSuffix}.jpg`;
            } else {
              // Default to black
              fileName = `Plymount Box Frame Nonmargine -Black ${langSuffix}.jpg`;
            }
          }
        }
        if (fileName) {
          return new URL(`../assets/frames/Plymount Box Frame Nonmargine/${fileName}`, import.meta.url).href;
        }
      }
      
      // Embossed Frames - Black or White (now with color selection)
      if (frameName.includes('emboss')) {
        const suffix = lang === 'sinhala' ? 'sin' : 'eng';
        
        let fileName = '';
        if (colorName) {
          // Color selected via dropdown
          if (colorName.includes('black')) {
            fileName = `Plymount Embossed Plain Black - ${suffix}.jpg`;
          } else if (colorName.includes('white')) {
            fileName = `Plymount Embossed Plain white - ${suffix}.jpg`;
          }
        } else {
          // Fallback: extract from name
          if (frameName.includes('black')) {
            fileName = `Plymount Embossed Plain Black - ${suffix}.jpg`;
          } else if (frameName.includes('white')) {
            fileName = `Plymount Embossed Plain white - ${suffix}.jpg`;
          } else {
            // Default to black
            fileName = `Plymount Embossed Plain Black - ${suffix}.jpg`;
          }
        }
        if (fileName) {
          return new URL(`../assets/frames/Embossed Frames/${fileName}`, import.meta.url).href;
        }
      }
      
    } catch (error) {
      console.error('Error loading frame image:', error);
    }
    
    return null;
  };

  const steps = [
    { id: 1, name: t.order?.steps?.category || "Category" },
    { id: 2, name: t.order?.steps?.frame || "Frame & Size" },
    { id: 3, name: t.order?.steps?.delivery || "Delivery" },
    { id: 4, name: t.order?.steps?.confirm || "Confirm" },
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
      const response = await fetch("http://localhost:3001/api/categories");
      const result = await response.json();
      if (result.success) {
        // Sort categories in desired order: Oil Painting, Mini Frames, 100 Designs, Cute Collections
        const categoryOrder = ['OIL', 'MINI', 'HUNDRED', 'CUTE'];
        const sortedCategories = result.data.sort((a, b) => {
          const indexA = categoryOrder.indexOf(a.code);
          const indexB = categoryOrder.indexOf(b.code);
          // If category code not in order array, put it at the end
          if (indexA === -1) return 1;
          if (indexB === -1) return -1;
          return indexA - indexB;
        });
        setCategories(sortedCategories);
      }
    } catch (error) {
      console.error("Error loading categories:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadFrameTypes = async (categoryId) => {
    try {
      // For Cute Collection, use 100 Designs frames (category 2)
      const selectedCategory = categories.find(c => c.id == categoryId);
      const actualCategoryId = selectedCategory?.code === 'CUTE' ? 2 : categoryId;
      
      const response = await fetch(
        `http://localhost:3001/api/frame-types/${actualCategoryId}`,
      );
      const result = await response.json();
      if (result.success) {
        setFrameTypes(result.data);
      }
    } catch (error) {
      console.error("Error loading frame types:", error);
    }
  };

  const loadSizes = async (frameTypeId) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/sizes/${frameTypeId}`,
      );
      const result = await response.json();
      if (result.success) {
        setSizes(result.data);
        // Fetch prices for all sizes
        loadPricesForSizes(frameTypeId, result.data);
      }
    } catch (error) {
      console.error("Error loading sizes:", error);
    }
  };

  const loadPricesForSizes = async (frameTypeId, sizesData) => {
    try {
      const pricesMap = {};
      
      // Check if current category is Cute Collection
      const selectedCategory = categories.find(c => c.id == orderData.categoryId);
      const isCuteCollection = selectedCategory?.code === 'CUTE';
      
      // Fetch price for each size
      for (const size of sizesData) {
        try {
          const response = await fetch(
            `http://localhost:3001/api/prices/${frameTypeId}/${size.id}`,
          );
          const result = await response.json();
          if (result.success) {
            // For Cute Collection, add Rs. 450 to the price
            if (isCuteCollection) {
              pricesMap[size.id] = {
                ...result.data,
                base_price: result.data.final_price, // Store original as base
                price_increment: 450,
                final_price: result.data.final_price + 450,
                price_lkr: result.data.final_price + 450,
                cute_collection_charge: 450,
                category_name: 'Cute Collections'
              };
            } else {
              pricesMap[size.id] = result.data;
            }
          }
        } catch (error) {
          console.error(`Error loading price for size ${size.id}:`, error);
        }
      }
      
      setSizePrices(pricesMap);
    } catch (error) {
      console.error("Error loading prices:", error);
    }
  };

  const loadFrameColors = async (frameTypeId) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/frame-colors/${frameTypeId}`,
      );
      const result = await response.json();
      if (result.success) {
        setFrameColors(result.data);
      }
    } catch (error) {
      console.error("Error loading frame colors:", error);
    }
  };

  const handleInputChange = (field, value) => {
    setOrderData((prev) => ({
      ...prev,
      [field]: value,
    }));
    
    // Clear prices when frame type changes
    if (field === 'frameTypeId') {
      setSizePrices({});
    }
    
    // Clear size selection when frame type changes
    if (field === 'frameTypeId' && value !== orderData.frameTypeId) {
      setOrderData((prev) => ({
        ...prev,
        [field]: value,
        sizeId: '', // Clear size selection
      }));
    }
  };

  const nextStep = () => {
    // Validation based on current step
    if (currentStep === 1 && !orderData.categoryId) {
      alert("Please select a category");
      return;
    }
    if (currentStep === 2 && !orderData.frameTypeId) {
      alert("Please select a frame type");
      return;
    }
    if (currentStep === 2 && !orderData.sizeId) {
      alert("Please select a size");
      return;
    }
    if (
      currentStep === 3 &&
      (!orderData.customerName ||
        !orderData.customerWhatsapp ||
        !orderData.customerAddress ||
        !orderData.deliveryDate)
    ) {
      alert(
        "Please fill in all required fields including delivery date before proceeding.",
      );
      return;
    }

    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
      // Scroll to top of page smoothly
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      // Scroll to top of page smoothly
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const sendWhatsAppSummary = async (orderData, orderId) => {
    try {
      console.log("📱 Preparing WhatsApp summary for order:", orderId);

      // Get selected names for better display
      const selectedCategory =
        categories.find((c) => c.id == orderData.categoryId)?.name || "Unknown";
      const categoryCode = categories.find((c) => c.id == orderData.categoryId)?.code;
      const selectedFrameType =
        frameTypes.find((f) => f.id == orderData.frameTypeId)?.name || "Unknown";
      const selectedSize =
        sizes.find((s) => s.id == orderData.sizeId)?.display || "Unknown";
      const selectedColor =
        frameColors.find((c) => c.id == orderData.frameColorId)?.name || "No color selected";
      
      // Calculate pricing
      const priceInfo = sizePrices[orderData.sizeId];
      let priceBreakdown = "";
      let totalPrice = 0;
      
      if (priceInfo) {
        // For Cute Collection, final_price already includes the +450
        totalPrice = priceInfo.final_price || priceInfo.price_lkr || 0;
        priceBreakdown += `💰 *Price Breakdown:*\n`;
        
        // Show breakdown differently for Cute Collection
        if (categoryCode === 'CUTE' && priceInfo.cute_collection_charge) {
          const basePrice = priceInfo.final_price - 450;
          priceBreakdown += `• Frame Price: Rs. ${basePrice.toLocaleString()}\n`;
          priceBreakdown += `• Cute Collection: Rs. 450\n`;
        } else {
          priceBreakdown += `• Base Price: Rs. ${(priceInfo.base_price || priceInfo.price_lkr).toLocaleString()}\n`;
          if (priceInfo.price_increment > 0) {
            priceBreakdown += `• Category Charge: Rs. ${priceInfo.price_increment.toLocaleString()}\n`;
          }
        }
        
        // Per-person charge
        const needsPersonCharge = categoryCode === 'OIL' || categoryCode === 'CUTE';
        const personCharge = needsPersonCharge && orderData.numberOfPersons > 1 
          ? (orderData.numberOfPersons - 1) * 450 
          : 0;
        if (personCharge > 0) {
          priceBreakdown += `• Additional Persons: Rs. ${personCharge.toLocaleString()} (${orderData.numberOfPersons - 1} × Rs. 450)\n`;
          totalPrice += personCharge;
        }
        
        // Package charge
        const packageCharge = orderData.packageType === 'premium' ? 450 : 0;
        if (packageCharge > 0) {
          priceBreakdown += `• Premium Package: Rs. ${packageCharge.toLocaleString()}\n`;
          totalPrice += packageCharge;
        }
        
        // Mini Frames delivery fee
        const deliveryFee = categoryCode === 'MINI' ? 450 : 0;
        if (deliveryFee > 0) {
          priceBreakdown += `• Delivery Fee: Rs. ${deliveryFee.toLocaleString()}\n`;
          totalPrice += deliveryFee;
        }
        
        priceBreakdown += `━━━━━━━━━━━━━━━━\n`;
        priceBreakdown += `*TOTAL: Rs. ${totalPrice.toLocaleString()}*\n\n`;
      }

      // Create main order message
      let message =
        `🖼️ *NEW PHOTO FRAME ORDER #${orderId}*\n\n` +
        `━━━━━━━━━━━━━━━━\n` +
        `📋 *ORDER DETAILS*\n` +
        `━━━━━━━━━━━━━━━━\n` +
        `• Category: ${selectedCategory}\n`;
      
      // Add design number for 100 Designs category
      if (categoryCode === 'HUNDRED' && orderData.designSampleId) {
        message += `• Design: DT ${orderData.designSampleId} ✅\n`;
      }
      
      message += 
        `• Frame Type: ${selectedFrameType}\n` +
        `• Size: ${selectedSize}\n` +
        `• Color: ${selectedColor}\n`;
      
      // Add person/background info only for Oil and Cute
      const needsPersonInfo = categoryCode === 'OIL' || categoryCode === 'CUTE';
      if (needsPersonInfo) {
        message += `• Number of Persons: ${orderData.numberOfPersons || 1}\n`;
        if (orderData.backgroundColor) {
          message += `• Background Color: ${orderData.backgroundColor}\n`;
        }
      }
      
      message += `• Package: ${orderData.packageType === 'premium' ? '✨ Premium Package' : '📦 Free Package'}\n\n`;
      
      // Add price breakdown
      message += priceBreakdown;
      
      message +=
        `━━━━━━━━━━━━━━━━\n` +
        `*CUSTOMER INFO*\n` +
        `━━━━━━━━━━━━━━━━\n` +
        `• Name: ${orderData.customerName}\n` +
        `• WhatsApp: ${orderData.customerWhatsapp}\n` +
        `• Address: ${orderData.customerAddress}\n\n` +
        `*DELIVERY INFO*\n` +
        `━━━━━━━━━━━━━━━━\n` +
        `• Location: ${orderData.deliveryTo || orderData.customerAddress}\n` +
        `• Preferred Date: ${orderData.deliveryDate ? new Date(orderData.deliveryDate).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" }) : "Not specified"}\n\n`;

      if (orderData.notes) {
        message += `*SPECIAL NOTES*\n${orderData.notes}\n\n`;
      }

      message += `━━━━━━━━━━━━━━━━\n✅ Order Confirmed!`;

      const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || "+94702923943";
      const whatsappUrl = `https://wa.me/${whatsappNumber.replace("+", "")}?text=${encodeURIComponent(message)}`;

      // Open WhatsApp message with order details
      window.open(whatsappUrl, "_blank");

      console.log("✅ WhatsApp summary sent successfully");
    } catch (error) {
      console.error("❌ Error sending WhatsApp summary:", error);
      alert(
        "WhatsApp summary could not be sent, but your order was saved successfully!",
      );
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
        packageType: orderData.packageType || 'free',
        customerName: orderData.customerName,
        customerAddress: orderData.customerAddress,
        customerWhatsapp: orderData.customerWhatsapp,
        deliveryTo: orderData.deliveryTo || orderData.customerAddress,
        deliveryDate: orderData.deliveryDate || null,
        backgroundColor: orderData.backgroundColor || null,
        notes: orderData.notes || null,
      };

      // Save order to database
      const result = await databaseService.saveOrder(orderPayload);

      // Send WhatsApp summary
      if (result.success && result.data?.id) {
        await sendWhatsAppSummary(orderData, result.data.id);
      } else {
        alert("Order save failed: " + (result.message || "Unknown error"));
        return;
      }

      alert(
        `Order submitted successfully! Your order ID is: ${result.data?.id}`,
      );

      // Reset form or redirect
      setCurrentStep(1);
      setOrderData({
        categoryId: "",
        designSampleId: "",
        frameTypeId: "",
        sizeId: "",
        frameColorId: "",
        numberOfPersons: 1,
        packageType: "free",
        customerName: "",
        customerAddress: "",
        customerWhatsapp: "",
        deliveryTo: "",
        deliveryDate: "",
        backgroundColor: "",
        notes: "",
      });
    } catch (error) {
      console.error("Error submitting order:", error);
      alert("Error submitting order. Please try again.");
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="form-step">
            <div className="mb-8">
              <h3 className="mb-4 text-2xl font-semibold text-center text-green-3">
                {t.order?.selectCategory || "Choose Your Style"}
              </h3>
              <p className="mb-8 leading-relaxed text-center text-gray-600">
                Select the photo frame style that best matches your vision
              </p>
            </div>

            {loading ? (
              <div className="text-center">
                <p className="text-gray-500">Loading categories...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-2 xl:grid-cols-4">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    onClick={() => handleInputChange("categoryId", category.id)}
                    className={`category-card transform cursor-pointer overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:scale-105 ${
                      orderData.categoryId == category.id
                        ? "bg-green-50 shadow-2xl ring-4 ring-green-2"
                        : "bg-white hover:shadow-xl"
                    }`}
                  >
                    <div className="relative">
                      <img
                        src={getCategorySampleImage(category.name, category.id)}
                        alt={category.name}
                        className={`h-40 w-full object-cover transition-all duration-300 sm:h-48 ${
                          orderData.categoryId == category.id
                            ? "brightness-110"
                            : ""
                        }`}
                      />
                      {orderData.categoryId == category.id && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="p-3 text-white rounded-full shadow-xl animate-pulse bg-green-2">
                            <svg
                              className="w-8 h-8"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        </div>
                      )}
                      {/* Category type badge */}
                      <div className="absolute px-2 py-1 text-xs text-white bg-black rounded bottom-2 left-2 bg-opacity-60">
                        Click to Select
                      </div>
                    </div>
                    <div className="p-4 bg-white">
                      <h4 className="mb-2 text-lg font-semibold text-gray-800">
                        {category.name}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {category.description ||
                          "Beautiful custom photo frames in this style"}
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
                <p className="inline-block px-4 py-3 font-medium rounded-lg bg-green-50 text-green-2">
                  ✓ Selected:{" "}
                  {categories.find((c) => c.id == orderData.categoryId)?.name}
                </p>
              </div>
            )}
          </div>
        );

      case 2:
        return (
          <div className="space-y-6 form-step">
            {/* Number of Persons - Only for Oil Painting and Cute Collections */}
            {orderData.categoryId && (() => {
              const selectedCategory = categories.find(
                (cat) => cat.id === parseInt(orderData.categoryId)
              );
              const categoryCode = selectedCategory?.code;
              return categoryCode === 'OIL' || categoryCode === 'CUTE' ? (
                <div className="form-group">
                  <label className="block mb-3 font-medium text-green-3">
                    {t.order?.fields?.numberOfPersons || "Number of Persons"}
                    <span className="ml-2 text-sm font-normal text-gray-500">
                      (+Rs. 450 per additional person)
                    </span>
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={orderData.numberOfPersons}
                    onChange={(e) =>
                      handleInputChange("numberOfPersons", parseInt(e.target.value))
                    }
                    className="w-full p-4 border border-gray-300 rounded-lg focus:border-transparent focus:ring-2 focus:ring-green-2"
                  />
                </div>
              ) : null;
            })()}

            {/* Background Color - Only for Oil Painting and Cute Collections */}
            {orderData.categoryId && (() => {
              const selectedCategory = categories.find(
                (cat) => cat.id === parseInt(orderData.categoryId)
              );
              const categoryCode = selectedCategory?.code;
              return categoryCode === 'OIL' || categoryCode === 'CUTE' ? (
                <div className="form-group">
                  <label className="block mb-3 font-medium text-green-3">
                    {t.order?.fields?.backgroundColor || "Background Color"}{" "}
                    <span className="text-sm font-normal text-gray-500">
                      (Optional)
                    </span>
                  </label>
                  <div className="flex items-center space-x-4">
                    <input
                      type="color"
                      value={orderData.backgroundColor || "#ffffff"}
                      onChange={(e) =>
                        handleInputChange("backgroundColor", e.target.value)
                      }
                      className="w-16 h-12 border border-gray-300 rounded-lg cursor-pointer"
                    />
                    <div className="flex-1">
                      <input
                        type="text"
                        value={orderData.backgroundColor || ""}
                        onChange={(e) =>
                          handleInputChange("backgroundColor", e.target.value)
                        }
                        placeholder={
                          t.order?.fields?.selectBackgroundColor ||
                          "#ffffff or color name"
                        }
                        className="w-full p-4 border border-gray-300 rounded-lg focus:border-transparent focus:ring-2 focus:ring-green-2"
                      />
                    </div>
                  </div>
                </div>
              ) : null;
            })()}

            {/* Delivery Fee Notice - Only for Mini Frames */}
            {orderData.categoryId && (() => {
              const selectedCategory = categories.find(
                (cat) => cat.id === parseInt(orderData.categoryId)
              );
              const categoryCode = selectedCategory?.code;
              return categoryCode === 'MINI' ? (
                <div className="p-4 border-l-4 border-blue-400 rounded-lg bg-blue-50">
                  <div className="flex items-start">
                    <svg className="flex-shrink-0 w-5 h-5 mt-0.5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-blue-800">
                        📦 Delivery Fee Applicable
                      </p>
                      <p className="mt-1 text-sm text-blue-700">
                        Mini Frames category includes a delivery fee of <strong>Rs. 450</strong>
                      </p>
                    </div>
                  </div>
                </div>
              ) : null;
            })()}

            {/* Design Selection - Only for 100 Designs category */}
            {orderData.categoryId && (() => {
              const selectedCategory = categories.find(
                (cat) => cat.id === parseInt(orderData.categoryId)
              );
              const categoryCode = selectedCategory?.code;
              return categoryCode === 'HUNDRED' ? (
                <div className="form-group">
                  <DesignGallery
                    onSelectDesign={(designNum) => handleInputChange("designSampleId", designNum)}
                    selectedDesignId={orderData.designSampleId}
                  />
                </div>
              ) : null;
            })()}

            {/* Frame Type Selection - Visual Card Selection */}
            <div className="form-group">
              <div className="mb-6 text-center">
                <h3 className="mb-2 text-2xl font-bold text-green-3">
                  {t.order?.fields?.frameType || "Select Frame Type"}
                </h3>
                <p className="text-gray-600">
                  {!orderData.categoryId 
                    ? (t.order?.fields?.pleaseSelectCategory || "Please select a category first")
                    : "Click on a frame to see preview and select"
                  }
                </p>
              </div>

              {orderData.categoryId ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
                  {frameTypes.map((frameType) => {
                    const isSelected = orderData.frameTypeId == frameType.id;
                    
                    return (
                      <div
                        key={frameType.id}
                        onClick={() => handleInputChange("frameTypeId", frameType.id)}
                        className={`transform cursor-pointer overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:scale-105 ${
                          isSelected
                            ? "bg-green-50 shadow-2xl ring-4 ring-green-2"
                            : "bg-white hover:shadow-xl"
                        }`}
                      >
                        <div className="relative">
                          {/* Frame Image Preview */}
                          <div className="relative flex items-center justify-center h-48 overflow-hidden bg-gray-100">
                            {(() => {
                              // For Fiber frames, show default image (user will select color after)
                              const frameImage = frameType.allows_color 
                                ? getFrameImage(frameType.name, 'Black', language)
                                : getFrameImage(frameType.name, null, language);
                              
                              if (frameImage) {
                                return (
                                  <img
                                    src={frameImage}
                                    alt={frameType.name}
                                    className={`w-full h-full object-contain p-2 transition-all duration-300 ${
                                      isSelected ? "brightness-110 scale-105" : ""
                                    }`}
                                    onError={(e) => {
                                      e.target.style.display = 'none';
                                    }}
                                  />
                                );
                              } else {
                                // Fallback icon if no image
                                return (
                                  <div className="flex flex-col items-center justify-center text-gray-400">
                                    <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
                                      <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                                    </svg>
                                    <p className="mt-2 text-sm">Preview</p>
                                  </div>
                                );
                              }
                            })()}
                          </div>
                          
                          {/* Selected Checkmark */}
                          {isSelected && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-10">
                              <div className="p-3 text-white rounded-full shadow-xl animate-pulse bg-green-2">
                                <svg
                                  className="w-8 h-8"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </div>
                            </div>
                          )}
                          
                          {/* Badge */}
                          <div className="absolute px-2 py-1 text-xs text-white bg-black rounded bottom-2 left-2 bg-opacity-60">
                            Click to Select
                          </div>
                        </div>
                        
                        {/* Frame Details */}
                        <div className="p-4 bg-white">
                          <h4 className="mb-1 text-lg font-semibold text-gray-800">
                            {frameType.name}
                          </h4>
                          <p className="text-sm text-gray-600">
                            Material: {frameType.material}
                          </p>
                          {frameType.allows_color && (
                            <p className="mt-1 text-xs text-green-600">
                              ✓ Multiple colors available
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="p-8 text-center border-2 border-gray-300 border-dashed rounded-lg bg-gray-50">
                  <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="mt-4 text-gray-600">
                    {t.order?.fields?.pleaseSelectCategory || "Please select a category first"}
                  </p>
                </div>
              )}

              {orderData.frameTypeId && (
                <div className="mt-6 text-center">
                  <p className="inline-block px-4 py-3 font-medium rounded-lg bg-green-50 text-green-2">
                    ✓ Selected:{" "}
                    {frameTypes.find((ft) => ft.id == orderData.frameTypeId)?.name}
                  </p>
                </div>
              )}
            </div>

            {/* Frame Color - Only show for Fiber frames (frames that allow color) */}
            {orderData.frameTypeId && (() => {
              const selectedFrameType = frameTypes.find(
                (ft) => ft.id === parseInt(orderData.frameTypeId)
              );
              return selectedFrameType?.allows_color ? (
                <div className="form-group">
                  <label className="block mb-3 font-medium text-green-3">
                    Frame Color{" "}
                    <span className="text-sm font-normal text-gray-500">
                      (Optional)
                    </span>
                  </label>
                  <select
                    value={orderData.frameColorId}
                    onChange={(e) =>
                      handleInputChange("frameColorId", e.target.value)
                    }
                    className="w-full p-4 border border-gray-300 rounded-lg focus:border-transparent focus:ring-2 focus:ring-green-2"
                  >
                    <option value="">Choose color (optional)...</option>
                    {frameColors.map((color) => (
                      <option key={color.id} value={color.id}>
                        {color.name}
                      </option>
                    ))}
                  </select>
                </div>
              ) : null;
            })()}

            {/* Frame Preview with Zoom - Show selected frame with color */}
            {orderData.frameTypeId && (() => {
              const selectedFrameType = frameTypes.find(
                (ft) => ft.id === parseInt(orderData.frameTypeId)
              );
              const selectedColor = frameColors.find(
                (c) => c.id === parseInt(orderData.frameColorId)
              );
              
              // For frames with color options, show preview only after color is selected
              // For frames without color options, show preview immediately
              const shouldShowPreview = selectedFrameType?.allows_color 
                ? orderData.frameColorId 
                : true;
              
              if (!shouldShowPreview) {
                return (
                  <div className="form-group">
                    <div className="p-4 text-center border-2 border-gray-300 border-dashed rounded-lg bg-gray-50">
                      <p className="text-gray-600">
                        👆 {language === 'si' 
                          ? 'රාමුවේ පෙරදසුන බැලීමට වර්ණයක් තෝරන්න' 
                          : 'Select a color above to see detailed frame preview'}
                      </p>
                    </div>
                  </div>
                );
              }
              
              const frameImage = getFrameImage(
                selectedFrameType?.name,
                selectedColor?.name,
                language
              );
              
              // Show detailed preview with zoom if image is available
              if (frameImage) {
                return (
                  <div className="form-group">
                    <label className="block mb-3 text-lg font-medium text-center text-green-3">
                      🖼️ {language === 'si' ? 'රාමු පෙරදසුන' : 'Frame Preview'}
                    </label>
                    <div className="relative max-w-md p-4 mx-auto bg-white border-2 shadow-xl rounded-xl border-green-2 group">
                      <div 
                        className="relative cursor-pointer"
                        onClick={() => setFramePreviewModal(frameImage)}
                      >
                        <img
                          src={frameImage}
                          alt={`${selectedFrameType?.name} ${selectedColor?.name || ''}`}
                          className="object-contain w-full h-auto transition-transform rounded-lg shadow-md max-h-64 group-hover:scale-105"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            console.error('Frame image failed to load');
                          }}
                        />
                        {/* Zoom Icon Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center transition-all bg-black bg-opacity-0 rounded-lg group-hover:bg-opacity-20">
                          <div className="p-3 transition-opacity bg-black rounded-full opacity-0 bg-opacity-70 group-hover:opacity-100">
                            <svg
                              className="w-8 h-8 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 text-center">
                        <p className="text-base font-semibold text-gray-800">
                          {selectedFrameType?.name}
                          {selectedColor && ` - ${selectedColor.name}`}
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                          {language === 'si' ? '🔍 විශාල කිරීමට ක්ලික් කරන්න' : '🔍 Click to zoom and see details'}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              }
              
              return null;
            })()}

            <div className="form-group">
              <label className="block mb-3 font-medium text-green-3">
                Size
              </label>
              
              {!orderData.frameTypeId ? (
                <div className="w-full p-4 text-gray-500 border border-gray-300 rounded-lg bg-gray-50">
                  Please select a frame type first
                </div>
              ) : (
                <div className="space-y-2">
                  {sizes.map((size) => {
                    const priceInfo = sizePrices[size.id];
                    const isSelected = orderData.sizeId === String(size.id);
                    
                    return (
                      <button
                        key={size.id}
                        type="button"
                        onClick={() => handleInputChange("sizeId", String(size.id))}
                        className={`w-full flex items-center justify-between p-4 rounded-lg border-2 transition-all ${
                          isSelected
                            ? "border-green-2 bg-green-50"
                            : "border-gray-200 hover:border-green-2 hover:bg-gray-50"
                        }`}
                      >
                        <span className="font-medium text-left text-gray-700">
                          {size.display} 
                          <span className="ml-2 text-sm text-gray-500">
                            ({size.width} x {size.height} {size.unit})
                          </span>
                        </span>
                        {priceInfo && (
                          <span className={`text-right font-bold ${
                            isSelected ? "text-green-3" : "text-gray-700"
                          }`}>
                            LKR {priceInfo.final_price.toLocaleString()}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
              
              {/* Display selected size price information */}
              {orderData.sizeId && sizePrices[orderData.sizeId] && (() => {
                const priceInfo = sizePrices[orderData.sizeId];
                const categoryCode = categories.find(c => c.id === orderData.categoryId)?.code;
                const isCuteCollection = categoryCode === 'CUTE';
                
                // Base price - use final_price which now includes +450 for Cute Collection
                const basePrice = priceInfo.final_price || priceInfo.price_lkr || 0;
                
                // Per-person charge (for Oil and Cute)
                const needsPersonCharge = categoryCode === 'OIL' || categoryCode === 'CUTE';
                const personCharge = needsPersonCharge && orderData.numberOfPersons > 1 
                  ? (orderData.numberOfPersons - 1) * 450 
                  : 0;
                
                // Premium package charge
                const packageCharge = orderData.packageType === 'premium' ? 450 : 0;
                
                // Mini Frames delivery fee
                const deliveryFee = categoryCode === 'MINI' ? 450 : 0;
                
                const totalPrice = basePrice + personCharge + packageCharge + deliveryFee;
                
                return (
                  <div className="p-4 mt-4 border border-green-200 rounded-lg bg-green-50">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-700">
                          Selected Size Price
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                          {priceInfo.category_name || (isCuteCollection ? 'Cute Collections' : '')}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-green-3">
                          LKR {totalPrice.toLocaleString()}
                        </p>
                        <div className="mt-1 text-xs text-gray-500">
                          {isCuteCollection ? (
                            <>
                              <p>
                                Frame: LKR {(basePrice - 450).toLocaleString()} + 
                                LKR 450 (Cute Collection)
                              </p>
                            </>
                          ) : (
                            priceInfo.price_increment > 0 && (
                              <p>
                                Base: LKR {priceInfo.base_price.toLocaleString()} + 
                                LKR {priceInfo.price_increment.toLocaleString()} (category)
                              </p>
                            )
                          )}
                          {personCharge > 0 && (
                            <p>
                              + LKR {personCharge.toLocaleString()} ({orderData.numberOfPersons - 1} additional {orderData.numberOfPersons - 1 === 1 ? 'person' : 'persons'})
                            </p>
                          )}
                          {packageCharge > 0 && (
                            <p>
                              + LKR {packageCharge.toLocaleString()} (Premium Package)
                            </p>
                          )}
                          {deliveryFee > 0 && (
                            <p>
                              + LKR {deliveryFee.toLocaleString()} (Delivery Fee)
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6 form-step">
            <div className="form-group">
              <label className="block mb-3 font-medium text-green-3">
                {t.order?.fields?.fullName || "Full Name"}
              </label>
              <input
                type="text"
                value={orderData.customerName}
                onChange={(e) =>
                  handleInputChange("customerName", e.target.value)
                }
                className="w-full p-4 border border-gray-300 rounded-lg focus:border-transparent focus:ring-2 focus:ring-green-2"
                placeholder={
                  t.order?.fields?.enterFullName || "Enter your full name"
                }
              />
            </div>
            <div className="form-group">
              <label className="block mb-3 font-medium text-green-3">
                {t.order?.fields?.whatsappNumber || "WhatsApp Number"}
              </label>
              <input
                type="tel"
                value={orderData.customerWhatsapp}
                onChange={(e) =>
                  handleInputChange("customerWhatsapp", e.target.value)
                }
                className="w-full p-4 border border-gray-300 rounded-lg focus:border-transparent focus:ring-2 focus:ring-green-2"
                placeholder={
                  t.order?.fields?.enterWhatsappNumber ||
                  "Enter your WhatsApp number"
                }
              />
            </div>
            <div className="form-group">
              <label className="block mb-3 font-medium text-green-3">
                {t.order?.fields?.customerAddress || "Customer Address"}
              </label>
              <textarea
                value={orderData.customerAddress}
                onChange={(e) =>
                  handleInputChange("customerAddress", e.target.value)
                }
                className="w-full p-4 border border-gray-300 rounded-lg resize-none focus:border-transparent focus:ring-2 focus:ring-green-2"
                rows="3"
                placeholder={
                  t.order?.fields?.enterCompleteAddress ||
                  "Enter your complete address"
                }
              />
            </div>

            {/* Package Selection */}
            <div className="form-group">
              <label className="block mb-3 font-medium text-green-3">
                {t.order?.fields?.packageType || "Package Type"}
              </label>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {/* Free Package */}
                <button
                  type="button"
                  onClick={() => handleInputChange("packageType", "free")}
                  className={`relative overflow-hidden rounded-xl border-4 transition-all duration-200 ${
                    orderData.packageType === "free"
                      ? "border-green-3 shadow-lg scale-105"
                      : "border-gray-200 hover:border-green-2"
                  }`}
                >
                  <img
                    src={freePackageImg}
                    alt="Free Delivery Package"
                    className="object-cover w-full h-48"
                  />
                  <div className={`absolute top-0 left-0 right-0 px-4 py-2 text-center font-bold text-white ${
                    orderData.packageType === "free" ? "bg-green-3" : "bg-gray-700 bg-opacity-70"
                  }`}>
                    Free Package
                  </div>
                  {orderData.packageType === "free" && (
                    <div className="absolute p-2 text-white rounded-full top-2 right-2 bg-green-3">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </button>

                {/* Premium Package */}
                <button
                  type="button"
                  onClick={() => handleInputChange("packageType", "premium")}
                  className={`relative overflow-hidden rounded-xl border-4 transition-all duration-200 ${
                    orderData.packageType === "premium"
                      ? "border-green-3 shadow-lg scale-105"
                      : "border-gray-200 hover:border-green-2"
                  }`}
                >
                  <img
                    src={premiumPackageImg}
                    alt="Premium Package"
                    className="object-cover w-full h-48"
                  />
                  <div className={`absolute top-0 left-0 right-0 px-4 py-2 text-center font-bold text-white ${
                    orderData.packageType === "premium" ? "bg-green-3" : "bg-gray-700 bg-opacity-70"
                  }`}>
                    Premium Package
                    <span className="block text-sm font-normal">+Rs. 450</span>
                  </div>
                  {orderData.packageType === "premium" && (
                    <div className="absolute p-2 text-white rounded-full top-2 right-2 bg-green-3">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label className="block mb-3 font-medium text-green-3">
                {t.order?.fields?.deliveryLocation || "Delivery Location"}
              </label>
              <select
                value={orderData.deliveryTo}
                onChange={(e) =>
                  handleInputChange("deliveryTo", e.target.value)
                }
                className="w-full p-4 border border-gray-300 rounded-lg focus:border-transparent focus:ring-2 focus:ring-green-2"
              >
                <option value="">
                  {t.order?.fields?.selectDeliveryLocation ||
                    "Select delivery location"}
                </option>
                <option value="Sri Lanka">
                  {t.order?.fields?.sriLanka || "Sri Lanka"}
                </option>
                <option value="Abroad">
                  {t.order?.fields?.abroad || "Abroad"}
                </option>
              </select>
            </div>
            <div className="form-group">
              <label className="block mb-3 font-medium text-green-3">
                {t.order?.fields?.preferredDeliveryDate ||
                  "Preferred Delivery Date"}
              </label>
              <div className="relative">
                <DatePicker
                  selected={orderData.deliveryDate ? new Date(orderData.deliveryDate) : null}
                  onChange={(date) => {
                    if (date) {
                      // Format date as YYYY-MM-DD for consistency
                      const year = date.getFullYear();
                      const month = String(date.getMonth() + 1).padStart(2, '0');
                      const day = String(date.getDate()).padStart(2, '0');
                      handleInputChange("deliveryDate", `${year}-${month}-${day}`);
                    } else {
                      handleInputChange("deliveryDate", "");
                    }
                  }}
                  minDate={(() => {
                    const today = new Date();
                    today.setDate(today.getDate() + 4); // 4 days from today
                    return today;
                  })()}
                  dateFormat="MMMM d, yyyy (EEEE)"
                  placeholderText="Select delivery date"
                  className="w-full p-4 text-lg transition-colors border-2 border-gray-300 rounded-lg cursor-pointer focus:border-green-3 focus:ring-2 focus:ring-green-2 hover:border-green-2"
                  calendarClassName="custom-calendar"
                  wrapperClassName="w-full"
                  showPopperArrow={false}
                  isClearable
                />
              </div>
              <p className="p-3 mt-2 text-sm text-gray-500 border border-blue-200 rounded-lg bg-blue-50">
                📅{" "}
                {t.order?.fields?.deliveryAvailableFrom ||
                  "Delivery available from"}{" "}
                <span className="font-semibold text-green-3">
                {(() => {
                  const minDate = new Date();
                  minDate.setDate(minDate.getDate() + 4);
                  return minDate.toLocaleDateString(
                    language === "si" ? "si-LK" : "en-US",
                    {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    },
                  );
                })()}
                </span>{" "}
                {t.order?.fields?.onwards || "onwards"}
              </p>
            </div>
            <div className="form-group">
              <label className="block mb-3 font-medium text-green-3">
                {t.order?.fields?.specialInstructionsOptional ||
                  "Special Instructions (Optional)"}
              </label>
              <textarea
                value={orderData.notes}
                onChange={(e) => handleInputChange("notes", e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-lg resize-none focus:border-transparent focus:ring-2 focus:ring-green-2"
                rows="3"
                placeholder={
                  t.order?.fields?.anySpecialInstructions ||
                  "Any special instructions for your order"
                }
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6 form-step">
            <div className="p-6 rounded-lg bg-gray-50">
              <h3 className="mb-4 text-lg font-semibold text-green-3">
                {t.order?.fields?.orderSummary || "Order Summary"}
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between py-1">
                  <span>{t.order?.fields?.category || "Category"}:</span>
                  <span className="font-medium">
                    {categories.find((c) => c.id == orderData.categoryId)
                      ?.name ||
                      t.order?.fields?.notSelected ||
                      "Not selected"}
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span>{t.order?.fields?.frameType2 || "Frame Type"}:</span>
                  <span className="font-medium">
                    {frameTypes.find((f) => f.id == orderData.frameTypeId)
                      ?.name ||
                      t.order?.fields?.notSelected ||
                      "Not selected"}
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span>{t.order?.fields?.size2 || "Size"}:</span>
                  <span className="font-medium">
                    {sizes.find((s) => s.id == orderData.sizeId)?.display ||
                      t.order?.fields?.notSelected ||
                      "Not selected"}
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span>{t.order?.fields?.color || "Color"}:</span>
                  <span className="font-medium">
                    {frameColors.find((c) => c.id == orderData.frameColorId)
                      ?.name ||
                      t.order?.fields?.notSelected ||
                      "Not selected"}
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span>
                    {t.order?.fields?.numberOfPersons2 || "Number of Persons"}:
                  </span>
                  <span className="font-medium">
                    {orderData.numberOfPersons}
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span>
                    {t.order?.fields?.backgroundColor2 || "Background Color"}:
                  </span>
                  <span className="flex items-center gap-2 font-medium">
                    {orderData.backgroundColor ? (
                      <>
                        <div
                          className="w-4 h-4 border border-gray-300 rounded"
                          style={{ backgroundColor: orderData.backgroundColor }}
                        ></div>
                        {orderData.backgroundColor}
                      </>
                    ) : (
                      t.order?.fields?.notSpecified || "Not specified"
                    )}
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span>Package Type:</span>
                  <span className="font-medium capitalize">
                    {orderData.packageType === 'premium' ? '✨ Premium Package' : '📦 Free Package'}
                  </span>
                </div>
              </div>
            </div>

            {/* Total Price Display */}
            {orderData.sizeId && sizePrices[orderData.sizeId] && (() => {
              const priceInfo = sizePrices[orderData.sizeId];
              const categoryCode = categories.find(c => c.id === orderData.categoryId)?.code;
              const isCuteCollection = categoryCode === 'CUTE';
              
              // Base price (for Cute Collection, final_price already includes +450)
              const basePrice = priceInfo.final_price || priceInfo.price_lkr || 0;
              
              // Per-person charge
              const needsPersonCharge = categoryCode === 'OIL' || categoryCode === 'CUTE';
              const personCharge = needsPersonCharge && orderData.numberOfPersons > 1 
                ? (orderData.numberOfPersons - 1) * 450 
                : 0;
              
              // Premium package charge
              const packageCharge = orderData.packageType === 'premium' ? 450 : 0;
              
              // Mini Frames delivery fee
              const deliveryFee = categoryCode === 'MINI' ? 450 : 0;
              
              const totalPrice = basePrice + personCharge + packageCharge + deliveryFee;
              
              return (
                <div className="p-6 border-2 rounded-lg bg-green-50 border-green-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-semibold text-green-3">Total Price</h4>
                    <div className="text-right">
                      <p className="text-3xl font-bold text-green-3">
                        LKR {totalPrice.toLocaleString()}
                      </p>
                      <div className="mt-2 space-y-1 text-xs text-gray-600">
                        {isCuteCollection ? (
                          <>
                            <p>Frame: LKR {(basePrice - 450).toLocaleString()}</p>
                            <p>Cute Collection: + LKR 450</p>
                          </>
                        ) : (
                          <>
                            <p>Base: LKR {(priceInfo.base_price || basePrice).toLocaleString()}</p>
                            {priceInfo.price_increment > 0 && (
                              <p>Category Charge: + LKR {priceInfo.price_increment.toLocaleString()}</p>
                            )}
                          </>
                        )}
                        {personCharge > 0 && (
                          <p>Additional Persons: + LKR {personCharge.toLocaleString()} ({orderData.numberOfPersons - 1} × Rs. 450)</p>
                        )}
                        {packageCharge > 0 && (
                          <p>Premium Package: + LKR {packageCharge.toLocaleString()}</p>
                        )}
                        {deliveryFee > 0 && (
                          <p>Delivery Fee: + LKR {deliveryFee.toLocaleString()}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}

            <div className="p-6 rounded-lg bg-blue-50">
              <h4 className="mb-4 font-semibold text-green-3">
                {t.order?.fields?.customerInformation || "Customer Information"}
              </h4>
              <div className="space-y-2 text-sm">
                <p>
                  <strong>{t.order?.fields?.name2 || "Name"}:</strong>{" "}
                  {orderData.customerName}
                </p>
                <p>
                  <strong>{t.order?.fields?.whatsapp || "WhatsApp"}:</strong>{" "}
                  {orderData.customerWhatsapp}
                </p>
                <p>
                  <strong>{t.order?.fields?.address || "Address"}:</strong>{" "}
                  {orderData.customerAddress}
                </p>
                <p>
                  <strong>
                    {t.order?.fields?.deliveryLocation2 || "Delivery Location"}:
                  </strong>{" "}
                  {orderData.deliveryTo ||
                    t.order?.fields?.notSpecified ||
                    "Not specified"}
                </p>
                <p>
                  <strong>
                    {t.order?.fields?.deliveryDate2 || "Delivery Date"}:
                  </strong>{" "}
                  {orderData.deliveryDate
                    ? new Date(orderData.deliveryDate).toLocaleDateString(
                        "en-US",
                        {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        },
                      )
                    : t.order?.fields?.notSpecified || "Not specified"}
                </p>
              </div>
            </div>

            <div className="form-group">
              <label className="block mb-3 font-medium text-green-3">
                {t.order?.fields?.specialInstructions || "Special Instructions"}{" "}
                <span className="text-sm font-normal text-gray-500">
                  ({t.order?.fields?.optional || "Optional"})
                </span>
              </label>
              <textarea
                value={orderData.notes}
                onChange={(e) => handleInputChange("notes", e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-lg resize-none focus:border-transparent focus:ring-2 focus:ring-green-2"
                rows="3"
                placeholder={
                  t.order?.fields?.specialInstructionsPlaceholder ||
                  "Any special instructions for your order..."
                }
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen py-8 bg-gray-light">
      <div className="px-5 mx-auto max-w-container">
        {/* Header with back button */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => onPageChange && onPageChange("home")}
            className="flex items-center gap-2 transition-colors text-green-2 hover:text-green-1"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Home
          </button>
        </div>

        <div className="mb-8 text-center">
          <h1 className="mb-2 text-4xl font-bold text-green-3">
            {t.order?.title || "Order Your Frame"}
          </h1>
          <p className="text-gray-600">
            {t.order?.subtitle ||
              "Create your perfect custom frame in just a few steps"}
          </p>
        </div>

        <div className="max-w-4xl p-8 mx-auto bg-white shadow-lg rounded-custom">
          {/* Progress Steps */}
          <div className="relative flex justify-between mb-10">
            {steps.map((step, index) => (
              <div key={step.id} className="relative flex-1 text-center">
                <div
                  className={`mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full text-sm font-semibold ${
                    currentStep >= step.id
                      ? "bg-green-2 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {step.id}
                </div>
                <div
                  className={`px-2 text-sm font-medium ${
                    currentStep >= step.id ? "text-green-2" : "text-gray-500"
                  }`}
                >
                  {step.name}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`absolute left-1/2 top-6 h-0.5 w-full ${
                      currentStep > step.id ? "bg-green-2" : "bg-gray-200"
                    }`}
                    style={{ zIndex: -1 }}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Form Content */}
          <div className="mb-8">{renderStep()}</div>

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6 mt-8 border-t border-gray-200">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`rounded-lg px-8 py-4 font-semibold transition-colors ${
                currentStep === 1
                  ? "cursor-not-allowed bg-gray-200 text-gray-500"
                  : "bg-gray-300 text-gray-700 hover:bg-gray-400"
              }`}
            >
              {t.order?.buttons?.previous || "Previous"}
            </button>

            {currentStep < 4 ? (
              <button
                onClick={nextStep}
                className="px-8 py-4 font-semibold text-white transition-colors rounded-lg bg-green-2 hover:bg-green-1"
              >
                {t.order?.buttons?.nextStep || "Next Step"}
              </button>
            ) : (
              <button
                onClick={submitOrder}
                className="px-10 py-4 font-semibold text-white transition-colors rounded-lg bg-green-1 hover:bg-green-3"
              >
                {t.order?.buttons?.placeOrder || "Place Order"}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Frame Preview Modal - Click to zoom */}
      {framePreviewModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-90"
          onClick={() => setFramePreviewModal(null)}
        >
          <div className="relative max-h-[80vh] max-w-2xl w-full">
            <img
              src={framePreviewModal}
              alt="Frame preview"
              className="h-auto w-full rounded-lg shadow-2xl object-contain max-h-[80vh]"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={() => setFramePreviewModal(null)}
              className="absolute p-2 text-gray-700 transition-colors bg-white rounded-full shadow-lg -right-4 -top-4 hover:bg-gray-100"
              aria-label="Close preview"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderPage;
