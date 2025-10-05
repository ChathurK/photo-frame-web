-- ==========================================================
-- PHOTO & FRAME SELLING WEBSITE SEED DATA (MySQL)
-- ==========================================================

-- =========================
-- 1. CATEGORIES
-- =========================
INSERT IGNORE INTO categories (id, code, name, description) VALUES
(1, 'OIL', 'Oil Painting', 'Classic oil painting style portraits with rich textures and vibrant colors'),
(2, 'HUNDRED', '100 Designs', 'Choose from 100 unique design templates'),
(3, 'CUTE', 'Cute Collections', 'Adorable and charming designs perfect for family photos'),
(4, 'MINI', 'Mini Frames', 'Compact and elegant mini frames perfect for any space');

-- =========================
-- 2. COMMON SIZES (inches)
-- =========================
INSERT IGNORE INTO sizes (id, width, height, unit, display) VALUES
(1, 6, 8, 'inch', '6x8'),
(2, 8, 10, 'inch', '8x10'),
(3, 8, 12, 'inch', '8x12'),
(4, 10, 12, 'inch', '10x12'),
(5, 10, 15, 'inch', '10x15'),
(6, 12, 15, 'inch', '12x15'),
(7, 12, 18, 'inch', '12x18');

-- =========================
-- 3. MINI FRAME SIZES (cm/inch)
-- =========================
INSERT IGNORE INTO sizes (id, width, height, unit, display) VALUES
(8, 7.5, 7.5, 'cm', '7.5cm x 7.5cm'),
(9, 9.5, 20, 'cm', '9.5cm x 20cm'),
(10, 10, 10, 'cm', '10cm x 10cm'),
(11, 10, 30, 'cm', '10cm x 30cm'),
(12, 19.5, 25, 'cm', '19.5cm x 25cm'),
(13, 20, 20, 'cm', '20cm x 20cm'),
(14, 20, 40.5, 'cm', '20cm x 40.5cm'),
(15, 4, 6, 'inch', '4x6 inch (2 Image Frame)'),
(16, 12.7, 17.5, 'cm', '12.7cm x 17.5cm (3 Image Frame)'),
(17, 6, 8, 'inch', 'Rotate Frame with LED (6x8 inch)'),
(18, 4, 6, 'inch', 'Rotate Frame with LED (4x6 inch)');

-- =========================
-- 4. OIL PAINTING FRAME TYPES
-- =========================
INSERT IGNORE INTO frame_types (id, code, name, material, category_id, allows_color) VALUES
(1, 'OIL_PLY_NON_MARGIN', 'Plymount Non-margine', 'Plymount', 1, false),
(2, 'OIL_PLY_MARGIN', 'Plymount Margine', 'Plymount', 1, false),
(3, 'OIL_PLY_PLASTIC', 'Plymount With Plastic Beading', 'Plymount', 1, false),
(4, 'OIL_PLY_BOX_PLASTIC', 'Plymount Box Frame With Plastic Beading', 'Plymount', 1, false),
(5, 'OIL_PLY_EMBOSSED', 'Plymount Embossed', 'Plymount', 1, false);

-- Map Oil Painting frame types to the 7 inch sizes
INSERT IGNORE INTO frame_type_sizes (frame_type_id, size_id)
SELECT f.id, s.id
FROM frame_types f
JOIN sizes s ON s.id BETWEEN 1 AND 7
WHERE f.category_id = 1;

-- =========================
-- 5. 100 DESIGNS FRAME TYPES
-- =========================
INSERT IGNORE INTO frame_types (id, code, name, material, category_id, allows_color) VALUES
(6, 'HUNDRED_FIBER', 'Fiber Frame', 'Fiber', 2, true),
(7, 'HUNDRED_PLY_NON_MARGIN', 'Plymount Non-margine', 'Plymount', 2, false),
(8, 'HUNDRED_PLY_MARGIN', 'Plymount Margine', 'Plymount', 2, false),
(9, 'HUNDRED_PLY_PLASTIC', 'Plymount With Plastic Beading', 'Plymount', 2, false),
(10, 'HUNDRED_PLY_BOX_PLASTIC', 'Plymount Box Frame With Plastic Beading', 'Plymount', 2, false),
(11, 'HUNDRED_PLY_EMBOSSED', 'Plymount Embossed', 'Plymount', 2, false),
(12, 'HUNDRED_PINEWOOD_DARK', 'Pinewood Dark Frame', 'Pinewood', 2, false),
(13, 'HUNDRED_PINEWOOD_LIGHT', 'Pinewood Light Frame', 'Pinewood', 2, false);

