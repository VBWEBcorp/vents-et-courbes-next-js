/*
  # Ajout des contenus manquants et mise à jour des libellés

  1. Mise à jour des libellés existants
    - Renommage des `page_name` pour être plus clairs et compréhensibles
    - Format : "Section - Description du champ"

  2. Nouveaux contenus - Page Accueil (home)
    - `home_about_content` : Texte principal de la section À propos
    - `home_gallery_title` : Titre de la galerie
    - `home_gallery_description` : Description de la galerie
    - `home_blog_title` : Titre de la section blog
    - `home_blog_description` : Description de la section blog

  3. Nouveaux contenus - Page À Propos (about)
    - `about_hero_description` : Description du bandeau
    - `about_hero_cta1` : Bouton découvrir l'équipe
    - `about_hero_cta2` : Bouton nos loisirs
    - `about_presentation_fondation` : Texte de fondation
    - `about_presentation_approche` : Section approche personnalisée
    - `about_presentation_formation` : Section centre de formation
    - `about_presentation_espace` : Section espace dédié
    - `about_presentation_cta` : Appel à l'action

  4. Nouveaux contenus - Page Cours (cours)
    - `cours_financement_title` : Titre financements
    - `cours_financement_description` : Description financements
    - `cours_financement_link` : Texte du lien financement
    - `cours_qualiopi_link` : Texte du lien Qualiopi

  5. Nouveaux contenus - Page Stages (stages)
    - `stages_financement_title` : Titre financement
    - `stages_financement_button` : Texte du bouton téléchargement
    - `stages_qualiopi_link` : Texte du lien Qualiopi

  6. Nouveaux contenus - Page Formation Pro (formation_pro)
    - `formation_pro_qualiopi_text` : Texte introduction Qualiopi
    - `formation_pro_proposition_text` : Texte proposition formations
    - `formation_pro_cap_title` : Titre section CAP
    - `formation_pro_cap_description` : Description section CAP
    - `formation_pro_financement_title` : Titre financements
    - `formation_pro_financement_description` : Description financements
    - `formation_pro_guide_title` : Titre guide financement
    - `formation_pro_cpf_title` : Titre guide CPF

  7. Nouveaux contenus - Page Contact (contact)
    - `contact_hero_description` : Description du bandeau contact
*/

-- ==============================================
-- MISE À JOUR DES LIBELLÉS EXISTANTS
-- ==============================================

UPDATE pages SET page_name = 'Bandeau - Titre principal' WHERE page_key = 'home_hero_title';
UPDATE pages SET page_name = 'Bandeau - Sous-titre' WHERE page_key = 'home_hero_subtitle';
UPDATE pages SET page_name = 'Bandeau - Description' WHERE page_key = 'home_hero_description';
UPDATE pages SET page_name = 'Bandeau - Bouton cours & stages' WHERE page_key = 'home_hero_cta1';
UPDATE pages SET page_name = 'Bandeau - Bouton formation pro' WHERE page_key = 'home_hero_cta2';
UPDATE pages SET page_name = 'Section À propos - Titre' WHERE page_key = 'home_about_title';
UPDATE pages SET page_name = 'Section À propos - Description' WHERE page_key = 'home_about_description';

UPDATE pages SET page_name = 'Bandeau - Titre principal' WHERE page_key = 'about_hero_title';
UPDATE pages SET page_name = 'Bandeau - Sous-titre' WHERE page_key = 'about_hero_subtitle';
UPDATE pages SET page_name = 'Présentation - Titre de section' WHERE page_key = 'about_presentation_title';
UPDATE pages SET page_name = 'Présentation - Texte principal' WHERE page_key = 'about_presentation_content';
UPDATE pages SET page_name = 'Équipe - Titre de section' WHERE page_key = 'about_team_title';
UPDATE pages SET page_name = 'Équipe - Description' WHERE page_key = 'about_team_description';

UPDATE pages SET page_name = 'Bandeau - Titre principal' WHERE page_key = 'cours_hero_title';
UPDATE pages SET page_name = 'Bandeau - Sous-titre' WHERE page_key = 'cours_hero_subtitle';
UPDATE pages SET page_name = 'Bandeau - Description' WHERE page_key = 'cours_hero_description';

UPDATE pages SET page_name = 'Bandeau - Titre principal' WHERE page_key = 'stages_hero_title';
UPDATE pages SET page_name = 'Bandeau - Sous-titre' WHERE page_key = 'stages_hero_subtitle';
UPDATE pages SET page_name = 'Bandeau - Description' WHERE page_key = 'stages_hero_description';

