-- Migration: Add package_type column to order_items table
-- Date: 2025-10-18
-- Description: Adds package type field to track whether customer selected free or premium package

USE photo;

-- Add package_type column to order_items table
ALTER TABLE order_items 
ADD COLUMN package_type VARCHAR(20) DEFAULT 'free' COMMENT 'Package type: free or premium (+Rs. 450)';

-- Update existing records to have 'free' as default
UPDATE order_items SET package_type = 'free' WHERE package_type IS NULL;
