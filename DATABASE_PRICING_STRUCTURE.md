# Database Design - Pricing Structure

**Last Updated:** October 18, 2025  
**Database Name:** photo

---

## Overview

The database now includes a comprehensive **pricing structure** with the `frame_prices` table that stores prices for each combination of frame type and size.

---

## Key Tables

### 1. **categories**
Stores product categories with optional price increments.

**Structure:**
```sql
CREATE TABLE categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  code VARCHAR(50) UNIQUE NOT NULL,
  price_increment DECIMAL(10,2) DEFAULT 0,
  description TEXT
);
```

**Data:**
| ID | Name | Code | Price Increment |
|----|------|------|-----------------|
| 1 | Oil Painting | OIL | 0.00 |
| 2 | 100 Designs | HUNDRED | 0.00 |
| 3 | Cute Collections | CUTE | 450.00 |
| 4 | Mini Frames | MINI | 0.00 |

**Note:** The `price_increment` is added to the base frame price for special categories like "Cute Collections".

---

### 2. **frame_types**
Defines available frame types per category.

**Structure:**
```sql
CREATE TABLE frame_types (
  id INT AUTO_INCREMENT PRIMARY KEY,
  category_id INT NOT NULL,
  name VARCHAR(100) NOT NULL,
  code VARCHAR(100) UNIQUE NOT NULL,
  material VARCHAR(50),
  allows_color BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (category_id) REFERENCES categories(id)
);
```

**Categories:**

#### Oil Painting (category_id = 1)
- Frame IDs: 1-6
- Materials: Plymount, Fiber
- Some allow color selection (e.g., Fiber Frame)

#### 100 Designs (category_id = 2)
- Frame IDs: 7-12
- Materials: Plymount, Fiber
- Some allow color selection (e.g., Fiber Frame)

#### Mini Frames (category_id = 4)
- Frame IDs: 13-15
- Materials: Plymount, Plastic
- LED options available

---

### 3. **sizes**
Defines available frame sizes.

**Structure:**
```sql
CREATE TABLE sizes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  width DECIMAL(5,2),
  height DECIMAL(5,2),
  unit VARCHAR(10),
  display VARCHAR(50)
);
```

**Standard Sizes (IDs 1-7):**
- 6x8, 8x10, 8x12, 10x12, 10x15, 12x15, 12x18 (inches)

**Mini Frame Sizes (IDs 8-17):**
- 3x3, 4x4, 4x6, 4x8, 4x12, 5x7, 6x8 (LED), 8x8, 8x10, 8x16 (inches)

---

### 4. **frame_prices** ⭐ NEW!
Stores the pricing for each frame type and size combination.

**Structure:**
```sql
CREATE TABLE frame_prices (
  id INT AUTO_INCREMENT PRIMARY KEY,
  frame_type_id INT NOT NULL,
  size_id INT NOT NULL,
  price_lkr DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (frame_type_id) REFERENCES frame_types(id),
  FOREIGN KEY (size_id) REFERENCES sizes(id)
);
```

**Price Range:**
- **Oil Painting:** LKR 2,750 - 5,500
- **100 Designs:** LKR 1,900 - 4,450
- **Mini Frames:** LKR 850 - 2,500

**Example Query - Get Price:**
```sql
SELECT fp.price_lkr, c.price_increment,
       (fp.price_lkr + c.price_increment) AS final_price
FROM frame_prices fp
JOIN frame_types ft ON fp.frame_type_id = ft.id
JOIN categories c ON ft.category_id = c.id
WHERE fp.frame_type_id = 7 AND fp.size_id = 2;
```

---

### 5. **frame_colors**
Optional colors for frames that support color selection.

**Structure:**
```sql
CREATE TABLE frame_colors (
  id INT AUTO_INCREMENT PRIMARY KEY,
  frame_type_id INT NOT NULL,
  name VARCHAR(50) NOT NULL,
  FOREIGN KEY (frame_type_id) REFERENCES frame_types(id)
);
```

**Available Colors:**
- Black, White, Brown, Pinewood
- Only for Fiber frames (frame_type_id: 5, 11)

---

### 6. **design_samples**
Design templates for the "100 Designs" category.

