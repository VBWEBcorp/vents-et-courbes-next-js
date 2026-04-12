/*
  # Add widget and slug fields to stages table

  1. Changes
    - Add `widget_id` column to store Regiondo widget ID
    - Add `reservation_slug` column to store URL slug for reservation page
    - Remove old `reservation_url` column (deprecated)
  
  2. Purpose
    - Align stages table structure with cours table
    - Enable dynamic widget loading from database
    - Simplify reservation routing system
*/

-- Add new columns if they don't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'stages' AND column_name = 'widget_id'
  ) THEN
    ALTER TABLE stages ADD COLUMN widget_id text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'stages' AND column_name = 'reservation_slug'
  ) THEN
    ALTER TABLE stages ADD COLUMN reservation_slug text;
  END IF;
END $$;

-- Migrate existing data: extract slug from reservation_url
UPDATE stages 
SET reservation_slug = REPLACE(reservation_url, '/reservation/', '')
WHERE reservation_slug IS NULL AND reservation_url IS NOT NULL;
