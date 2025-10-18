-- ===============================================
-- Migration: Add Color Support for Plymount Frames
-- Date: 2025-10-18
-- Description: Enables Black/White color selection for all Plymount frames
-- Note: Frontend code already supports this via allows_color flag
-- ===============================================

-- Step 1: Enable color selection for all Plymount frames
UPDATE frame_types 
SET allows_color = TRUE 
WHERE material = 'Plymount';

-- Step 2: Add Black and White colors for all Plymount frames
-- Get all Plymount frame type IDs and add colors for them

INSERT INTO frame_colors (frame_type_id, name) 
SELECT id, 'Black' FROM frame_types WHERE material = 'Plymount'
UNION ALL
SELECT id, 'White' FROM frame_types WHERE material = 'Plymount';

-- Verify the changes
SELECT 'Plymount frames updated to allow colors:' AS message;
SELECT id, name, material, allows_color 
FROM frame_types 
WHERE material = 'Plymount'
ORDER BY id;

SELECT 'Colors added for Plymount frames:' AS message;
SELECT fc.id, ft.id as frame_type_id, ft.name as frame_name, fc.name as color_name
FROM frame_colors fc
JOIN frame_types ft ON fc.frame_type_id = ft.id
WHERE ft.material = 'Plymount'
ORDER BY ft.id, fc.name;

-- Summary
SELECT 
    material,
    COUNT(DISTINCT id) as frame_types,
    SUM(allows_color) as frames_with_colors
FROM frame_types
GROUP BY material
ORDER BY material;
