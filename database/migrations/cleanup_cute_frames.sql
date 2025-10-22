-- ===============================================
-- Migration: Clean up old Cute Collection frames
-- Date: 2025-10-18
-- Description: Removes the incorrectly created Cute Collection frame types (13-18)
-- Note: Cute Collection should reuse 100 Designs frames, not have separate ones
-- ===============================================

-- First delete the prices for these frame types
DELETE FROM frame_prices WHERE frame_type_id BETWEEN 13 AND 18;

-- Then delete old Cute Collection frame types
DELETE FROM frame_types WHERE id BETWEEN 13 AND 18 AND category_id = 3;

-- Verify deletion
SELECT 'Old Cute Collection frames removed!' AS message;
SELECT 
    COUNT(*) as remaining_cute_frames
FROM frame_types 
WHERE category_id = 3;

-- Show current frame types per category
SELECT 
    c.name as category,
    COUNT(ft.id) as frame_count
FROM categories c
LEFT JOIN frame_types ft ON c.id = ft.category_id
GROUP BY c.id, c.name
ORDER BY c.id;
