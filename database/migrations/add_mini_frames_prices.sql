-- ===============================================
-- Migration: Add Mini Frames Prices Only
-- Date: 2025-10-18
-- Description: Adds prices for existing Mini Frames frame types
-- Note: Frame types 19-21 and sizes 8-17 already exist
-- ===============================================

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

-- Verify the prices were added
SELECT 'Mini Frames prices added successfully!' AS message;
SELECT 
    fp.frame_type_id, 
    ft.name as frame_name, 
    s.display as size, 
    CONCAT('Rs. ', FORMAT(fp.price_lkr, 0)) as price
FROM frame_prices fp
JOIN frame_types ft ON fp.frame_type_id = ft.id
JOIN sizes s ON fp.size_id = s.id
WHERE ft.category_id = 4
ORDER BY fp.frame_type_id, fp.size_id;
