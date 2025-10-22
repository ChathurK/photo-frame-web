-- ==========================================================
-- PHOTO & FRAME SELLING WEBSITE SCHEMA (MySQL)
-- Updated with frame_prices table for pricing structure
-- ==========================================================

-- Create database
CREATE DATABASE IF NOT EXISTS photo;
USE photo;

-- ===============================
-- TABLE: categories
-- ===============================
CREATE TABLE IF NOT EXISTS categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  code VARCHAR(50) UNIQUE NOT NULL,
  price_increment DECIMAL(10,2) DEFAULT 0,
  description TEXT
);

INSERT INTO categories (id, name, code, price_increment) VALUES
(1, 'Oil Painting', 'OIL', 0),
(2, '100 Designs', 'HUNDRED', 0),
(3, 'Cute Collections', 'CUTE', 450),
(4, 'Mini Frames', 'MINI', 0);

-- ===============================
-- TABLE: frame_types
-- ===============================
CREATE TABLE IF NOT EXISTS frame_types (
  id INT AUTO_INCREMENT PRIMARY KEY,
  category_id INT NOT NULL,
  name VARCHAR(100) NOT NULL,
  code VARCHAR(100) UNIQUE NOT NULL,
  material VARCHAR(50),
  allows_color BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- ===============================
-- TABLE: sizes
-- ===============================
CREATE TABLE IF NOT EXISTS sizes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  width DECIMAL(5,2),
  height DECIMAL(5,2),
  unit VARCHAR(10),
  display VARCHAR(50)
);

-- Standard Sizes (inches)
INSERT INTO sizes (id, width, height, unit, display) VALUES
(1, 6, 8, 'inch', '6 x 8'),
(2, 8, 10, 'inch', '8 x 10'),
(3, 8, 12, 'inch', '8 x 12'),
(4, 10, 12, 'inch', '10 x 12'),
(5, 10, 15, 'inch', '10 x 15'),
(6, 12, 15, 'inch', '12 x 15'),
(7, 12, 18, 'inch', '12 x 18');

-- Mini Frame Sizes (inches)
INSERT INTO sizes (id, width, height, unit, display) VALUES
(8, 3, 3, 'inch', '3 x 3'),
(9, 4, 4, 'inch', '4 x 4'),
(10, 4, 8, 'inch', '4 x 8'),
(11, 4, 12, 'inch', '4 x 12'),
(12, 8, 8, 'inch', '8 x 8'),
(13, 8, 10, 'inch', '8 x 10'),
(14, 8, 16, 'inch', '8 x 16'),
(15, 4, 6, 'inch', '4 x 6'),
(16, 5, 7, 'inch', '5 x 7'),
(17, 6, 8, 'inch', '6 x 8 (LED)');

-- ===============================
-- TABLE: frame_prices (NEW!)
-- ===============================
CREATE TABLE IF NOT EXISTS frame_prices (
  id INT AUTO_INCREMENT PRIMARY KEY,
  frame_type_id INT NOT NULL,
  size_id INT NOT NULL,
  price_lkr DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (frame_type_id) REFERENCES frame_types(id),
  FOREIGN KEY (size_id) REFERENCES sizes(id)
);

-- ===============================
-- TABLE: frame_colors
-- ===============================
CREATE TABLE IF NOT EXISTS frame_colors (
  id INT AUTO_INCREMENT PRIMARY KEY,
  frame_type_id INT NOT NULL,
  name VARCHAR(50) NOT NULL,
  FOREIGN KEY (frame_type_id) REFERENCES frame_types(id)
);

