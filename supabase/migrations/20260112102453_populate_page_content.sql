/*
  # Populate page content with existing site text

  This migration populates the pages table with all the existing text content from the website.
  Each entry represents a specific section of text that can be edited through the admin panel.

  ## Content Organization:
  - Home page: Hero section, About section, Features
  - About page: Hero, presentation, team, testimonials
  - Cours page: Hero section
  - Stages page: Hero section
  - Formation Pro page: Hero section
  - Contact page: Hero section, contact info
  - Blog page: Hero section
*/

-- Delete existing data if any
DELETE FROM pages;

-- HOME PAGE CONTENT
INSERT INTO pages (page_key, page_name, section, title, subtitle, content, button_text, button_link, order_index, active) VALUES
('home_hero_title', 'Accueil - Titre Principal', 'home', 'Atelier de céramique', NULL, NULL, NULL, NULL, 1, true),
('home_hero_subtitle', 'Accueil - Sous-titre', 'home', NULL, 'Centre de formation', NULL, NULL, NULL, 2, true),
('home_hero_description', 'Accueil - Description', 'home', NULL, NULL, 'Bienvenue sur le site de Vents & Courbes, votre espace créatif aux portes de Paris.', NULL, NULL, 3, true),
('home_hero_cta1', 'Accueil - Bouton 1', 'home', NULL, NULL, NULL, 'Découvrir nos cours & stages', '#', 4, true),
('home_hero_cta2', 'Accueil - Bouton 2', 'home', NULL, NULL, NULL, 'Formation professionnelle', '/formation-pro', 5, true),
('home_about_title', 'Accueil - À propos Titre', 'home', 'Atelier de céramique à Paris', NULL, NULL, NULL, NULL, 6, true),
('home_about_description', 'Accueil - À propos Description', 'home', NULL, NULL, 'Vents et Courbes est un atelier de céramique situé aux portes de Paris, au Pré-Saint-Gervais. Nous proposons des cours, stages et formations professionnelles pour tous les niveaux.', NULL, NULL, 7, true);

-- ABOUT PAGE CONTENT
INSERT INTO pages (page_key, page_name, section, title, subtitle, content, button_text, button_link, order_index, active) VALUES
('about_hero_title', 'À propos - Titre Principal', 'about', 'Notre histoire', NULL, NULL, NULL, NULL, 1, true),
('about_hero_subtitle', 'À propos - Sous-titre', 'about', NULL, 'Vents et Courbes', NULL, NULL, NULL, 2, true),
('about_presentation_title', 'À propos - Présentation Titre', 'about', 'Un atelier de céramique aux portes de Paris', NULL, NULL, NULL, NULL, 3, true),
('about_presentation_content', 'À propos - Présentation', 'about', NULL, NULL, 'Vents et Courbes est un atelier de céramique situé au Pré-Saint-Gervais, aux portes de Paris. Depuis plus de 15 ans, nous partageons notre passion pour la céramique à travers des cours, des stages et des formations professionnelles. Notre équipe de céramistes professionnels vous accompagne dans votre apprentissage, que vous soyez débutant ou confirmé.', NULL, NULL, 4, true),
('about_team_title', 'À propos - Équipe Titre', 'about', 'Notre équipe', NULL, NULL, NULL, NULL, 5, true),
('about_team_description', 'À propos - Équipe Description', 'about', NULL, NULL, 'Une équipe passionnée de céramistes professionnels à votre service pour vous accompagner dans votre apprentissage.', NULL, NULL, 6, true);

-- COURS PAGE CONTENT
INSERT INTO pages (page_key, page_name, section, title, subtitle, content, button_text, button_link, order_index, active) VALUES
('cours_hero_title', 'Cours - Titre Principal', 'cours', 'Cours de céramique', NULL, NULL, NULL, NULL, 1, true),
('cours_hero_subtitle', 'Cours - Sous-titre', 'cours', NULL, 'Tournage & Modelage', NULL, NULL, NULL, 2, true),
('cours_hero_description', 'Cours - Description', 'cours', NULL, NULL, 'Découvrez nos cours de céramique à l''année ou au trimestre. Apprenez le tournage et le modelage avec notre équipe de professionnels.', NULL, NULL, 3, true);

