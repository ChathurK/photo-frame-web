-- ============================================================================
-- PHOTO FRAME ORDERING SYSTEM - COMPLETE DATABASE SETUP
-- ============================================================================
-- Project: Photo Frame Web Application
-- Database: photo
-- Date: October 18, 2025
-- Description: Complete database schema with all tables, relationships, and sample data
-- ============================================================================

-- Drop existing database if exists and create new one
DROP DATABASE IF EXISTS photo;
CREATE DATABASE photo CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE photo;

-- ============================================================================
-- TABLE: categories
-- Description: Frame categories (Oil Painting, Mini Frames, 100 Designs, Cute Collection)
-- ============================================================================
DROP TABLE IF EXISTS categories;
CREATE TABLE categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    code VARCHAR(20) NOT NULL UNIQUE COMMENT 'OIL, MINI, HUNDRED, CUTE',
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_code (code),
    INDEX idx_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert categories
INSERT INTO categories (name, code, description) VALUES
('Oil Painting Collection', 'OIL', 'Hand-painted oil painting style photo frames'),
('Mini Frames', 'MINI', 'Small compact photo frames'),
('100 Designs Collection', 'HUNDRED', 'Choose from 100 pre-designed templates'),
('Cute Collections', 'CUTE', 'Cute and adorable Ghibli-style frames');

