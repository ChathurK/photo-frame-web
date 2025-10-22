-- ===============================
-- DUMP: frame_prices table
-- ===============================

CREATE TABLE `frame_prices` (
  `id` int NOT NULL AUTO_INCREMENT,
  `frame_type_id` int NOT NULL,
  `size_id` int NOT NULL,
  `price_lkr` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `frame_type_id` (`frame_type_id`),
  KEY `size_id` (`size_id`),
  CONSTRAINT `frame_prices_ibfk_1` FOREIGN KEY (`frame_type_id`) REFERENCES `frame_types` (`id`),
  CONSTRAINT `frame_prices_ibfk_2` FOREIGN KEY (`size_id`) REFERENCES `sizes` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ===============================================
-- OIL PAINTING FRAME PRICES (frame_type_id 1-6)
-- ===============================================
INSERT INTO `frame_prices` (`frame_type_id`, `size_id`, `price_lkr`) VALUES
-- (1) Plymount Box Frame with Plastic Beading
(1,1,2800.00),(1,2,3400.00),(1,3,3850.00),(1,4,4200.00),(1,5,4600.00),(1,6,4950.00),(1,7,5250.00),
-- (2) Plymount Embossed
(2,1,3100.00),(2,2,3500.00),(2,3,3950.00),(2,4,4200.00),(2,5,4750.00),(2,6,5000.00),(2,7,5500.00),
-- (3) Plymount Margine
(3,1,2800.00),(3,2,3400.00),(3,3,3850.00),(3,4,4100.00),(3,5,4450.00),(3,6,4750.00),(3,7,4950.00),
-- (4) Plymount Non-Margine
(4,1,2750.00),(4,2,3300.00),(4,3,3650.00),(4,4,3950.00),(4,5,4150.00),(4,6,4400.00),(4,7,4750.00),
-- (5) Fiber Frame Normal Range
(5,1,2800.00),(5,3,3700.00),(5,4,4000.00),(5,5,4350.00),(5,6,4650.00),(5,7,4950.00),
-- (6) Plymount Box Frame Non-Margine
(6,1,3000.00),(6,2,3450.00),(6,3,3900.00),(6,4,4200.00),(6,5,4500.00),(6,6,4950.00),(6,7,5200.00);

-- ===============================================
-- 100 DESIGNS FRAME PRICES (frame_type_id 7-12)
-- ===============================================
INSERT INTO `frame_prices` (`frame_type_id`, `size_id`, `price_lkr`) VALUES
-- (7) Box Plastic
(7,1,1950.00),(7,2,2500.00),(7,3,2850.00),(7,4,3200.00),(7,5,3550.00),(7,6,3950.00),(7,7,4250.00),
-- (8) Embossed
(8,1,2200.00),(8,2,2600.00),(8,3,2950.00),(8,4,3200.00),(8,5,3750.00),(8,6,4100.00),(8,7,4450.00),
-- (9) Margine
(9,1,1950.00),(9,2,2550.00),(9,3,2850.00),(9,4,3100.00),(9,5,3450.00),(9,6,3750.00),(9,7,3950.00),
-- (10) Non-Margine
(10,1,1900.00),(10,2,2450.00),(10,3,2800.00),(10,4,2950.00),(10,5,3150.00),(10,6,3400.00),(10,7,3750.00),
-- (11) Fiber Frame
(11,1,1950.00),(11,3,2850.00),(11,4,3150.00),(11,5,3350.00),(11,6,3650.00),(11,7,3950.00),
-- (12) Box Frame Non-Margine
(12,1,2250.00),(12,2,2600.00),(12,3,2950.00),(12,4,3200.00),(12,5,3550.00),(12,6,3950.00),(12,7,4250.00);

-- ===============================================
-- MINI FRAMES PRICES (frame_type_id 13-15)
-- ===============================================
INSERT INTO `frame_prices` (`frame_type_id`, `size_id`, `price_lkr`) VALUES
-- Plymount Non-Margine
(13,8,850.00),(13,9,950.00),(13,10,1500.00),(13,11,1950.00),(13,12,1650.00),(13,13,2250.00),(13,14,2500.00),
-- Plymount Embossed
(14,15,1850.00),(14,16,1500.00),
-- Rotate Frame with LED Light
(15,17,2150.00);
