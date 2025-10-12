import React, { useState, useEffect } from "react";
import { databaseService } from "../services/databaseService";

// Import sample images for categories
import oilPaintSample from "../assets/oil paint collection/4.jpg";
import ghibliSample from "../assets/Ghibli collection/5.jpg";
import miniFrameSample from "../assets/mini frames/3.jpg";
import portraitSample from "../assets/oil paint collection/7.jpg";
// Additional samples for variety
import ghibliSample2 from "../assets/Ghibli collection/8.jpg";
import oilPaintSample2 from "../assets/oil paint collection/6.jpg";

const OrderPage = ({ language, translations, onPageChange }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [orderData, setOrderData] = useState({
    categoryId: "",
    designSampleId: "",
    frameTypeId: "",
    sizeId: "",
    frameColorId: "",
    numberOfPersons: 1,
    customerName: "",
    customerAddress: "",
    customerWhatsapp: "",
    deliveryTo: "",
    deliveryDate: "",
    backgroundColor: "",
    imageUrl: "",
    notes: "",
  });

  // Data from database
  const [categories, setCategories] = useState([]);
  const [frameTypes, setFrameTypes] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [frameColors, setFrameColors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);

  const t = translations[language];

  // Category sample images mapping
  const getCategorySampleImage = (categoryName, categoryId) => {
    const name = categoryName?.toLowerCase() || "";

    // Map based on common category names
    if (name.includes("oil") || name.includes("paint")) return oilPaintSample;
    if (
      name.includes("ghibli") ||
      name.includes("anime") ||
      name.includes("cartoon")
    )
      return ghibliSample;
    if (
      name.includes("mini") ||
      name.includes("small") ||
      name.includes("compact")
    )
      return miniFrameSample;
    if (
      name.includes("portrait") ||
      name.includes("classic") ||
      name.includes("traditional")
    )
      return portraitSample;
    if (name.includes("wedding") || name.includes("special"))
      return ghibliSample2;
    if (name.includes("family") || name.includes("group"))
      return oilPaintSample2;

    // Fallback based on category ID for consistent assignment
    const samples = [
      oilPaintSample,
      ghibliSample,
      miniFrameSample,
      portraitSample,
    ];
    return samples[categoryId % samples.length] || oilPaintSample;
  };

  const steps = [
    { id: 1, name: t.order?.steps?.category || "Category" },
    { id: 2, name: t.order?.steps?.details || "Preferences" },
    { id: 3, name: t.order?.steps?.frame || "Frame & Size" },
    { id: 4, name: t.order?.steps?.delivery || "Delivery" },
    { id: 5, name: t.order?.steps?.confirm || "Confirm" },
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
        setCategories(result.data);
      }
    } catch (error) {
      console.error("Error loading categories:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadFrameTypes = async (categoryId) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/frame-types/${categoryId}`,
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
      }
    } catch (error) {
      console.error("Error loading sizes:", error);
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
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Convert to base64 for preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target.result);
        handleInputChange("imageUrl", e.target.result); // Store base64 in orderData
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setUploadedImage(null);
    handleInputChange("imageUrl", "");
  };

  const nextStep = () => {
    // Validation based on current step
    if (currentStep === 1 && !orderData.categoryId) {
      alert("Please select a category");
      return;
    }
    if (currentStep === 2) {
      // Step 2 now has preferences - no required validation for background color or image
    }
    if (currentStep === 3 && !orderData.frameTypeId) {
      alert("Please select a frame type");
      return;
    }
    if (currentStep === 3 && !orderData.sizeId) {
      alert("Please select a size");
      return;
    }
    if (
      currentStep === 4 &&
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
      console.log("📱 Preparing WhatsApp summary for order:", orderId);

      // Get selected names for better display
      const selectedCategory =
        categories.find((c) => c.id == orderData.categoryId)?.name || "Unknown";
      const selectedFrameType =
        frameTypes.find((f) => f.id == orderData.frameTypeId)?.name ||
        "Unknown";
      const selectedSize =
        sizes.find((s) => s.id == orderData.sizeId)?.display || "Unknown";
      const selectedColor =
        frameColors.find((c) => c.id == orderData.frameColorId)?.name ||
        "No color selected";

      // Create main order message
      let message =
        `🖼️ *New Photo Frame Order #${orderId}*\n\n` +
        `📋 *Order Details:*\n` +
        `• Category: ${selectedCategory}\n` +
        `• Frame Type: ${selectedFrameType}\n` +
        `• Size: ${selectedSize}\n` +
        `• Color: ${selectedColor}\n` +
        `• Number of Persons: ${orderData.numberOfPersons || 1}\n` +
        `• Background Color: ${orderData.backgroundColor || "Not specified"}\n\n` +
        ` *Delivery Information:*\n` +
        `• Name: ${orderData.customerName}\n` +
        `• Mobile: ${orderData.customerWhatsapp}\n` +
        `• Delivery Address: ${orderData.customerAddress}\n` +
        `• Delivery To: ${orderData.deliveryTo || orderData.customerAddress}\n` +
        `• Delivery Date: ${orderData.deliveryDate ? new Date(orderData.deliveryDate).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" }) : "Not specified"}\n\n` +
        `📝 *Notes:* ${orderData.notes || "None"}\n\n`;

      // Add image status
      if (orderData.imageUrl) {
        message += `📸 *Customer Image:* Attached (see next message)\n\n`;
      }

      message += `✅ Order received successfully!`;

      const whatsappNumber =
        import.meta.env.VITE_WHATSAPP_NUMBER || "+94702923943";
      const whatsappUrl = `https://wa.me/${whatsappNumber.replace("+", "")}?text=${encodeURIComponent(message)}`;

      // Open first WhatsApp message with order details
      window.open(whatsappUrl, "_blank");

      // If there's an image, open a second WhatsApp message after a delay
      if (orderData.imageUrl) {
        setTimeout(() => {
          const imageMessage =
            `📸 *Order #${orderId} - Customer Image*\n\n` +
            `Please find the customer's image below.\n` +
            `Copy and paste this image data, or ask the customer to send the image directly.\n\n` +
            `*Customer:* ${orderData.customerName}\n` +
            `*WhatsApp:* ${orderData.customerWhatsapp}\n\n` +
            `*Image Data:* ${orderData.imageUrl.substring(0, 100)}...\n\n` +
            `💡 *Tip:* You can ask the customer to send the image directly to this WhatsApp number.`;

          const imageWhatsappUrl = `https://wa.me/${whatsappNumber.replace("+", "")}?text=${encodeURIComponent(imageMessage)}`;

          // Show user the options
          const userChoice = confirm(
            `📤 Send Customer Image?\n\n` +
              `Option 1: Click OK to send image data via WhatsApp\n` +
              `Option 2: Click Cancel to copy image and paste manually\n\n` +
              `Note: For best results, ask customer to send image directly to seller's WhatsApp.`,
          );

          if (userChoice) {
            // Open WhatsApp with image data
            window.open(imageWhatsappUrl, "_blank");
          } else {
            // Copy image data to clipboard for manual paste
            try {
              navigator.clipboard.writeText(orderData.imageUrl).then(() => {
                alert(
                  `� Image Data Copied!\n\n` +
                    `The customer's image data has been copied to your clipboard.\n` +
                    `You can paste it in WhatsApp or any other application.\n\n` +
                    `💡 Alternative: Ask customer (${orderData.customerWhatsapp}) to send the image directly.`,
                );
              });
            } catch (clipboardError) {
              console.log("Clipboard not available:", clipboardError);
              // Fallback: show the image in a new window for manual handling
              const imageWindow = window.open("", "_blank");
              imageWindow.document.write(`
                <html>
                  <head><title>Order #${orderId} - Customer Image</title></head>
                  <body style="font-family: Arial, sans-serif; padding: 20px; text-align: center;">
                    <h2>Order #${orderId} - Customer Image</h2>
                    <p><strong>Customer:</strong> ${orderData.customerName}</p>
                    <p><strong>WhatsApp:</strong> ${orderData.customerWhatsapp}</p>
                    <img src="${orderData.imageUrl}" style="max-width: 100%; max-height: 80vh; border: 1px solid #ddd; border-radius: 8px;" />
                    <p style="margin-top: 20px; color: #666;">
                      Right-click the image above to copy or save it.<br>
                      Then paste/attach it in your WhatsApp conversation.
                    </p>
                  </body>
                </html>
              `);
            }
          }
        }, 3000); // Wait 3 seconds after first message
      }

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
        customerName: orderData.customerName,
        customerAddress: orderData.customerAddress,
        customerWhatsapp: orderData.customerWhatsapp,
        deliveryTo: orderData.deliveryTo || orderData.customerAddress,
        backgroundColor: orderData.backgroundColor || null,
        imageUrl: orderData.imageUrl || null,
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
        customerName: "",
        customerAddress: "",
        customerWhatsapp: "",
        deliveryTo: "",
        backgroundColor: "",
        imageUrl: "",
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
              <h3 className="mb-4 text-center text-2xl font-semibold text-green-3">
                {t.order?.selectCategory || "Choose Your Style"}
              </h3>
              <p className="mb-8 text-center leading-relaxed text-gray-600">
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
                        <div className="absolute inset-0 flex items-center justify-center bg-green-2 bg-opacity-20">
                          <div className="animate-pulse rounded-full bg-green-2 p-3 text-white shadow-lg">
                            <svg
                              className="h-6 w-6"
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
                      <div className="absolute bottom-2 left-2 rounded bg-black bg-opacity-60 px-2 py-1 text-xs text-white">
                        Click to Select
                      </div>
                    </div>
                    <div className="bg-white p-4">
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
                <p className="inline-block rounded-lg bg-green-50 px-4 py-3 font-medium text-green-2">
                  ✓ Selected:{" "}
                  {categories.find((c) => c.id == orderData.categoryId)?.name}
                </p>
              </div>
            )}
          </div>
        );

      case 2:
        return (
          <div className="form-step space-y-6">
            <div className="form-group">
              <label className="mb-3 block font-medium text-green-3">
                {t.order?.fields?.numberOfPersons || "Number of Persons"}
              </label>
              <input
                type="number"
                min="1"
                max="10"
                value={orderData.numberOfPersons}
                onChange={(e) =>
                  handleInputChange("numberOfPersons", parseInt(e.target.value))
                }
                className="w-full rounded-lg border border-gray-300 p-4 focus:border-transparent focus:ring-2 focus:ring-green-2"
              />
            </div>

            <div className="form-group">
              <label className="mb-3 block font-medium text-green-3">
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
                  className="h-12 w-16 cursor-pointer rounded-lg border border-gray-300"
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
                    className="w-full rounded-lg border border-gray-300 p-4 focus:border-transparent focus:ring-2 focus:ring-green-2"
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label className="mb-3 block font-medium text-green-3">
                {t.order?.fields?.uploadImageOptional ||
                  "Upload Your Image (Optional)"}
              </label>
              <div className="rounded-lg border-2 border-dashed border-gray-300 p-6 text-center transition-colors hover:border-green-2">
                {uploadedImage ? (
                  <div className="space-y-4">
                    <img
                      src={uploadedImage}
                      alt="Uploaded preview"
                      className="mx-auto max-h-48 max-w-full rounded-lg shadow-md"
                    />
                    <div className="flex justify-center space-x-4">
                      <button
                        type="button"
                        onClick={() =>
                          document.getElementById("imageUpload").click()
                        }
                        className="rounded-lg bg-green-2 px-4 py-2 text-white transition-colors hover:bg-green-1"
                      >
                        {t.order?.fields?.chooseFile || "Change Image"}
                      </button>
                      <button
                        type="button"
                        onClick={removeImage}
                        className="rounded-lg bg-red-500 px-4 py-2 text-white transition-colors hover:bg-red-600"
                      >
                        {t.order?.fields?.removeImage || "Remove"}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="text-gray-400">
                      <svg
                        className="mx-auto h-12 w-12"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div>
                      <button
                        type="button"
                        onClick={() =>
                          document.getElementById("imageUpload").click()
                        }
                        className="rounded-lg bg-green-2 px-6 py-3 text-white transition-colors hover:bg-green-1"
                      >
                        {t.order?.fields?.chooseFile || "Choose Image"}
                      </button>
                      <p className="mt-2 text-sm text-gray-500">
                        Upload your photo for the frame (JPG, PNG, max 5MB)
                      </p>
                    </div>
                  </div>
                )}
                <input
                  id="imageUpload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="form-step space-y-6">
            <div className="form-group">
              <label className="mb-3 block font-medium text-green-3">
                {t.order?.fields?.frameType || "Frame Type"}
              </label>
              <select
                value={orderData.frameTypeId}
                onChange={(e) =>
                  handleInputChange("frameTypeId", e.target.value)
                }
                className="w-full rounded-lg border border-gray-300 p-4 focus:border-transparent focus:ring-2 focus:ring-green-2"
                disabled={!orderData.categoryId}
              >
                <option value="">
                  {t.order?.fields?.chooseFrameType || "Choose frame type..."}
                </option>
                {frameTypes.map((frameType) => (
                  <option key={frameType.id} value={frameType.id}>
                    {frameType.name} ({frameType.material})
                  </option>
                ))}
              </select>
              {!orderData.categoryId && (
                <p className="mt-3 text-sm text-gray-500">
                  {t.order?.fields?.pleaseSelectCategory ||
                    "Please select a category first"}
                </p>
              )}
            </div>

            <div className="form-group">
              <label className="mb-3 block font-medium text-green-3">
                Size
              </label>
              <select
                value={orderData.sizeId}
                onChange={(e) => handleInputChange("sizeId", e.target.value)}
                className="w-full rounded-lg border border-gray-300 p-4 focus:border-transparent focus:ring-2 focus:ring-green-2"
                disabled={!orderData.frameTypeId}
              >
                <option value="">Choose size...</option>
                {sizes.map((size) => (
                  <option key={size.id} value={size.id}>
                    {size.display} ({size.width} x {size.height} {size.unit})
                  </option>
                ))}
              </select>
              {!orderData.frameTypeId && (
                <p className="mt-3 text-sm text-gray-500">
                  Please select a frame type first
                </p>
              )}
            </div>

            <div className="form-group">
              <label className="mb-3 block font-medium text-green-3">
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
                className="w-full rounded-lg border border-gray-300 p-4 focus:border-transparent focus:ring-2 focus:ring-green-2"
                disabled={!orderData.frameTypeId}
              >
                <option value="">Choose color (optional)...</option>
                {frameColors.map((color) => (
                  <option key={color.id} value={color.id}>
                    {color.name}
                  </option>
                ))}
              </select>
              {!orderData.frameTypeId && (
                <p className="mt-3 text-sm text-gray-500">
                  Please select a frame type first
                </p>
              )}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="form-step space-y-6">
            <div className="form-group">
              <label className="mb-3 block font-medium text-green-3">
                {t.order?.fields?.fullName || "Full Name"}
              </label>
              <input
                type="text"
                value={orderData.customerName}
                onChange={(e) =>
                  handleInputChange("customerName", e.target.value)
                }
                className="w-full rounded-lg border border-gray-300 p-4 focus:border-transparent focus:ring-2 focus:ring-green-2"
                placeholder={
                  t.order?.fields?.enterFullName || "Enter your full name"
                }
              />
            </div>
            <div className="form-group">
              <label className="mb-3 block font-medium text-green-3">
                {t.order?.fields?.whatsappNumber || "WhatsApp Number"}
              </label>
              <input
                type="tel"
                value={orderData.customerWhatsapp}
                onChange={(e) =>
                  handleInputChange("customerWhatsapp", e.target.value)
                }
                className="w-full rounded-lg border border-gray-300 p-4 focus:border-transparent focus:ring-2 focus:ring-green-2"
                placeholder={
                  t.order?.fields?.enterWhatsappNumber ||
                  "Enter your WhatsApp number"
                }
              />
            </div>
            <div className="form-group">
              <label className="mb-3 block font-medium text-green-3">
                {t.order?.fields?.customerAddress || "Customer Address"}
              </label>
              <textarea
                value={orderData.customerAddress}
                onChange={(e) =>
                  handleInputChange("customerAddress", e.target.value)
                }
                className="w-full resize-none rounded-lg border border-gray-300 p-4 focus:border-transparent focus:ring-2 focus:ring-green-2"
                rows="3"
                placeholder={
                  t.order?.fields?.enterCompleteAddress ||
                  "Enter your complete address"
                }
              />
            </div>
            <div className="form-group">
              <label className="mb-3 block font-medium text-green-3">
                {t.order?.fields?.deliveryLocation || "Delivery Location"}
              </label>
              <select
                value={orderData.deliveryTo}
                onChange={(e) =>
                  handleInputChange("deliveryTo", e.target.value)
                }
                className="w-full rounded-lg border border-gray-300 p-4 focus:border-transparent focus:ring-2 focus:ring-green-2"
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
              <label className="mb-3 block font-medium text-green-3">
                {t.order?.fields?.preferredDeliveryDate ||
                  "Preferred Delivery Date"}
              </label>
              <input
                type="date"
                value={orderData.deliveryDate}
                onChange={(e) =>
                  handleInputChange("deliveryDate", e.target.value)
                }
                min={(() => {
                  const today = new Date();
                  today.setDate(today.getDate() + 3); // 3 days from today
                  return today.toISOString().split("T")[0];
                })()}
                className="w-full rounded-lg border border-gray-300 p-4 focus:border-transparent focus:ring-2 focus:ring-green-2"
              />
              <p className="mt-2 text-sm text-gray-500">
                📅{" "}
                {t.order?.fields?.deliveryAvailableFrom ||
                  "Delivery available from"}{" "}
                {(() => {
                  const minDate = new Date();
                  minDate.setDate(minDate.getDate() + 3);
                  return minDate.toLocaleDateString(
                    language === "si" ? "si-LK" : "en-US",
                    {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    },
                  );
                })()}{" "}
                {t.order?.fields?.onwards || "onwards"}
              </p>
            </div>
            <div className="form-group">
              <label className="mb-3 block font-medium text-green-3">
                {t.order?.fields?.specialInstructionsOptional ||
                  "Special Instructions (Optional)"}
              </label>
              <textarea
                value={orderData.notes}
                onChange={(e) => handleInputChange("notes", e.target.value)}
                className="w-full resize-none rounded-lg border border-gray-300 p-4 focus:border-transparent focus:ring-2 focus:ring-green-2"
                rows="3"
                placeholder={
                  t.order?.fields?.anySpecialInstructions ||
                  "Any special instructions for your order"
                }
              />
            </div>
          </div>
        );

      case 5:
        return (
          <div className="form-step space-y-6">
            <div className="rounded-lg bg-gray-50 p-6">
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
                          className="h-4 w-4 rounded border border-gray-300"
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
                  <span>
                    {t.order?.fields?.customerImage || "Customer Image"}:
                  </span>
                  <span className="font-medium">
                    {orderData.imageUrl ? (
                      <span className="text-green-600">
                        ✅ {t.order?.fields?.attached || "Attached"} (
                        {t.order?.fields?.willBeSentViaWhatsApp ||
                          "will be sent via WhatsApp"}
                        )
                      </span>
                    ) : (
                      t.order?.fields?.notProvided || "Not provided"
                    )}
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-blue-50 p-6">
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
              <label className="mb-3 block font-medium text-green-3">
                {t.order?.fields?.specialInstructions || "Special Instructions"}{" "}
                <span className="text-sm font-normal text-gray-500">
                  ({t.order?.fields?.optional || "Optional"})
                </span>
              </label>
              <textarea
                value={orderData.notes}
                onChange={(e) => handleInputChange("notes", e.target.value)}
                className="w-full resize-none rounded-lg border border-gray-300 p-4 focus:border-transparent focus:ring-2 focus:ring-green-2"
                rows="3"
                placeholder={
                  t.order?.fields?.specialInstructionsPlaceholder ||
                  "Any special instructions for your order..."
                }
              />
            </div>

            {orderData.imageUrl && (
              <div className="rounded border-l-4 border-green-400 bg-green-50 p-4">
                <div className="flex">
                  <svg
                    className="mr-2 mt-0.5 h-5 w-5 text-green-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div className="text-sm text-green-700">
                    <p className="font-medium">📸 Image Delivery Information</p>
                    <p className="mt-1">
                      Your uploaded image will be sent to the seller via
                      WhatsApp along with your order details. You may also be
                      asked to send the image directly to the seller's WhatsApp
                      for best quality.
                    </p>
                  </div>
                </div>
              </div>
            )}
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
        <div className="mb-8 flex items-center justify-between">
          <button
            onClick={() => onPageChange && onPageChange("home")}
            className="flex items-center gap-2 text-green-2 transition-colors hover:text-green-1"
          >
            <svg
              className="h-5 w-5"
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

        <div className="mx-auto max-w-4xl rounded-custom bg-white p-8 shadow-lg">
          {/* Progress Steps */}
          <div className="relative mb-10 flex justify-between">
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
          <div className="mt-8 flex justify-between border-t border-gray-200 pt-6">
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

            {currentStep < 5 ? (
              <button
                onClick={nextStep}
                className="rounded-lg bg-green-2 px-8 py-4 font-semibold text-white transition-colors hover:bg-green-1"
              >
                {t.order?.buttons?.nextStep || "Next Step"}
              </button>
            ) : (
              <button
                onClick={submitOrder}
                className="rounded-lg bg-green-1 px-10 py-4 font-semibold text-white transition-colors hover:bg-green-3"
              >
                {t.order?.buttons?.placeOrder || "Place Order"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