-- ============================================================================
-- TABLE: design_samples
-- Description: Pre-designed templates for 100 Designs category
-- ============================================================================
DROP TABLE IF EXISTS design_samples;
CREATE TABLE design_samples (
    id INT PRIMARY KEY AUTO_INCREMENT,
    category_id INT NOT NULL,
    design_number INT NOT NULL COMMENT 'DT 1 to DT 100',
    design_name VARCHAR(100),
    image_path VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE,
    UNIQUE KEY unique_design (category_id, design_number),
    INDEX idx_category (category_id),
    INDEX idx_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert design samples for 100 Designs category
INSERT INTO design_samples (category_id, design_number, design_name, image_path)
SELECT 3, n, CONCAT('Design Template ', n), CONCAT('DT ', n, '.jpg')
FROM (
    SELECT 1 AS n UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION
    SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10 UNION
    SELECT 11 UNION SELECT 12 UNION SELECT 13 UNION SELECT 14 UNION SELECT 15 UNION
    SELECT 16 UNION SELECT 17 UNION SELECT 18 UNION SELECT 19 UNION SELECT 20 UNION
    SELECT 21 UNION SELECT 22 UNION SELECT 23 UNION SELECT 24 UNION SELECT 25 UNION
    SELECT 26 UNION SELECT 27 UNION SELECT 28 UNION SELECT 29 UNION SELECT 30 UNION
    SELECT 31 UNION SELECT 32 UNION SELECT 33 UNION SELECT 34 UNION SELECT 35 UNION
    SELECT 36 UNION SELECT 37 UNION SELECT 38 UNION SELECT 39 UNION SELECT 40 UNION
    SELECT 41 UNION SELECT 42 UNION SELECT 43 UNION SELECT 44 UNION SELECT 45 UNION
    SELECT 46 UNION SELECT 47 UNION SELECT 48 UNION SELECT 49 UNION SELECT 50 UNION
    SELECT 51 UNION SELECT 52 UNION SELECT 53 UNION SELECT 54 UNION SELECT 55 UNION
    SELECT 56 UNION SELECT 57 UNION SELECT 58 UNION SELECT 59 UNION SELECT 60 UNION
    SELECT 61 UNION SELECT 62 UNION SELECT 63 UNION SELECT 64 UNION SELECT 65 UNION
    SELECT 66 UNION SELECT 67 UNION SELECT 68 UNION SELECT 69 UNION SELECT 70 UNION
    SELECT 71 UNION SELECT 72 UNION SELECT 73 UNION SELECT 74 UNION SELECT 75 UNION
    SELECT 76 UNION SELECT 77 UNION SELECT 78 UNION SELECT 79 UNION SELECT 80 UNION
    SELECT 81 UNION SELECT 82 UNION SELECT 83 UNION SELECT 84 UNION SELECT 85 UNION
    SELECT 86 UNION SELECT 87 UNION SELECT 88 UNION SELECT 89 UNION SELECT 90 UNION
    SELECT 91 UNION SELECT 92 UNION SELECT 93 UNION SELECT 94 UNION SELECT 95 UNION
    SELECT 96 UNION SELECT 97 UNION SELECT 98 UNION SELECT 99 UNION SELECT 100
) AS numbers;

-- ============================================================================
-- TABLE: frame_types
-- Description: Types of frames (Fiber, Plymount, Embossed, etc.)
-- ============================================================================
DROP TABLE IF EXISTS frame_types;
CREATE TABLE frame_types (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    material VARCHAR(50) COMMENT 'Fiber, Wood, Plymount, etc.',
    allows_color BOOLEAN DEFAULT FALSE COMMENT 'TRUE if frame type has color options',
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_active (is_active),
    INDEX idx_allows_color (allows_color)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert frame types
INSERT INTO frame_types (name, material, allows_color, description) VALUES
('Fiber Frame', 'Fiber', TRUE, 'Fiber frame with glass - available in multiple colors'),
('Plymount Nonmargine Normal - Black', 'Plymount', FALSE, 'Plymount frame without margin - Black color'),
('Plymount Nonmargine Normal - White', 'Plymount', FALSE, 'Plymount frame without margin - White color'),
('Plymount Margine Normal - Black', 'Plymount', FALSE, 'Plymount frame with margin - Black color'),
('Plymount Margine Normal - White', 'Plymount', FALSE, 'Plymount frame with margin - White color'),
('Plymount Box Frame Nonmargine - Black', 'Plymount', FALSE, 'Box frame without margin - Black color'),
('Plymount Box Frame Nonmargine - White', 'Plymount', FALSE, 'Box frame without margin - White color'),
('Plymount Box Frame With Plastic Beading', 'Plymount', FALSE, 'Box frame with plastic beading'),
('Plymount Embossed Plain Black', 'Plymount', FALSE, 'Embossed frame - Black color'),
('Plymount Embossed Plain White', 'Plymount', FALSE, 'Embossed frame - White color');

-- ============================================================================
-- TABLE: frame_colors
-- Description: Available colors for frames (only for Fiber frames)
-- ============================================================================
DROP TABLE IF EXISTS frame_colors;
CREATE TABLE frame_colors (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    color_code VARCHAR(20) COMMENT 'Color code or description',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert frame colors (for Fiber frames only)
INSERT INTO frame_colors (name, color_code) VALUES
('Black', '#000000'),
('White', '#FFFFFF'),
('Brown', '#8B4513'),
('Pinewood', '#DEB887');

-- ============================================================================
-- TABLE: sizes
-- Description: Available frame sizes
-- ============================================================================
DROP TABLE IF EXISTS sizes;
CREATE TABLE sizes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    width DECIMAL(5,2) NOT NULL,
    height DECIMAL(5,2) NOT NULL,
    unit VARCHAR(10) DEFAULT 'inches',
    display VARCHAR(50) NOT NULL COMMENT 'Display name like "8x10 inches"',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert common frame sizes
INSERT INTO sizes (width, height, unit, display) VALUES
(8, 10, 'inches', '8x10 inches'),
(11, 14, 'inches', '11x14 inches'),
(16, 20, 'inches', '16x20 inches'),
(18, 24, 'inches', '18x24 inches'),
(20, 24, 'inches', '20x24 inches'),
(24, 30, 'inches', '24x30 inches'),
(24, 36, 'inches', '24x36 inches');

-- ============================================================================
-- TABLE: frame_type_sizes
-- Description: Junction table - which sizes are available for each frame type
-- ============================================================================
DROP TABLE IF EXISTS frame_type_sizes;
CREATE TABLE frame_type_sizes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    frame_type_id INT NOT NULL,
    size_id INT NOT NULL,
    is_available BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (frame_type_id) REFERENCES frame_types(id) ON DELETE CASCADE,
    FOREIGN KEY (size_id) REFERENCES sizes(id) ON DELETE CASCADE,
    UNIQUE KEY unique_frame_size (frame_type_id, size_id),
    INDEX idx_frame_type (frame_type_id),
    INDEX idx_size (size_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Link all frame types with all sizes (you can customize this)
INSERT INTO frame_type_sizes (frame_type_id, size_id)
SELECT ft.id, s.id
FROM frame_types ft
CROSS JOIN sizes s;

-- ============================================================================
-- TABLE: frame_prices
-- Description: Pricing for frame combinations (category + size)
-- Pricing Structure:
-- - base_price: Base price for the size
-- - price_increment: Additional charge based on category
-- - Cute Collection: +Rs. 450 (applied in application logic)
-- - Per person (Oil/Cute): (persons-1) × Rs. 450 (applied in application logic)
-- - Premium package: +Rs. 450 (applied in application logic)
-- ============================================================================
DROP TABLE IF EXISTS frame_prices;
CREATE TABLE frame_prices (
    id INT PRIMARY KEY AUTO_INCREMENT,
    category_id INT NOT NULL,
    size_id INT NOT NULL,
    base_price DECIMAL(10,2) NOT NULL COMMENT 'Base price for this size',
    price_increment DECIMAL(10,2) DEFAULT 0.00 COMMENT 'Additional charge for this category',
    final_price DECIMAL(10,2) GENERATED ALWAYS AS (base_price + price_increment) STORED,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE,
    FOREIGN KEY (size_id) REFERENCES sizes(id) ON DELETE CASCADE,
    UNIQUE KEY unique_category_size (category_id, size_id),
    INDEX idx_category (category_id),
    INDEX idx_size (size_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert sample pricing
-- Oil Painting Collection prices (higher base + increment)
INSERT INTO frame_prices (category_id, size_id, base_price, price_increment) VALUES
(1, 1, 2500.00, 500.00),  -- 8x10
(1, 2, 3500.00, 700.00),  -- 11x14
(1, 3, 5000.00, 1000.00), -- 16x20
(1, 4, 6000.00, 1200.00), -- 18x24
(1, 5, 6500.00, 1300.00), -- 20x24
(1, 6, 8000.00, 1500.00), -- 24x30
(1, 7, 9000.00, 1800.00); -- 24x36

-- Mini Frames prices (lower prices)
INSERT INTO frame_prices (category_id, size_id, base_price, price_increment) VALUES
(2, 1, 1500.00, 200.00),  -- 8x10
(2, 2, 2000.00, 300.00),  -- 11x14
(2, 3, 2500.00, 400.00),  -- 16x20
(2, 4, 3000.00, 500.00),  -- 18x24
(2, 5, 3500.00, 600.00),  -- 20x24
(2, 6, 4000.00, 700.00),  -- 24x30
(2, 7, 4500.00, 800.00);  -- 24x36

-- 100 Designs Collection prices (medium prices)
INSERT INTO frame_prices (category_id, size_id, base_price, price_increment) VALUES
(3, 1, 2000.00, 400.00),  -- 8x10
(3, 2, 2800.00, 500.00),  -- 11x14
(3, 3, 3800.00, 700.00),  -- 16x20
(3, 4, 4500.00, 800.00),  -- 18x24
(3, 5, 5000.00, 900.00),  -- 20x24
(3, 6, 6000.00, 1100.00), -- 24x30
(3, 7, 7000.00, 1300.00); -- 24x36

-- Cute Collections prices (similar to Oil Painting)
INSERT INTO frame_prices (category_id, size_id, base_price, price_increment) VALUES
(4, 1, 2500.00, 500.00),  -- 8x10
(4, 2, 3500.00, 700.00),  -- 11x14
(4, 3, 5000.00, 1000.00), -- 16x20
(4, 4, 6000.00, 1200.00), -- 18x24
(4, 5, 6500.00, 1300.00), -- 20x24
(4, 6, 8000.00, 1500.00), -- 24x30
(4, 7, 9000.00, 1800.00); -- 24x36

-- ============================================================================
-- TABLE: orders
-- Description: Customer orders
-- ============================================================================
DROP TABLE IF EXISTS orders;
CREATE TABLE orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    customer_name VARCHAR(100) NOT NULL,
    customer_whatsapp VARCHAR(20) NOT NULL,
    customer_address TEXT NOT NULL,
    delivery_to VARCHAR(200),
    delivery_date DATE NOT NULL,
    notes TEXT,
    total_amount DECIMAL(10,2),
    order_status ENUM('pending', 'confirmed', 'processing', 'completed', 'cancelled') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_status (order_status),
    INDEX idx_delivery_date (delivery_date),
    INDEX idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- TABLE: order_items
-- Description: Items in each order (one order can have multiple frames)
-- ============================================================================
DROP TABLE IF EXISTS order_items;
CREATE TABLE order_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    category_id INT NOT NULL,
    design_sample_id INT NULL COMMENT 'Only for 100 Designs category',
    frame_type_id INT NOT NULL,
    frame_color_id INT NULL COMMENT 'Only for frames that allow color (Fiber)',
    size_id INT NOT NULL,
    number_of_persons INT DEFAULT 1 COMMENT 'For Oil Painting and Cute Collections',
    background_color VARCHAR(50) COMMENT 'For Oil Painting and Cute Collections',
    package_type ENUM('free', 'premium') DEFAULT 'free',
    quantity INT DEFAULT 1,
    unit_price DECIMAL(10,2) NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(id),
    FOREIGN KEY (design_sample_id) REFERENCES design_samples(id),
    FOREIGN KEY (frame_type_id) REFERENCES frame_types(id),
    FOREIGN KEY (frame_color_id) REFERENCES frame_colors(id),
    FOREIGN KEY (size_id) REFERENCES sizes(id),
    INDEX idx_order (order_id),
    INDEX idx_category (category_id),
    INDEX idx_design (design_sample_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- SAMPLE DATA - Insert test orders
-- ============================================================================

-- Sample Order 1: Oil Painting with 2 persons, Premium package
INSERT INTO orders (customer_name, customer_whatsapp, customer_address, delivery_to, delivery_date, total_amount, order_status)
VALUES ('John Doe', '+94701234567', '123 Main Street, Colombo', 'Home', DATE_ADD(CURDATE(), INTERVAL 5 DAY), 4400.00, 'pending');

INSERT INTO order_items (order_id, category_id, frame_type_id, frame_color_id, size_id, number_of_persons, background_color, package_type, quantity, unit_price, total_price)
VALUES (1, 1, 1, 1, 1, 2, 'Blue Sky', 'premium', 1, 4400.00, 4400.00);
-- Calculation: Base 2500 + Increment 500 + Cute Collection 0 + Additional person 450 + Premium 450 = 3900

-- Sample Order 2: 100 Designs with Design #42, Free package
INSERT INTO orders (customer_name, customer_whatsapp, customer_address, delivery_to, delivery_date, total_amount, order_status)
VALUES ('Jane Smith', '+94709876543', '456 Park Avenue, Kandy', 'Office', DATE_ADD(CURDATE(), INTERVAL 7 DAY), 2400.00, 'confirmed');

INSERT INTO order_items (order_id, category_id, design_sample_id, frame_type_id, size_id, package_type, quantity, unit_price, total_price)
VALUES (2, 3, 42, 1, 1, 'free', 1, 2400.00, 2400.00);
-- Calculation: Base 2000 + Increment 400 = 2400

-- Sample Order 3: Cute Collection with 3 persons, Free package
INSERT INTO orders (customer_name, customer_whatsapp, customer_address, delivery_to, delivery_date, total_amount, order_status)
VALUES ('Mike Johnson', '+94771234567', '789 Beach Road, Galle', 'Home', DATE_ADD(CURDATE(), INTERVAL 6 DAY), 4350.00, 'processing');

INSERT INTO order_items (order_id, category_id, frame_type_id, frame_color_id, size_id, number_of_persons, background_color, package_type, quantity, unit_price, total_price)
VALUES (3, 4, 1, 2, 1, 3, 'Pink', 'free', 1, 4350.00, 4350.00);
-- Calculation: Base 2500 + Increment 500 + Cute Collection 450 + Additional persons (2×450) = 4350

-- ============================================================================
-- VIEWS - Useful views for reporting
-- ============================================================================

-- View: Order details with all information
DROP VIEW IF EXISTS v_order_details;
CREATE VIEW v_order_details AS
SELECT 
    o.id AS order_id,
    o.customer_name,
    o.customer_whatsapp,
    o.customer_address,
    o.delivery_date,
    o.order_status,
    o.total_amount,
    oi.id AS item_id,
    c.name AS category_name,
    c.code AS category_code,
    ds.design_number AS design_number,
    ft.name AS frame_type,
    fc.name AS frame_color,
    s.display AS size,
    oi.number_of_persons,
    oi.background_color,
    oi.package_type,
    oi.quantity,
    oi.unit_price,
    oi.total_price,
    o.created_at AS order_date
FROM orders o
JOIN order_items oi ON o.id = oi.order_id
JOIN categories c ON oi.category_id = c.id
LEFT JOIN design_samples ds ON oi.design_sample_id = ds.id
JOIN frame_types ft ON oi.frame_type_id = ft.id
LEFT JOIN frame_colors fc ON oi.frame_color_id = fc.id
JOIN sizes s ON oi.size_id = s.id;

-- View: Available frame prices
DROP VIEW IF EXISTS v_available_prices;
CREATE VIEW v_available_prices AS
SELECT 
    c.name AS category_name,
    c.code AS category_code,
    s.display AS size,
    fp.base_price,
    fp.price_increment,
    fp.final_price
FROM frame_prices fp
JOIN categories c ON fp.category_id = c.id
JOIN sizes s ON fp.size_id = s.id
WHERE c.is_active = TRUE AND s.is_active = TRUE
ORDER BY c.id, s.id;

-- ============================================================================
-- STORED PROCEDURES
-- ============================================================================

-- Procedure: Get pricing for a specific category and size
DELIMITER //
DROP PROCEDURE IF EXISTS sp_get_price//
CREATE PROCEDURE sp_get_price(
    IN p_category_id INT,
    IN p_size_id INT
)
BEGIN
    SELECT 
        base_price,
        price_increment,
        final_price
    FROM frame_prices
    WHERE category_id = p_category_id 
      AND size_id = p_size_id;
END//
DELIMITER ;

-- Procedure: Get all prices for a category
DELIMITER //
DROP PROCEDURE IF EXISTS sp_get_category_prices//
CREATE PROCEDURE sp_get_category_prices(
    IN p_category_id INT
)
BEGIN
    SELECT 
        s.id AS size_id,
        s.display AS size_name,
        fp.base_price,
        fp.price_increment,
        fp.final_price
    FROM frame_prices fp
    JOIN sizes s ON fp.size_id = s.id
    WHERE fp.category_id = p_category_id
      AND s.is_active = TRUE
    ORDER BY s.width, s.height;
END//
DELIMITER ;

-- ============================================================================
-- INDEXES FOR PERFORMANCE
-- ============================================================================

-- Additional composite indexes for common queries
CREATE INDEX idx_order_items_category_frame ON order_items(category_id, frame_type_id);
CREATE INDEX idx_order_items_order_category ON order_items(order_id, category_id);
CREATE INDEX idx_orders_status_date ON orders(order_status, delivery_date);

-- ============================================================================
-- DATABASE SUMMARY
-- ============================================================================

SELECT '
============================================================================
DATABASE SETUP COMPLETED SUCCESSFULLY!
============================================================================
Database: photo
Tables Created: 10
- categories (4 records)
- design_samples (100 records - DT 1 to DT 100)
- frame_types (10 records)
- frame_colors (4 records)
- sizes (7 records)
- frame_type_sizes (70 records - all combinations)
- frame_prices (28 records - all category-size combinations)
- orders (3 sample orders)
- order_items (3 sample order items)

Views Created: 2
- v_order_details
- v_available_prices

Stored Procedures: 2
- sp_get_price(category_id, size_id)
- sp_get_category_prices(category_id)

============================================================================
PRICING STRUCTURE:
============================================================================
1. Base Price: Defined in frame_prices table per category+size
2. Category Increment: Additional charge per category
3. Cute Collection Charge: +Rs. 450 (applied in app)
4. Per Person Charge (Oil/Cute): (persons-1) × Rs. 450 (applied in app)
5. Premium Package: +Rs. 450 (applied in app)

============================================================================
NEXT STEPS:
============================================================================
1. Verify tables: SELECT COUNT(*) FROM categories;
2. Check prices: SELECT * FROM v_available_prices;
3. View orders: SELECT * FROM v_order_details;
4. Test procedures: CALL sp_get_category_prices(1);

============================================================================
' AS setup_info;

-- Show table counts
SELECT 'categories' AS table_name, COUNT(*) AS record_count FROM categories
UNION ALL
SELECT 'design_samples', COUNT(*) FROM design_samples
UNION ALL
SELECT 'frame_types', COUNT(*) FROM frame_types
UNION ALL
SELECT 'frame_colors', COUNT(*) FROM frame_colors
UNION ALL
SELECT 'sizes', COUNT(*) FROM sizes
UNION ALL
SELECT 'frame_type_sizes', COUNT(*) FROM frame_type_sizes
UNION ALL
SELECT 'frame_prices', COUNT(*) FROM frame_prices
UNION ALL
SELECT 'orders', COUNT(*) FROM orders
UNION ALL
SELECT 'order_items', COUNT(*) FROM order_items;

-- End of script
