-- Create database
CREATE DATABASE IF NOT EXISTS photoframe_db;
USE photoframe_db;

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
    id VARCHAR(50) PRIMARY KEY,
    category VARCHAR(100) NOT NULL,
    size VARCHAR(50) NOT NULL,
    frame_type VARCHAR(50) NOT NULL,
    frame_color VARCHAR(50) NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    customer_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    address TEXT NOT NULL,
    city VARCHAR(100) NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    status ENUM('pending', 'processing', 'completed', 'cancelled') DEFAULT 'pending',
    special_instructions TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create customers table (optional for future use)
CREATE TABLE IF NOT EXISTS customers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    address TEXT,
    city VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create products table (for frame types and sizes)
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category VARCHAR(100) NOT NULL,
    size VARCHAR(50) NOT NULL,
    size_label VARCHAR(100) NOT NULL,
    frame_type VARCHAR(50) NOT NULL,
    frame_type_label VARCHAR(100) NOT NULL,
    base_price DECIMAL(10,2) NOT NULL,
    frame_price DECIMAL(10,2) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample product data
INSERT INTO products (category, size, size_label, frame_type, frame_type_label, base_price, frame_price) VALUES
('Oil Painting', 'small', '8x10 inches', 'wooden', 'Wooden Frame', 1500.00, 500.00),
('Oil Painting', 'medium', '11x14 inches', 'wooden', 'Wooden Frame', 2500.00, 500.00),
('Oil Painting', 'large', '16x20 inches', 'wooden', 'Wooden Frame', 4500.00, 500.00),
('Oil Painting', 'xlarge', '20x24 inches', 'wooden', 'Wooden Frame', 6500.00, 500.00),

('100 Designs', 'small', '8x10 inches', 'metal', 'Metal Frame', 1500.00, 800.00),
('100 Designs', 'medium', '11x14 inches', 'metal', 'Metal Frame', 2500.00, 800.00),
('100 Designs', 'large', '16x20 inches', 'metal', 'Metal Frame', 4500.00, 800.00),
('100 Designs', 'xlarge', '20x24 inches', 'metal', 'Metal Frame', 6500.00, 800.00),

('Cute Collections', 'small', '8x10 inches', 'plastic', 'Plastic Frame', 1500.00, 300.00),
('Cute Collections', 'medium', '11x14 inches', 'plastic', 'Plastic Frame', 2500.00, 300.00),

('Mini Frames', 'small', '8x10 inches', 'wooden', 'Wooden Frame', 1000.00, 300.00);

-- Create index for better performance
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at);
CREATE INDEX idx_customers_email ON customers(email);