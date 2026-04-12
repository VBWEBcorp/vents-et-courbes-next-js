/*
  # Create pages table for site content management

  1. New Tables
    - `pages`
      - `id` (uuid, primary key)
      - `page_key` (text, unique) - Identifiant unique de la page (ex: 'home_hero', 'about_intro')
      - `page_name` (text) - Nom lisible de la page (ex: 'Accueil - Hero')
      - `section` (text) - Section du site (ex: 'home', 'about', 'contact')
      - `title` (text, nullable) - Titre du contenu
      - `subtitle` (text, nullable) - Sous-titre
      - `content` (text, nullable) - Contenu principal
      - `button_text` (text, nullable) - Texte du bouton
      - `button_link` (text, nullable) - Lien du bouton
      - `order_index` (integer) - Ordre d'affichage
      - `active` (boolean) - Si le contenu est actif
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `pages` table
    - Add policy for public read access
    - Add policy for authenticated admin write access
*/

CREATE TABLE IF NOT EXISTS pages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_key text UNIQUE NOT NULL,
  page_name text NOT NULL,
  section text NOT NULL,
  title text,
  subtitle text,
  content text,
  button_text text,
  button_link text,
  order_index integer DEFAULT 0,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE pages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read active pages"
  ON pages
  FOR SELECT
  TO anon, authenticated
  USING (active = true);

CREATE POLICY "Authenticated users can read all pages"
  ON pages
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert pages"
  ON pages
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update pages"
  ON pages
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete pages"
  ON pages
  FOR DELETE
  TO authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS idx_pages_section ON pages(section);
CREATE INDEX IF NOT EXISTS idx_pages_page_key ON pages(page_key);
CREATE INDEX IF NOT EXISTS idx_pages_order ON pages(order_index);