**Structure:**
```sql
CREATE TABLE design_samples (
  id INT AUTO_INCREMENT PRIMARY KEY,
  code VARCHAR(20) NOT NULL,
  display_name VARCHAR(100),
  category_id INT NOT NULL,
  FOREIGN KEY (category_id) REFERENCES categories(id)
);
```

**Data:** DT1 through DT100 (100 design templates)

---

### 7. **orders**
Customer orders.

**Structure:**
```sql
CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  customer_name VARCHAR(200) NOT NULL,
  customer_address TEXT,
  customer_whatsapp VARCHAR(50),
  delivery_to VARCHAR(50) NOT NULL,
  delivery_date DATE,
  total_amount DECIMAL(10,2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

### 8. **order_items**
Individual items within each order.

**Structure:**
```sql
CREATE TABLE order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  category_id INT NOT NULL,
  design_sample_id INT, -- nullable
  frame_type_id INT NOT NULL,
  size_id INT NOT NULL,
  frame_color_id INT, -- nullable
  number_of_persons INT, -- nullable (for oil painting)
  background_color VARCHAR(100), -- nullable (color picker)
  notes TEXT,
  FOREIGN KEY (order_id) REFERENCES orders(id),
  FOREIGN KEY (category_id) REFERENCES categories(id),
  FOREIGN KEY (design_sample_id) REFERENCES design_samples(id),
  FOREIGN KEY (frame_type_id) REFERENCES frame_types(id),
  FOREIGN KEY (size_id) REFERENCES sizes(id),
  FOREIGN KEY (frame_color_id) REFERENCES frame_colors(id)
);
```

**Note:** `image_url` column has been REMOVED as per the updated design.

---

## Price Calculation Logic

### Formula:
```
Final Price = Base Price (from frame_prices) + Category Price Increment
```

### Example 1: Oil Painting
- Frame Type: Plymount Box Frame with Plastic Beading (ID: 1)
- Size: 8x10 (ID: 2)
- Base Price: LKR 3,400
- Category Increment: LKR 0
- **Final Price: LKR 3,400**

### Example 2: Cute Collections
- Frame Type: Same as 100 Designs frame (e.g., ID: 7)
- Size: 8x10 (ID: 2)
- Base Price: LKR 2,500
- Category Increment: LKR 450
- **Final Price: LKR 2,950**

### Example 3: Mini Frame
- Frame Type: Plymount Non-Margine (ID: 13)
- Size: 4x4 (ID: 9)
- Base Price: LKR 950
- Category Increment: LKR 0
- **Final Price: LKR 950**

---

## Migration Instructions

### For Existing Databases:
Run the migration script:
```bash
mysql -u root -p photo < database/migrations/add-frame-prices-table.sql
```

### For New Installations:
Use the complete schema:
```bash
mysql -u root -p < database/schema/updated_schema.sql
```

---

## API Implications

### New Endpoint Needed:
```
GET /api/prices/:frameTypeId/:sizeId
```

**Response:**
```json
{
  "success": true,
  "data": {
    "base_price": 2500.00,
    "category_increment": 450.00,
    "final_price": 2950.00,
    "currency": "LKR"
  }
}
```

---

## Important Notes

1. ✅ **No Image Upload:** The `image_url` column has been removed from `order_items`
2. ✅ **Pricing Table:** New `frame_prices` table contains all pricing data
3. ✅ **Category Increments:** "Cute Collections" has +450 LKR increment
4. ✅ **Color Options:** Only Fiber frames (IDs 5, 11) support color selection
5. ✅ **Size Ranges:** Different categories support different size ranges

---

## Database Statistics

- **Categories:** 4
- **Frame Types:** 15
- **Sizes:** 17
- **Frame Prices:** ~93 price points
- **Design Samples:** 100
- **Frame Colors:** 8 (4 colors × 2 frame types)

---

## Next Steps for Implementation

1. **Backend:**
   - Create API endpoint for price lookups
   - Add price calculation logic in order controller
   - Update order creation to calculate total_amount

2. **Frontend:**
   - Display prices when user selects frame/size
   - Show category increment for "Cute Collections"
   - Calculate and display order total
   - Update order summary with pricing

3. **Testing:**
   - Test price calculations for all combinations
   - Verify category increments work correctly
   - Test mini frame pricing

---

**End of Documentation**