-- Fiber frame colors
INSERT IGNORE INTO frame_colors (name, frame_type_id) VALUES
('Black', 6),
('White', 6),
('Brown', 6),
('Pinewood', 6);

-- Link 100 Designs frame types to 7 common inch sizes
INSERT IGNORE INTO frame_type_sizes (frame_type_id, size_id)
SELECT f.id, s.id
FROM frame_types f
JOIN sizes s ON s.id BETWEEN 1 AND 7
WHERE f.category_id = 2;

-- =========================
-- 6. CUTE COLLECTIONS FRAME TYPES
-- =========================
INSERT IGNORE INTO frame_types (id, code, name, material, category_id, allows_color) VALUES
(14, 'CUTE_FIBER', 'Fiber Frame', 'Fiber', 3, true),
(15, 'CUTE_PLY_NON_MARGIN', 'Plymount Non-margine', 'Plymount', 3, false),
(16, 'CUTE_PLY_MARGIN', 'Plymount Margine', 'Plymount', 3, false),
(17, 'CUTE_PLY_PLASTIC', 'Plymount With Plastic Beading', 'Plymount', 3, false),
(18, 'CUTE_PLY_BOX_PLASTIC', 'Plymount Box Frame With Plastic Beading', 'Plymount', 3, false),
(19, 'CUTE_PLY_EMBOSSED', 'Plymount Embossed', 'Plymount', 3, false);

-- Fiber frame colors for Cute Collection
INSERT IGNORE INTO frame_colors (name, frame_type_id) VALUES
('Black', 14),
('White', 14),
('Brown', 14),
('Pinewood', 14);

-- Link Cute Collection frame types to 7 inch sizes
INSERT IGNORE INTO frame_type_sizes (frame_type_id, size_id)
SELECT f.id, s.id
FROM frame_types f
JOIN sizes s ON s.id BETWEEN 1 AND 7
WHERE f.category_id = 3;

-- =========================
-- 7. MINI FRAMES FRAME TYPES
-- =========================
INSERT IGNORE INTO frame_types (id, code, name, material, category_id, allows_color) VALUES
(20, 'MINI_PLY_NON_MARGIN', 'Plymount Non-margine', 'Plymount', 4, false),
(21, 'MINI_PLY_EMBOSSED', 'Plymount Embossed', 'Plymount', 4, false),
(22, 'MINI_ROTATE_LED', 'Rotate Frame with LED', 'Plastic', 4, false);

-- Map frame sizes
-- Plymount Non-margine → 7 mini cm sizes
INSERT IGNORE INTO frame_type_sizes (frame_type_id, size_id)
SELECT 20, s.id FROM sizes s WHERE s.id BETWEEN 8 AND 14;

-- Plymount Embossed → 2 multi-image sizes
INSERT IGNORE INTO frame_type_sizes (frame_type_id, size_id)
SELECT 21, s.id FROM sizes s WHERE s.id IN (15, 16);

-- Rotate Frames → 2 LED sizes
INSERT IGNORE INTO frame_type_sizes (frame_type_id, size_id)
SELECT 22, s.id FROM sizes s WHERE s.id IN (17, 18);

-- =========================
-- 8. 100 DESIGN SAMPLES (DT1–DT100)
-- =========================
-- MySQL-specific generation using numbers table trick
-- This generates DT1, DT2, …, DT100 automatically
INSERT IGNORE INTO design_samples (code, display_name, category_id)
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