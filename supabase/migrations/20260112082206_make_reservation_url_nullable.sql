/*
  # Make reservation_url nullable in stages table

  1. Changes
    - Make `reservation_url` column nullable (transitioning to reservation_slug)
  
  2. Purpose
    - Allow new stages to be created without reservation_url
    - Preparing to deprecate reservation_url in favor of reservation_slug
*/

-- Make reservation_url nullable
ALTER TABLE stages ALTER COLUMN reservation_url DROP NOT NULL;
