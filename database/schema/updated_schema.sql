-- ==========================================================
-- PHOTO & FRAME SELLING WEBSITE SCHEMA (MySQL)
-- Updated to match the new requirements
-- ==========================================================

-- Create database
CREATE DATABASE IF NOT EXISTS photoframe_db;
USE photoframe_db;

-- categories
CREATE TABLE IF NOT EXISTS categories (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  code VARCHAR(50) NOT NULL UNIQUE, -- e.g. OIL, HUNDRED, CUTE, MINI
  name VARCHAR(100) NOT NULL,
  description TEXT
);

-- design samples (DT1..DT100)
CREATE TABLE IF NOT EXISTS design_samples (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  code VARCHAR(20) NOT NULL UNIQUE, -- DT1...DT100
  display_name VARCHAR(200),
  category_id BIGINT NOT NULL,
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- sizes
CREATE TABLE IF NOT EXISTS sizes (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  width FLOAT NOT NULL,
  height FLOAT NOT NULL,
  unit VARCHAR(10) NOT NULL, -- 'inch' or 'cm'
  display VARCHAR(50) -- e.g. '8*10' or '7.5cm x 7.5cm'
);

-- frame types
CREATE TABLE IF NOT EXISTS frame_types (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  code VARCHAR(100) NOT NULL UNIQUE,
  name VARCHAR(200) NOT NULL,
  category_id BIGINT NOT NULL,
  material VARCHAR(100), -- e.g. 'plymount','fiber','pinewood'
  allows_color BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- optional frame colors
CREATE TABLE IF NOT EXISTS frame_colors (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL, -- 'black','white','brown','pinewood'
  frame_type_id BIGINT NOT NULL,
  FOREIGN KEY (frame_type_id) REFERENCES frame_types(id)
);

-- frame_type => size mapping
CREATE TABLE IF NOT EXISTS frame_type_sizes (
  frame_type_id BIGINT NOT NULL,
  size_id BIGINT NOT NULL,
  PRIMARY KEY (frame_type_id, size_id),
  FOREIGN KEY (frame_type_id) REFERENCES frame_types(id),
  FOREIGN KEY (size_id) REFERENCES sizes(id)
);

-- orders
CREATE TABLE IF NOT EXISTS orders (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  customer_name VARCHAR(200) NOT NULL,
  customer_address TEXT,
  customer_whatsapp VARCHAR(50),
  delivery_to VARCHAR(50) NOT NULL, -- 'Sri Lanka' or 'Abroad'
  total_amount DECIMAL(10,2), -- optional if you add pricing
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- order items
CREATE TABLE IF NOT EXISTS order_items (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  order_id BIGINT NOT NULL,
  category_id BIGINT NOT NULL,
  design_sample_id BIGINT, -- nullable
  frame_type_id BIGINT NOT NULL,
  size_id BIGINT NOT NULL,
  frame_color_id BIGINT, -- nullable
  number_of_persons INT, -- nullable (for oil painting etc)
  background_color VARCHAR(100), -- nullable - NEW FIELD FOR COLOR PICKER
  image_url TEXT, -- URL to uploaded image or base64 - UPDATED FOR LARGER CONTENT
  notes TEXT,
  FOREIGN KEY (order_id) REFERENCES orders(id),
  FOREIGN KEY (category_id) REFERENCES categories(id),
  FOREIGN KEY (design_sample_id) REFERENCES design_samples(id),
  FOREIGN KEY (frame_type_id) REFERENCES frame_types(id),
  FOREIGN KEY (size_id) REFERENCES sizes(id),
  FOREIGN KEY (frame_color_id) REFERENCES frame_colors(id)
);