UPDATE pages SET page_name = 'Bandeau - Titre principal' WHERE page_key = 'formation_pro_hero_title';
UPDATE pages SET page_name = 'Bandeau - Sous-titre' WHERE page_key = 'formation_pro_hero_subtitle';
UPDATE pages SET page_name = 'Bandeau - Description' WHERE page_key = 'formation_pro_hero_description';
UPDATE pages SET page_name = 'Introduction - Texte' WHERE page_key = 'formation_pro_intro';

UPDATE pages SET page_name = 'Bandeau - Titre principal' WHERE page_key = 'contact_hero_title';
UPDATE pages SET page_name = 'Bandeau - Sous-titre' WHERE page_key = 'contact_hero_subtitle';
UPDATE pages SET page_name = 'Informations - Adresse' WHERE page_key = 'contact_info_address';
UPDATE pages SET page_name = 'Informations - Email' WHERE page_key = 'contact_info_email';
UPDATE pages SET page_name = 'Informations - Téléphone' WHERE page_key = 'contact_info_phone';

UPDATE pages SET page_name = 'Bandeau - Titre principal' WHERE page_key = 'blog_hero_title';
UPDATE pages SET page_name = 'Bandeau - Sous-titre' WHERE page_key = 'blog_hero_subtitle';
UPDATE pages SET page_name = 'Bandeau - Description' WHERE page_key = 'blog_hero_description';

-- ==============================================
-- NOUVEAUX CONTENUS - PAGE ACCUEIL
-- ==============================================

INSERT INTO pages (page_key, page_name, section, content, order_index, active)
SELECT 'home_about_content', 'Section À propos - Texte principal', 'home',
  'Vents & Courbes est un espace de création dédié à la pratique de la céramique, situé au cœur de Paris. Notre atelier offre un environnement inspirant où artistes débutants et confirmés peuvent explorer leur créativité à travers l''art ancestral de la terre.',
  8, true
WHERE NOT EXISTS (SELECT 1 FROM pages WHERE page_key = 'home_about_content');

INSERT INTO pages (page_key, page_name, section, title, order_index, active)
SELECT 'home_gallery_title', 'Section Galerie - Titre', 'home',
  'L''atelier en images', 9, true
WHERE NOT EXISTS (SELECT 1 FROM pages WHERE page_key = 'home_gallery_title');

INSERT INTO pages (page_key, page_name, section, content, order_index, active)
SELECT 'home_gallery_description', 'Section Galerie - Description', 'home',
  'Découvrez l''univers de Vents & Courbes à travers notre galerie', 10, true
WHERE NOT EXISTS (SELECT 1 FROM pages WHERE page_key = 'home_gallery_description');

INSERT INTO pages (page_key, page_name, section, title, order_index, active)
SELECT 'home_blog_title', 'Section Blog - Titre', 'home',
  'Nos actualités', 11, true
WHERE NOT EXISTS (SELECT 1 FROM pages WHERE page_key = 'home_blog_title');

INSERT INTO pages (page_key, page_name, section, content, order_index, active)
SELECT 'home_blog_description', 'Section Blog - Description', 'home',
  'Suivez l''actualité de notre atelier, nos nouveaux cours, expositions et événements créatifs', 12, true
WHERE NOT EXISTS (SELECT 1 FROM pages WHERE page_key = 'home_blog_description');

-- ==============================================
-- NOUVEAUX CONTENUS - PAGE À PROPOS
-- ==============================================

INSERT INTO pages (page_key, page_name, section, content, order_index, active)
SELECT 'about_hero_description', 'Bandeau - Description', 'about',
  'Une passion pour la céramique, une équipe expérimentée, un lieu de création unique aux portes de Paris', 3, true
WHERE NOT EXISTS (SELECT 1 FROM pages WHERE page_key = 'about_hero_description');

INSERT INTO pages (page_key, page_name, section, button_text, order_index, active)
SELECT 'about_hero_cta1', 'Bandeau - Bouton découvrir l''équipe', 'about',
  'Découvrir l''équipe', 4, true
WHERE NOT EXISTS (SELECT 1 FROM pages WHERE page_key = 'about_hero_cta1');

INSERT INTO pages (page_key, page_name, section, button_text, button_link, order_index, active)
SELECT 'about_hero_cta2', 'Bandeau - Bouton nos loisirs', 'about',
  'Nos loisirs', '/cours', 5, true
WHERE NOT EXISTS (SELECT 1 FROM pages WHERE page_key = 'about_hero_cta2');

