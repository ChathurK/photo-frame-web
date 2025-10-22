-- ===============================================
-- MIGRATION: Remove image_url column from order_items
-- Date: 2025-10-18
-- Description: Removes image upload functionality from the database schema
-- ===============================================

USE photo;

-- Remove image_url column from order_items table
ALTER TABLE order_items DROP COLUMN IF EXISTS image_url;

-- Verify the change
DESCRIBE order_items;

-- Note: This migration removes the image_url column as image upload 
-- functionality has been removed from the application.
-- Make sure to backup your database before running this migration!
