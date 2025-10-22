# API Documentation

## Base URL
```
http://localhost:3001/api
```

## Authentication
Currently, the API does not require authentication. This should be implemented for production use.

## Endpoints

### Health Check

#### GET /api/health
Check if the API server is running.

**Response:**
```json
{
  "success": true,
  "message": "API server is running",
  "timestamp": "2025-10-09T10:30:00.000Z"
}
```

---

### Orders

#### GET /api/orders
Get all orders with complete details including order items.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "customer_name": "John Doe",
      "customer_address": "123 Main St, Colombo",
      "customer_whatsapp": "+94771234567",
      "delivery_to": "Same as above",
      "delivery_date": "2025-10-15",
      "total_amount": 5000.00,
      "status": "PENDING",
      "created_at": "2025-10-09T10:00:00.000Z",
      "updated_at": "2025-10-09T10:00:00.000Z",
      "item_id": 1,
      "category_id": 1,
      "category_name": "Oil Painting",
      "frame_type_name": "Wooden Frame",
      "size_display": "8x10 inches",
      "number_of_persons": 2,
      "background_color": "#ffffff",
      "notes": "Please use high quality materials"
    }
  ],
  "count": 1
}
```

#### GET /api/orders/:id
Get a specific order by ID.

**Parameters:**
- `id` (path parameter) - Order ID

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "customer_name": "John Doe",
    "customer_address": "123 Main St, Colombo",
    "customer_whatsapp": "+94771234567",
    "delivery_to": "Same as above",
    "delivery_date": "2025-10-15",
    "total_amount": 5000.00,
    "status": "PENDING",
    "created_at": "2025-10-09T10:00:00.000Z",
    "updated_at": "2025-10-09T10:00:00.000Z"
  }
}
```

#### POST /api/orders
Create a new order.

**Request Body:**
```json
{
  "categoryId": 1,
  "designSampleId": 1,
  "frameTypeId": 1,
  "sizeId": 1,
  "frameColorId": 1,
  "numberOfPersons": 2,
  "customerName": "John Doe",
  "customerAddress": "123 Main St, Colombo",
  "customerWhatsapp": "+94771234567",
  "deliveryTo": "Same as above",
  "deliveryDate": "2025-10-15",
  "totalAmount": 5000.00,
  "backgroundColor": "#ffffff",
  "notes": "Special instructions"
}
```

**Required Fields:**
- `categoryId`
- `frameTypeId`
- `sizeId`
- `customerName`
- `customerAddress`
- `customerWhatsapp`

**Response:**
```json
{
  "success": true,
  "message": "Order created successfully",
  "data": {
    "id": 1,
    "status": "CREATED"
  }
}
```

#### PUT /api/orders/:id/status
Update order status.

**Parameters:**
- `id` (path parameter) - Order ID

**Request Body:**
```json
{
  "status": "PROCESSING"
}
```

**Valid Status Values:**
- `PENDING`
- `PROCESSING`
- `COMPLETED`
- `CANCELLED`

**Response:**
```json
{
  "success": true,
  "message": "Order status updated successfully"
}
```

#### DELETE /api/orders/:id
Delete an order.

**Parameters:**
- `id` (path parameter) - Order ID

**Response:**
```json
{
  "success": true,
  "message": "Order deleted successfully"
}
```

---

### Categories

#### GET /api/categories
Get all product categories.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "code": "OIL",
      "name": "Oil Painting"
    },
    {
      "id": 2,
      "code": "HUNDRED",
      "name": "100 Designs"
    }
  ]
}
```

---

### Design Samples

#### GET /api/design-samples/:categoryId
Get design samples for a specific category.

**Parameters:**
- `categoryId` (path parameter) - Category ID

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "code": "DT1",
      "category_id": 1,
      "display_name": "Landscape Design"
    }
  ]
}
```

---

### Frame Types

#### GET /api/frame-types/:categoryId
Get available frame types for a category.

**Parameters:**
- `categoryId` (path parameter) - Category ID

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "category_id": 1,
      "name": "Wooden Frame",
      "material": "Wood",
      "price": 1500.00
    }
  ]
}
```

---

### Sizes

#### GET /api/sizes/:frameTypeId
Get available sizes for a frame type.

**Parameters:**
- `frameTypeId` (path parameter) - Frame Type ID

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "display": "8x10 inches",
      "width": 8,
      "height": 10,
      "unit": "inches",
      "price": 500.00
    }
  ]
}
```

---

### Frame Colors

#### GET /api/frame-colors/:frameTypeId
Get available colors for a frame type.

**Parameters:**
- `frameTypeId` (path parameter) - Frame Type ID

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "frame_type_id": 1,
      "name": "Natural Wood",
      "hex_code": "#D2691E"
    }
  ]
}
```

---

### Customers

#### GET /api/customers
Get all customers.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+94771234567",
      "address": "123 Main St, Colombo",
      "city": "Colombo",
      "created_at": "2025-10-09T10:00:00.000Z"
    }
  ]
}
```

---

## Error Responses

All endpoints may return error responses in the following format:

```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message"
}
```

**Common HTTP Status Codes:**
- `200` - OK
- `201` - Created
- `400` - Bad Request (validation errors)
- `404` - Not Found
- `500` - Internal Server Error