INSERT INTO pages (page_key, page_name, section, content, order_index, active)
SELECT 'about_presentation_fondation', 'Présentation - Texte de fondation', 'about',
  'Vents & Courbes a été fondé en 2015 par Philippe Paumier, artiste céramiste ayant plus de 20 ans d''expérience et désireux de créer un lieu d''échange et d''apprentissage autour de la pratique de la céramique.', 7, true
WHERE NOT EXISTS (SELECT 1 FROM pages WHERE page_key = 'about_presentation_fondation');

INSERT INTO pages (page_key, page_name, section, title, content, order_index, active)
SELECT 'about_presentation_approche', 'Présentation - Approche personnalisée', 'about',
  'Une approche personnalisée de la céramique',
  'Dans un souci de transmission du savoir-faire, d''une passion, Philippe Paumier propose une approche très personnelle de l''apprentissage de la céramique se reposant sur la répétition des gestes appris, de l''accord du geste et du corps sur la terre.', 8, true
WHERE NOT EXISTS (SELECT 1 FROM pages WHERE page_key = 'about_presentation_approche');

INSERT INTO pages (page_key, page_name, section, title, content, order_index, active)
SELECT 'about_presentation_formation', 'Présentation - Centre de formation', 'about',
  'Un centre de formation certifié',
  'Aujourd''hui, Vents & Courbes est aussi un centre de formation certifié vous permettant de vous professionnaliser. Des formations professionnelles, cours et divers stages sont proposés pour tout public.', 9, true
WHERE NOT EXISTS (SELECT 1 FROM pages WHERE page_key = 'about_presentation_formation');

INSERT INTO pages (page_key, page_name, section, title, content, order_index, active)
SELECT 'about_presentation_espace', 'Présentation - L''espace de création', 'about',
  'Un espace dédié à la création',
  'L''atelier offre un espace de 100 m² aux portes de Paris dédié à la création et à la recherche : une salle de tournage, une salle de modelage et de décoration sur céramique, et enfin un espace de stockage et de cuisson des pièces. Une bibliothèque est également à la disposition des élèves.', 10, true
WHERE NOT EXISTS (SELECT 1 FROM pages WHERE page_key = 'about_presentation_espace');

INSERT INTO pages (page_key, page_name, section, title, content, button_text, button_link, order_index, active)
SELECT 'about_presentation_cta', 'Présentation - Appel à l''action', 'about',
  'Vous êtes artisan·e, artiste, designer, ou même amateur et aimez l''esprit de l''atelier mais vous voulez en savoir plus ?',
  'Nous sommes là pour échanger',
  'Échanger avec nous', '/contact', 11, true
WHERE NOT EXISTS (SELECT 1 FROM pages WHERE page_key = 'about_presentation_cta');

-- ==============================================
-- NOUVEAUX CONTENUS - PAGE COURS
-- ==============================================

INSERT INTO pages (page_key, page_name, section, title, order_index, active)
SELECT 'cours_financement_title', 'Financements - Titre', 'cours',
  'Financements Disponibles', 4, true
WHERE NOT EXISTS (SELECT 1 FROM pages WHERE page_key = 'cours_financement_title');

INSERT INTO pages (page_key, page_name, section, content, order_index, active)
SELECT 'cours_financement_description', 'Financements - Description', 'cours',
  'Nos cours sont éligibles à des financements via les OPCO. Contactez-nous pour en savoir plus.', 5, true
WHERE NOT EXISTS (SELECT 1 FROM pages WHERE page_key = 'cours_financement_description');

INSERT INTO pages (page_key, page_name, section, button_text, order_index, active)
SELECT 'cours_financement_link', 'Financements - Texte du lien', 'cours',
  'On fait le point avec vous >', 6, true
WHERE NOT EXISTS (SELECT 1 FROM pages WHERE page_key = 'cours_financement_link');

INSERT INTO pages (page_key, page_name, section, button_text, order_index, active)
SELECT 'cours_qualiopi_link', 'Qualiopi - Texte du lien', 'cours',
  'En apprendre plus sur notre certification Qualiopi', 7, true
WHERE NOT EXISTS (SELECT 1 FROM pages WHERE page_key = 'cours_qualiopi_link');

-- ==============================================
-- NOUVEAUX CONTENUS - PAGE STAGES
-- ==============================================

INSERT INTO pages (page_key, page_name, section, title, order_index, active)
SELECT 'stages_financement_title', 'Financements - Titre', 'stages',
  'Une possibilité de financement ?', 4, true
WHERE NOT EXISTS (SELECT 1 FROM pages WHERE page_key = 'stages_financement_title');