-- ===============================
-- TABLE: design_samples
-- ===============================
CREATE TABLE IF NOT EXISTS design_samples (
  id INT AUTO_INCREMENT PRIMARY KEY,
  code VARCHAR(20) NOT NULL,
  display_name VARCHAR(100),
  category_id INT NOT NULL,
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- Generate DT1 to DT100
INSERT INTO design_samples (code, display_name, category_id)
SELECT CONCAT('DT', n), CONCAT('Design ', n), 2
FROM (
  SELECT @row := @row + 1 AS n FROM
  (SELECT 0 UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4
   UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9) t1,
  (SELECT 0 UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4
   UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9) t2,
  (SELECT @row := 0) r
  LIMIT 100
) nums;

-- ===============================================
-- OIL PAINTING FRAMES (CATEGORY_ID = 1)
-- ===============================================
INSERT INTO frame_types (id, category_id, name, code, material, allows_color) VALUES
(1, 1, 'Plymount Box Frame with Plastic Beading', 'OIL_BOX_PLASTIC', 'Plymount', FALSE),
(2, 1, 'Plymount Embossed Frame', 'OIL_EMBOSSED', 'Plymount', FALSE),
(3, 1, 'Plymount Margine Frame', 'OIL_MARGIN', 'Plymount', FALSE),
(4, 1, 'Plymount Non-Margine Frame', 'OIL_NON_MARGIN', 'Plymount', FALSE),
(5, 1, 'Fiber Frame Normal Range', 'OIL_FIBER', 'Fiber', TRUE),
(6, 1, 'Plymount Box Frame Non-Margine', 'OIL_BOX_NON_MARGIN', 'Plymount', FALSE);

-- Prices for Oil Painting Frames
INSERT INTO frame_prices (frame_type_id, size_id, price_lkr) VALUES
-- (1) Plymount Box Frame with Plastic Beading
(1,1,2800),(1,2,3400),(1,3,3850),(1,4,4200),(1,5,4600),(1,6,4950),(1,7,5250),
-- (2) Plymount Embossed
(2,1,3100),(2,2,3500),(2,3,3950),(2,4,4200),(2,5,4750),(2,6,5000),(2,7,5500),
-- (3) Plymount Margine
(3,1,2800),(3,2,3400),(3,3,3850),(3,4,4100),(3,5,4450),(3,6,4750),(3,7,4950),
-- (4) Plymount Non-Margine
(4,1,2750),(4,2,3300),(4,3,3650),(4,4,3950),(4,5,4150),(4,6,4400),(4,7,4750),
-- (5) Fiber Frame Normal Range
(5,1,2800),(5,3,3700),(5,4,4000),(5,5,4350),(5,6,4650),(5,7,4950),
-- (6) Plymount Box Frame Non-Margine
(6,1,3000),(6,2,3450),(6,3,3900),(6,4,4200),(6,5,4500),(6,6,4950),(6,7,5200);

-- Fiber Frame Colors
INSERT INTO frame_colors (frame_type_id, name) VALUES
(5,'Black'),(5,'White'),(5,'Brown'),(5,'Pinewood');

-- ===============================================
-- 100 DESIGNS (CATEGORY_ID = 2)
-- ===============================================
INSERT INTO frame_types (id, category_id, name, code, material, allows_color) VALUES
(7, 2, 'Plymount Box Frame with Plastic Beading', 'HUNDRED_BOX_PLASTIC', 'Plymount', FALSE),
(8, 2, 'Plymount Embossed Frame', 'HUNDRED_EMBOSSED', 'Plymount', FALSE),
(9, 2, 'Plymount Margine Frame', 'HUNDRED_MARGIN', 'Plymount', FALSE),
(10, 2, 'Plymount Non-Margine Frame', 'HUNDRED_NON_MARGIN', 'Plymount', FALSE),
(11, 2, 'Fiber Frame', 'HUNDRED_FIBER', 'Fiber', TRUE),
(12, 2, 'Plymount Box Frame Non-Margine', 'HUNDRED_BOX_NON_MARGIN', 'Plymount', FALSE);

-- Prices for 100 Designs
INSERT INTO frame_prices (frame_type_id, size_id, price_lkr) VALUES
-- (7) Box Plastic
(7,1,1950),(7,2,2500),(7,3,2850),(7,4,3200),(7,5,3550),(7,6,3950),(7,7,4250),
-- (8) Embossed
(8,1,2200),(8,2,2600),(8,3,2950),(8,4,3200),(8,5,3750),(8,6,4100),(8,7,4450),
-- (9) Margine
(9,1,1950),(9,2,2550),(9,3,2850),(9,4,3100),(9,5,3450),(9,6,3750),(9,7,3950),
-- (10) Non-Margine
(10,1,1900),(10,2,2450),(10,3,2800),(10,4,2950),(10,5,3150),(10,6,3400),(10,7,3750),
-- (11) Fiber Frame
(11,1,1950),(11,3,2850),(11,4,3150),(11,5,3350),(11,6,3650),(11,7,3950),
-- (12) Box Frame Non-Margine
(12,1,2250),(12,2,2600),(12,3,2950),(12,4,3200),(12,5,3550),(12,6,3950),(12,7,4250);

-- Fiber Frame Colors
INSERT INTO frame_colors (frame_type_id, name) VALUES
(11,'Black'),(11,'White'),(11,'Brown'),(11,'Pinewood');

-- ===============================================
-- MINI FRAMES (CATEGORY_ID = 4)
-- ===============================================
INSERT INTO frame_types (id, category_id, name, code, material, allows_color) VALUES
(13, 4, 'Plymount Non-Margine', 'MINI_NON_MARGIN', 'Plymount', FALSE),
(14, 4, 'Plymount Embossed', 'MINI_EMBOSSED', 'Plymount', FALSE),
(15, 4, 'Rotate Frame with LED Light', 'MINI_ROTATE_LED', 'Plastic', FALSE);

-- Prices for Mini Frames
INSERT INTO frame_prices (frame_type_id, size_id, price_lkr) VALUES
-- Plymount Non-Margine
(13,8,850),(13,9,950),(13,10,1500),(13,11,1950),(13,12,1650),(13,13,2250),(13,14,2500),
-- Plymount Embossed
(14,15,1850),(14,16,1500),
-- Rotate Frame with LED Light
(15,17,2150);

-- ===============================
-- TABLE: orders
-- ===============================
CREATE TABLE IF NOT EXISTS orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  customer_name VARCHAR(200) NOT NULL,
  customer_address TEXT,
  customer_whatsapp VARCHAR(50),
  delivery_to VARCHAR(50) NOT NULL, -- 'Sri Lanka' or 'Abroad'
  delivery_date DATE,
  total_amount DECIMAL(10,2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ===============================
-- TABLE: order_items
-- ===============================
CREATE TABLE IF NOT EXISTS order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  category_id INT NOT NULL,
  design_sample_id INT, -- nullable
  frame_type_id INT NOT NULL,
  size_id INT NOT NULL,
  frame_color_id INT, -- nullable
  number_of_persons INT DEFAULT 1, -- nullable (for oil painting etc)
  background_color VARCHAR(100), -- nullable - for color picker
  package_type VARCHAR(20) DEFAULT 'free', -- 'free' or 'premium' (+Rs. 450)
  notes TEXT,
  FOREIGN KEY (order_id) REFERENCES orders(id),
  FOREIGN KEY (category_id) REFERENCES categories(id),
  FOREIGN KEY (design_sample_id) REFERENCES design_samples(id),
  FOREIGN KEY (frame_type_id) REFERENCES frame_types(id),
  FOREIGN KEY (size_id) REFERENCES sizes(id),
  FOREIGN KEY (frame_color_id) REFERENCES frame_colors(id)
);