-- STAGES PAGE CONTENT  
INSERT INTO pages (page_key, page_name, section, title, subtitle, content, button_text, button_link, order_index, active) VALUES
('stages_hero_title', 'Stages - Titre Principal', 'stages', 'Stages de céramique', NULL, NULL, NULL, NULL, 1, true),
('stages_hero_subtitle', 'Stages - Sous-titre', 'stages', NULL, 'Intensifs & Week-ends', NULL, NULL, NULL, 2, true),
('stages_hero_description', 'Stages - Description', 'stages', NULL, NULL, 'Participez à nos stages de céramique intensifs. Découvrez le tournage, le modelage, l''émaillage et bien d''autres techniques avec des céramistes professionnels.', NULL, NULL, 3, true);

-- FORMATION PRO PAGE CONTENT
INSERT INTO pages (page_key, page_name, section, title, subtitle, content, button_text, button_link, order_index, active) VALUES
('formation_pro_hero_title', 'Formation Pro - Titre Principal', 'formation_pro', 'Formation professionnelle', NULL, NULL, NULL, NULL, 1, true),
('formation_pro_hero_subtitle', 'Formation Pro - Sous-titre', 'formation_pro', NULL, 'Certifié Qualiopi', NULL, NULL, NULL, 2, true),
('formation_pro_hero_description', 'Formation Pro - Description', 'formation_pro', NULL, NULL, 'Vents et Courbes est un centre de formation certifié Qualiopi. Nous proposons des formations professionnelles en céramique, éligibles au financement par les OPCO.', NULL, NULL, 3, true),
('formation_pro_intro', 'Formation Pro - Introduction', 'formation_pro', 'Formation CAP Tournage en céramique', NULL, 'Préparez le CAP Tournage en céramique avec notre formation professionnelle. Un parcours complet pour maîtriser les techniques du tournage et vous préparer à l''examen.', NULL, NULL, 4, true);

-- CONTACT PAGE CONTENT
INSERT INTO pages (page_key, page_name, section, title, subtitle, content, button_text, button_link, order_index, active) VALUES
('contact_hero_title', 'Contact - Titre Principal', 'contact', 'Contactez-nous', NULL, NULL, NULL, NULL, 1, true),
('contact_hero_subtitle', 'Contact - Sous-titre', 'contact', NULL, 'Nous sommes à votre écoute', NULL, NULL, NULL, 2, true),
('contact_info_address', 'Contact - Adresse', 'contact', NULL, NULL, '33 Rue Danton, 93310 Le Pré-Saint-Gervais, France', NULL, NULL, 3, true),
('contact_info_email', 'Contact - Email', 'contact', NULL, NULL, 'contact@ventsetcourbes.org', NULL, NULL, 4, true),
('contact_info_phone', 'Contact - Téléphone', 'contact', NULL, NULL, '01 48 45 90 20', NULL, NULL, 5, true);

-- BLOG PAGE CONTENT
INSERT INTO pages (page_key, page_name, section, title, subtitle, content, button_text, button_link, order_index, active) VALUES
('blog_hero_title', 'Blog - Titre Principal', 'blog', 'Notre Blog', NULL, NULL, NULL, NULL, 1, true),
('blog_hero_subtitle', 'Blog - Sous-titre', 'blog', NULL, 'Actualités & Conseils', NULL, NULL, NULL, 2, true),
('blog_hero_description', 'Blog - Description', 'blog', NULL, NULL, 'Découvrez nos articles sur la céramique, nos actualités, nos conseils et nos inspirations créatives.', NULL, NULL, 3, true);