INSERT INTO pages (page_key, page_name, section, button_text, order_index, active)
SELECT 'stages_financement_button', 'Financements - Texte du bouton téléchargement', 'stages',
  'Télécharger le guide de financement ↓', 5, true
WHERE NOT EXISTS (SELECT 1 FROM pages WHERE page_key = 'stages_financement_button');

INSERT INTO pages (page_key, page_name, section, button_text, order_index, active)
SELECT 'stages_qualiopi_link', 'Qualiopi - Texte du lien', 'stages',
  'En apprendre plus sur notre certification Qualiopi', 6, true
WHERE NOT EXISTS (SELECT 1 FROM pages WHERE page_key = 'stages_qualiopi_link');

-- ==============================================
-- NOUVEAUX CONTENUS - PAGE FORMATION PRO
-- ==============================================

INSERT INTO pages (page_key, page_name, section, content, order_index, active)
SELECT 'formation_pro_qualiopi_text', 'Introduction - Texte Qualiopi', 'formation_pro',
  'Vents & Courbes est un organisme de formation certifié avec le label qualité Qualiopi.', 5, true
WHERE NOT EXISTS (SELECT 1 FROM pages WHERE page_key = 'formation_pro_qualiopi_text');

INSERT INTO pages (page_key, page_name, section, content, order_index, active)
SELECT 'formation_pro_proposition_text', 'Introduction - Texte proposition formations', 'formation_pro',
  'Nous proposons deux formations qui s''adapteront à votre projet professionnel :', 6, true
WHERE NOT EXISTS (SELECT 1 FROM pages WHERE page_key = 'formation_pro_proposition_text');

INSERT INTO pages (page_key, page_name, section, title, order_index, active)
SELECT 'formation_pro_cap_title', 'Section CAP - Titre', 'formation_pro',
  'La Formation CAP Tournage en Céramique', 7, true
WHERE NOT EXISTS (SELECT 1 FROM pages WHERE page_key = 'formation_pro_cap_title');

INSERT INTO pages (page_key, page_name, section, content, order_index, active)
SELECT 'formation_pro_cap_description', 'Section CAP - Description', 'formation_pro',
  'La formation CAP Tournage en Céramique et la formation CAP Tournage en Céramique OPTION Créateur sont dispensées à partir d''un socle pédagogique commun, avec une adaptation aux particularités, objectifs et envies de chacun.', 8, true
WHERE NOT EXISTS (SELECT 1 FROM pages WHERE page_key = 'formation_pro_cap_description');

INSERT INTO pages (page_key, page_name, section, title, order_index, active)
SELECT 'formation_pro_financement_title', 'Financements - Titre', 'formation_pro',
  'Financements Disponibles', 9, true
WHERE NOT EXISTS (SELECT 1 FROM pages WHERE page_key = 'formation_pro_financement_title');

INSERT INTO pages (page_key, page_name, section, content, order_index, active)
SELECT 'formation_pro_financement_description', 'Financements - Description', 'formation_pro',
  'Ces formations sont éligibles à des financements tels que les Opco (ex: AFDAS), la région (ex: Aire2), Transition Pro, etc. Contactez-nous pour obtenir plus d''informations sur les possibilités de financement !', 10, true
WHERE NOT EXISTS (SELECT 1 FROM pages WHERE page_key = 'formation_pro_financement_description');

INSERT INTO pages (page_key, page_name, section, title, order_index, active)
SELECT 'formation_pro_guide_title', 'Guide financement - Titre', 'formation_pro',
  'Une possibilité de financement ?', 11, true
WHERE NOT EXISTS (SELECT 1 FROM pages WHERE page_key = 'formation_pro_guide_title');

INSERT INTO pages (page_key, page_name, section, title, order_index, active)
SELECT 'formation_pro_cpf_title', 'Guide CPF - Titre', 'formation_pro',
  'Vous souhaitez financer votre formation via votre CPF ?', 12, true
WHERE NOT EXISTS (SELECT 1 FROM pages WHERE page_key = 'formation_pro_cpf_title');

-- ==============================================
-- NOUVEAU CONTENU - PAGE CONTACT
-- ==============================================

INSERT INTO pages (page_key, page_name, section, content, order_index, active)
SELECT 'contact_hero_description', 'Bandeau - Description', 'contact',
  'Une question, un projet ? Nous sommes là pour vous écouter et vous accompagner.', 3, true
WHERE NOT EXISTS (SELECT 1 FROM pages WHERE page_key = 'contact_hero_description');
