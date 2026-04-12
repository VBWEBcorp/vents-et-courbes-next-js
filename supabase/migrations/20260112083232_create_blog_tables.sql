/*
  # Création des tables pour le blog

  1. Nouvelles Tables
    - `authors`
      - `id` (uuid, primary key)
      - `name` (text) - Nom de l'auteur
      - `bio` (text) - Biographie courte
      - `image_url` (text) - Photo de l'auteur
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `blog_posts`
      - `id` (uuid, primary key)
      - `title` (text) - Titre de l'article
      - `slug` (text, unique) - URL de l'article
      - `published_date` (date) - Date de publication
      - `author_id` (uuid, foreign key) - Référence à authors
      - `image_url` (text) - Image principale
      - `excerpt` (text) - Extrait/résumé
      - `content` (text) - Contenu complet en Markdown
      - `seo_title` (text, nullable) - Titre SEO
      - `seo_description` (text, nullable) - Description SEO
      - `active` (boolean) - Article publié ou brouillon
      - `order_index` (integer) - Ordre d'affichage
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Sécurité
    - Enable RLS sur les deux tables
    - Les articles et auteurs sont publics en lecture
    - Seuls les admins authentifiés peuvent créer/modifier
*/

-- Table des auteurs
CREATE TABLE IF NOT EXISTS authors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  bio text DEFAULT '',
  image_url text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Table des articles de blog
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  published_date date NOT NULL DEFAULT CURRENT_DATE,
  author_id uuid REFERENCES authors(id) ON DELETE SET NULL,
  image_url text NOT NULL,
  excerpt text NOT NULL,
  content text NOT NULL,
  seo_title text,
  seo_description text,
  active boolean DEFAULT true,
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_date ON blog_posts(published_date DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_author ON blog_posts(author_id);
CREATE INDEX IF NOT EXISTS idx_blog_posts_active ON blog_posts(active);

-- Enable RLS
ALTER TABLE authors ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Policies pour authors (lecture publique)
CREATE POLICY "Anyone can view authors"
  ON authors FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert authors"
  ON authors FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update authors"
  ON authors FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete authors"
  ON authors FOR DELETE
  TO authenticated
  USING (true);

-- Policies pour blog_posts (lecture publique des articles actifs)
CREATE POLICY "Anyone can view active blog posts"
  ON blog_posts FOR SELECT
  TO public
  USING (active = true);

CREATE POLICY "Authenticated users can view all blog posts"
  ON blog_posts FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert blog posts"
  ON blog_posts FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update blog posts"
  ON blog_posts FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete blog posts"
  ON blog_posts FOR DELETE
  TO authenticated
  USING (true);