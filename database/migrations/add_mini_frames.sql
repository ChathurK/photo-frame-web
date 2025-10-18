-- ===============================================
-- Migration: Add Mini Frames Category Data
-- Date: 2025-10-18
-- Description: Adds frame types, sizes, and prices for Mini Frames category
-- ===============================================

-- First, add Mini Frame specific sizes if they don't exist
INSERT IGNORE INTO sizes (id, width, height, unit, display) VALUES
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

-- Add Mini Frames frame types (using IDs 19-21 to avoid conflicts)
INSERT INTO frame_types (id, category_id, name, code, material, allows_color) VALUES
(19, 4, 'Plymount Non-Margine', 'MINI_NON_MARGIN', 'Plymount', FALSE),
(20, 4, 'Plymount Embossed', 'MINI_EMBOSSED', 'Plymount', FALSE),
(21, 4, 'Rotate Frame with LED Light', 'MINI_ROTATE_LED', 'Plastic', FALSE);

-- Add prices for Mini Frames
INSERT INTO frame_prices (frame_type_id, size_id, price_lkr) VALUES
-- Plymount Non-Margine (frame 19)
(19, 8, 850),   -- 3x3
(19, 9, 950),   -- 4x4
(19, 10, 1500), -- 4x8
(19, 11, 1950), -- 4x12
(19, 12, 1650), -- 8x8
(19, 13, 2250), -- 8x10
(19, 14, 2500), -- 8x16

-- Plymount Embossed (frame 20)
(20, 15, 1850), -- 4x6
(20, 16, 1500), -- 5x7

-- Rotate Frame with LED Light (frame 21)
(21, 17, 2150); -- 6x8 (LED)

-- Verify the data
SELECT 'Mini Frames frame types added:' AS message;
SELECT ft.id, ft.name, ft.material, c.name as category
FROM frame_types ft
JOIN categories c ON ft.category_id = c.id
WHERE ft.category_id = 4;

SELECT 'Mini Frames sizes added:' AS message;
SELECT * FROM sizes WHERE id BETWEEN 8 AND 17;

SELECT 'Mini Frames prices added:' AS message;
SELECT fp.frame_type_id, ft.name as frame_name, s.display as size, fp.price_lkr
FROM frame_prices fp
JOIN frame_types ft ON fp.frame_type_id = ft.id
JOIN sizes s ON fp.size_id = s.id
WHERE ft.category_id = 4
ORDER BY fp.frame_type_id, fp.size_id;
