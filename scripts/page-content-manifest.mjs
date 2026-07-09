// -------------------------------------------------------------------------
// Manifeste du contenu éditable du site.
//
// Chaque PAGE contient des BLOCS, dans l'ordre exact où ils apparaissent sur
// la page. C'est la source de vérité de l'éditeur « Modifier les pages » :
// l'admin affiche, pour la page choisie, le déroulé de ses blocs dans cet
// ordre (texte puis image, de haut en bas).
//
// type de bloc :
//   'title'     -> champ `title`      (une ligne)
//   'subtitle'  -> champ `subtitle`   (une ligne)
//   'paragraph' -> champ `content`    (multi-ligne)
//   'button'    -> `button_text` + `button_link`
//   'feature'   -> `title` + `content` (carte : titre + court texte)
//   'image'     -> `image_url`
//   'gallery'   -> `images[]`
//
// Les `key` (page_key) DOIVENT correspondre à ce que lisent les composants.
// -------------------------------------------------------------------------

// Images d'origine (repli si non éditées).
const LOGO = 'https://i.ibb.co/ZzWhrH6J/logo-ventsetcourbes.png';
const QUALIOPI = 'https://i.ibb.co/Q318G1sD/vignette-qualiopi-marque-de-certification-0-jpg.webp';
const CPF = 'https://i.ibb.co/GQfWb9vF/Mon-compte-formation-carr.png';
const HERO_BG = 'https://i.ibb.co/r2pTGFy7/Artisanat-Paumier-02-2017-EH-21-1-1-scaled-1.jpg';

const GALLERY = [
  'https://i.ibb.co/7w4BNrH/VC-image-galerie01.jpg',
  'https://i.ibb.co/YBH2d6WY/VC-image-galerie02.jpg',
  'https://i.ibb.co/B2D11tpV/VC-image-galerie03.jpg',
  'https://i.ibb.co/MyFKFS6q/VC-image-galerie04.jpg',
  'https://i.ibb.co/5hfqjpVq/VC-image-galerie05.jpg',
  'https://i.ibb.co/hJ6TxyrW/VC-image-galerie06.jpg',
  'https://i.ibb.co/S70yQr6N/VC-image-galerie07.jpg',
  'https://i.ibb.co/r2pTGFy7/Artisanat-Paumier-02-2017-EH-21-1-1-scaled-1.jpg',
];

const GOOGLE_LOGO = 'https://i.ibb.co/Df5krkD6/GOOGLR.png';
const MAP_IMG = 'https://i.ibb.co/TDVGN5c7/MAP-VC.png';
const BLOG_FALLBACK = 'https://i.ibb.co/7w4BNrH/VC-image-galerie01.jpg';
const FP_CAP_IMG = 'https://i.ibb.co/JWg8sRD6/Formation-pro-photo.png';
const FP_CREATEUR_IMG = 'https://i.ibb.co/5WkxqMTw/Formation-Cre-ation.jpg';

// Équipe (À propos) : photo + nom + rôle éditables par membre.
const TEAM = [
  { img: 'https://i.ibb.co/4R4VcPYX/portrait-philippe.jpg', name: 'Philippe Paumier', role: 'Fondateur de Vents et Courbes' },
  { img: 'https://i.ibb.co/V89TkzF/portrait-florence.jpg', name: 'Florence Volang', role: 'Professeure de modelage' },
  { img: 'https://i.ibb.co/jvs747gV/portrait-paola.jpg', name: 'Paola Rodriguez', role: 'Professeure de tournage' },
  { img: 'https://i.ibb.co/PzPrLr2b/portrait-frederique-ok.jpg', name: 'Frédérique Buisson', role: 'Professeure de tournage et modelage' },
  { img: 'https://i.ibb.co/Xfwhfr1c/portrait-barbara.jpg', name: 'Sylvie Barbara', role: "Formatrice des stages tournage et recherche d'émail" },
  { img: 'https://i.ibb.co/4RqtKctg/portrait-vincent.jpg', name: 'Vincent Lévy', role: 'Formateur des stages impressions sur céramique' },
  { img: 'https://i.ibb.co/Swc8dz4p/Maria-bosh.png', name: 'Maria Bosch', role: 'Formatrice des stages recherche d\'engobes vitrifiés' },
];

// Génère les blocs éditables de l'équipe (photo + nom + rôle par membre).
const teamBlocks = TEAM.flatMap((m, i) => {
  const n = i + 1;
  return [
    { key: `about_team_${n}_image`, label: `Membre ${n} — Photo`, group: 'Équipe', type: 'image', image_url: m.img },
    { key: `about_team_${n}_name`, label: `Membre ${n} — Nom`, group: 'Équipe', type: 'title', title: m.name },
    { key: `about_team_${n}_role`, label: `Membre ${n} — Rôle`, group: 'Équipe', type: 'subtitle', subtitle: m.role },
  ];
});

export const PAGE_MANIFEST = [
  // =====================================================================
  // GÉNÉRAL — éléments présents sur tout le site (logo, certifications)
  // =====================================================================
  {
    section: 'global',
    label: 'Général (logo & certifications)',
    blocks: [
      {
        key: 'global_logo',
        label: 'Logo du site',
        group: 'Identité',
        type: 'image',
        image_url: LOGO,
      },
      {
        key: 'global_qualiopi_logo',
        label: 'Logo Qualiopi (pied de page)',
        group: 'Certifications',
        type: 'image',
        image_url: QUALIOPI,
      },
      {
        key: 'global_cpf_logo',
        label: 'Logo Mon Compte Formation (CPF)',
        group: 'Certifications',
        type: 'image',
        image_url: CPF,
      },
      {
        key: 'global_google_logo',
        label: 'Logo Google (avis)',
        group: 'Certifications',
        type: 'image',
        image_url: GOOGLE_LOGO,
      },
    ],
  },

  // =====================================================================
  // ACCUEIL
  // =====================================================================
  {
    section: 'home',
    label: 'Accueil',
    blocks: [
      // --- Bannière (Hero) ---
      {
        key: 'home_hero_image',
        label: 'Image de fond de la bannière',
        group: 'Bannière (haut de page)',
        type: 'image',
        image_url: HERO_BG,
      },
      {
        key: 'home_hero_title',
        label: 'Titre principal',
        group: 'Bannière (haut de page)',
        type: 'title',
        title: 'Atelier de céramique',
      },
      {
        key: 'home_hero_subtitle',
        label: 'Sous-titre (en couleur)',
        group: 'Bannière (haut de page)',
        type: 'subtitle',
        subtitle: 'Centre de formation',
      },
      {
        key: 'home_hero_description',
        label: 'Texte de présentation',
        group: 'Bannière (haut de page)',
        type: 'paragraph',
        content:
          'Bienvenue sur le site de Vents & Courbes, votre espace créatif aux portes de Paris.',
      },
      {
        key: 'home_hero_cta1',
        label: 'Bouton 1 (ouvre cours & stages)',
        group: 'Bannière (haut de page)',
        type: 'button',
        button_text: 'Découvrir nos cours & stages',
      },
      {
        key: 'home_hero_cta2',
        label: 'Bouton 2',
        group: 'Bannière (haut de page)',
        type: 'button',
        button_text: 'Formation professionnelle',
        button_link: '/formation-pro',
      },

      // --- Atouts (6 cartes) ---
      {
        key: 'home_feature_1',
        label: 'Atout 1',
        group: 'Atouts (bandeau à icônes)',
        type: 'feature',
        title: 'Formation',
        content: 'Cours adaptés à tous niveaux',
      },
      {
        key: 'home_feature_2',
        label: 'Atout 2',
        group: 'Atouts (bandeau à icônes)',
        type: 'feature',
        title: 'Qualiopi',
        content: 'Certification qualité',
      },
      {
        key: 'home_feature_3',
        label: 'Atout 3',
        group: 'Atouts (bandeau à icônes)',
        type: 'feature',
        title: 'Artisanat',
        content: 'Savoir-faire traditionnel',
      },
      {
        key: 'home_feature_4',
        label: 'Atout 4',
        group: 'Atouts (bandeau à icônes)',
        type: 'feature',
        title: 'Le Pré Saint Gervais',
        content: 'Atelier aux portes de Paris',
      },
      {
        key: 'home_feature_5',
        label: 'Atout 5',
        group: 'Atouts (bandeau à icônes)',
        type: 'feature',
        title: 'Carte cadeau',
        content: 'Offrez la créativité',
      },
      {
        key: 'home_feature_6',
        label: 'Atout 6',
        group: 'Atouts (bandeau à icônes)',
        type: 'feature',
        title: 'Paiement',
        content: 'Facilités de paiement',
      },

      // --- Section À propos (accueil) ---
      {
        key: 'home_about_title',
        label: 'Titre',
        group: 'Section « À propos »',
        type: 'title',
        title: 'Atelier de céramique à Paris',
      },
      {
        key: 'home_about_description',
        label: 'Accroche (sous le titre)',
        group: 'Section « À propos »',
        type: 'paragraph',
        content: '',
      },
      {
        key: 'home_about_content',
        label: 'Texte principal',
        group: 'Section « À propos »',
        type: 'paragraph',
        content:
          "Vents & Courbes est un espace de création dédié à la pratique de la céramique, situé au cœur de Paris. Notre atelier offre un environnement inspirant où artistes débutants et confirmés peuvent explorer leur créativité à travers l'art ancestral de la terre.",
      },

      // --- Galerie ---
      {
        key: 'home_gallery_title',
        label: 'Titre de la galerie',
        group: 'Galerie photos',
        type: 'title',
        title: "L'atelier en images",
      },
      {
        key: 'home_gallery_description',
        label: 'Texte sous le titre',
        group: 'Galerie photos',
        type: 'paragraph',
        content: "Découvrez l'univers de Vents & Courbes à travers notre galerie",
      },
      {
        key: 'home_gallery_images',
        label: 'Photos de la galerie',
        group: 'Galerie photos',
        type: 'gallery',
        images: GALLERY,
      },

      // --- Section Blog (accueil) ---
      {
        key: 'home_blog_title',
        label: 'Titre',
        group: 'Section « Blog »',
        type: 'title',
        title: 'Notre blog',
      },
      {
        key: 'home_blog_description',
        label: 'Texte sous le titre',
        group: 'Section « Blog »',
        type: 'paragraph',
        content: 'Actualités, conseils et inspirations autour de la céramique',
      },
    ],
  },

  // =====================================================================
  // À PROPOS
  // =====================================================================
  {
    section: 'about',
    label: 'À propos',
    blocks: [
      { key: 'about_hero_title', label: 'Titre', group: 'Bannière (Hero)', type: 'title', title: "L'histoire de" },
      { key: 'about_hero_subtitle', label: 'Sous-titre (en couleur)', group: 'Bannière (Hero)', type: 'subtitle', subtitle: 'Vents & Courbes' },
      { key: 'about_hero_description', label: 'Texte de présentation', group: 'Bannière (Hero)', type: 'paragraph', content: 'Une passion pour la céramique, une équipe expérimentée, un lieu de création unique aux portes de Paris' },
      { key: 'about_hero_cta1', label: 'Bouton 1', group: 'Bannière (Hero)', type: 'button', button_text: "Découvrir l'équipe" },
      { key: 'about_hero_cta2', label: 'Bouton 2', group: 'Bannière (Hero)', type: 'button', button_text: 'Nos loisirs', button_link: '/cours' },

      { key: 'about_presentation_title', label: 'Titre', group: 'Présentation', type: 'title', title: 'Présentation de Vents & Courbes' },
      { key: 'about_presentation_fondation', label: 'Texte — Fondation', group: 'Présentation', type: 'paragraph', content: "Vents & Courbes a été fondé en 2015 par Philippe Paumier, artiste céramiste ayant plus de 20 ans d'expérience et désireux de créer un lieu d'échange et d'apprentissage autour de la pratique de la céramique." },
      { key: 'about_presentation_approche', label: 'Bloc — Approche personnalisée', group: 'Présentation', type: 'compound', title: 'Une approche personnalisée de la céramique', content: "Dans un souci de transmission du savoir-faire, d'une passion, Philippe Paumier propose une approche très personnelle de l'apprentissage de la céramique se reposant sur la répétition des gestes appris, de l'accord du geste et du corps sur la terre." },
      { key: 'about_presentation_formation', label: 'Bloc — Centre de formation', group: 'Présentation', type: 'compound', title: 'Un centre de formation certifié', content: "Aujourd'hui, Vents & Courbes est aussi un centre de formation certifié vous permettant de vous professionnaliser. Des formations professionnelles, cours et divers stages sont proposés pour tout public." },
      { key: 'about_presentation_espace', label: 'Bloc — Espace dédié', group: 'Présentation', type: 'compound', title: 'Un espace dédié à la création', content: "L'atelier offre un espace de 100 m² aux portes de Paris dédié à la création et à la recherche : une salle de tournage, une salle de modelage et de décoration sur céramique, et enfin un espace de stockage et de cuisson des pièces. Une bibliothèque est également à la disposition des élèves." },
      { key: 'about_presentation_cta', label: 'Bloc — Appel à contact', group: 'Présentation', type: 'compound', title: "Vous êtes artisan·e, artiste, designer, ou même amateur et aimez l'esprit de l'atelier mais vous voulez en savoir plus ?", content: 'Nous sommes là pour échanger', button_text: 'Échanger avec nous ↘', button_link: '/contact' },

      { key: 'about_team_title', label: 'Titre de la section', group: 'Équipe', type: 'title', title: 'Notre équipe' },
      { key: 'about_team_description', label: 'Texte sous le titre', group: 'Équipe', type: 'paragraph', content: 'Des artistes passionnés et expérimentés qui vous accompagnent dans votre découverte de la céramique' },
      ...teamBlocks,
    ],
  },

  // =====================================================================
  // COURS
  // =====================================================================
  {
    section: 'cours',
    label: 'Cours',
    blocks: [
      { key: 'cours_hero_title', label: 'Titre', group: 'Bannière (Hero)', type: 'title', title: 'Nos Cours de Céramique' },
      { key: 'cours_hero_subtitle', label: 'Sous-titre', group: 'Bannière (Hero)', type: 'subtitle', subtitle: '' },
      { key: 'cours_hero_description', label: 'Texte de présentation', group: 'Bannière (Hero)', type: 'paragraph', content: '' },

      { key: 'cours_financement_title', label: 'Titre', group: 'Financements', type: 'title', title: 'Financements Disponibles' },
      { key: 'cours_financement_description', label: 'Description', group: 'Financements', type: 'paragraph', content: '' },
      { key: 'cours_financement_link', label: 'Bouton « On fait le point »', group: 'Financements', type: 'button', button_text: 'On fait le point avec vous >' },
      { key: 'cours_guide_title', label: 'Titre — Guide de financement', group: 'Financements', type: 'title', title: 'Une possibilite de financement ?' },
      { key: 'cours_guide_financement', label: 'Bouton — Guide de financement', group: 'Financements', type: 'button', button_text: 'Consulter le guide de financement ↓' },
      { key: 'cours_cpf_title', label: 'Titre — CPF', group: 'Financements', type: 'title', title: 'Vous souhaitez financer votre formation via votre CPF ?' },
      { key: 'cours_guide_cpf', label: 'Bouton — Guide CPF', group: 'Financements', type: 'button', button_text: 'Consulter le guide de financement via CPF ↓' },

      { key: 'cours_qualiopi_link', label: 'Lien certification Qualiopi', group: 'Qualiopi', type: 'button', button_text: 'En apprendre plus sur notre certification Qualiopi' },
    ],
  },

  // =====================================================================
  // STAGES
  // =====================================================================
  {
    section: 'stages',
    label: 'Stages',
    blocks: [
      { key: 'stages_hero_title', label: 'Titre', group: 'Bannière (Hero)', type: 'title', title: 'Nos stages' },
      { key: 'stages_hero_subtitle', label: 'Sous-titre', group: 'Bannière (Hero)', type: 'subtitle', subtitle: '' },

      { key: 'stages_carte_cadeau', label: 'Bloc — Carte cadeau', group: 'Carte cadeau', type: 'compound', title: '', content: '' },
      { key: 'stages_decouvrir', label: 'Bloc — Découvrir nos stages', group: 'Découvrir', type: 'compound', title: '', content: '' },
      { key: 'stages_financement', label: 'Bloc — Financements (intro)', group: 'Financements', type: 'compound', title: '', content: '' },
      { key: 'stages_financement_title', label: 'Titre — Guide de financement', group: 'Financements', type: 'title', title: 'Une possibilité de financement ?' },
      { key: 'stages_financement_button', label: 'Bouton — Guide de financement', group: 'Financements', type: 'button', button_text: 'Consulter le guide de financement ↓' },
      { key: 'stages_cpf_title', label: 'Titre — CPF', group: 'Financements', type: 'title', title: 'Vous souhaitez financer votre formation via votre CPF ?' },
      { key: 'stages_guide_cpf', label: 'Bouton — Guide CPF', group: 'Financements', type: 'button', button_text: 'Consulter le guide de financement via CPF ↓' },

      { key: 'stages_qualiopi_link', label: 'Lien certification Qualiopi', group: 'Qualiopi', type: 'button', button_text: 'En apprendre plus sur notre certification Qualiopi' },
    ],
  },

  // =====================================================================
  // FORMATION PRO
  // =====================================================================
  {
    section: 'formation_pro',
    label: 'Formation Pro',
    blocks: [
      { key: 'formation_pro_hero_title', label: 'Titre', group: 'Bannière (Hero)', type: 'title', title: 'Formations professionnelles à la carte' },

      { key: 'formation_pro_qualiopi_text', label: 'Texte Qualiopi', group: 'Introduction', type: 'paragraph', content: 'Vents & Courbes est un organisme de formation certifié avec le label qualité' },
      { key: 'formation_pro_intro_qualiopi', label: 'Texte Qualiopi (variante)', group: 'Introduction', type: 'paragraph', content: '' },
      { key: 'formation_pro_proposition_text', label: 'Texte proposition', group: 'Introduction', type: 'paragraph', content: "Nous proposons deux formations qui s'adapteront à votre projet professionnel :" },
      { key: 'formation_pro_intro_formations', label: 'Texte proposition (variante)', group: 'Introduction', type: 'paragraph', content: '' },

      { key: 'formation_pro_cap_title', label: 'Titre CAP', group: 'Section CAP', type: 'title', title: '' },
      { key: 'formation_pro_cap_titre', label: 'Titre CAP (variante)', group: 'Section CAP', type: 'title', title: '' },
      { key: 'formation_pro_cap_description', label: 'Description CAP', group: 'Section CAP', type: 'paragraph', content: '' },

      { key: 'formation_pro_financement_title', label: 'Titre Financements', group: 'Financements', type: 'title', title: 'Financements Disponibles' },
      { key: 'formation_pro_financements_titre', label: 'Titre Financements (variante)', group: 'Financements', type: 'title', title: '' },
      { key: 'formation_pro_financement_description', label: 'Description Financements', group: 'Financements', type: 'paragraph', content: '' },
      { key: 'formation_pro_financements_description', label: 'Description Financements (variante)', group: 'Financements', type: 'paragraph', content: '' },
      { key: 'formation_pro_financement_content', label: 'Texte Financements (complément)', group: 'Financements', type: 'compound', content: '' },

      { key: 'formation_pro_guide_title', label: 'Titre — Guide de financement', group: 'Guides', type: 'title', title: 'Une possibilité de financement ?' },
      { key: 'formation_pro_guide_financement', label: 'Bouton — Guide de financement', group: 'Guides', type: 'compound', button_text: 'Consulter le guide de financement ↓' },
      { key: 'formation_pro_cpf_title', label: 'Titre — CPF', group: 'Guides', type: 'title', title: 'Vous souhaitez financer votre formation via votre CPF ?' },
      { key: 'formation_pro_guide_cpf', label: 'Bouton — Guide CPF', group: 'Guides', type: 'compound', button_text: 'Consulter le guide de financement via CPF ↓' },

      { key: 'formation_pro_cap_image', label: 'Photo — Formation CAP Tournage', group: 'Cartes formations', type: 'image', image_url: FP_CAP_IMG },
      { key: 'formation_pro_createur_image', label: 'Photo — Formation Créateur', group: 'Cartes formations', type: 'image', image_url: FP_CREATEUR_IMG },
    ],
  },

  // =====================================================================
  // CONTACT
  // =====================================================================
  {
    section: 'contact',
    label: 'Contact',
    blocks: [
      { key: 'contact_hero_title', label: 'Titre', group: 'Bannière (Hero)', type: 'title', title: 'Contactez-nous' },
      { key: 'contact_hero_description', label: 'Texte de présentation', group: 'Bannière (Hero)', type: 'paragraph', content: 'Une question, un projet ? Nous sommes là pour vous écouter et vous accompagner.' },

      { key: 'contact_info_title', label: 'Titre — Informations', group: 'Informations', type: 'title', title: '' },
      { key: 'contact_form_title', label: 'Titre — Formulaire', group: 'Formulaire', type: 'title', title: 'Envoyez-nous un message' },

      { key: 'contact_map_title', label: 'Bloc — Plan (titre + adresse)', group: 'Plan', type: 'compound', title: 'Nous trouver', content: '33 rue Danton — 93310 Le Pré-Saint-Gervais' },
      { key: 'contact_map_image', label: 'Image du plan', group: 'Plan', type: 'image', image_url: MAP_IMG },
    ],
  },

  // =====================================================================
  // BLOG
  // =====================================================================
  {
    section: 'blog',
    label: 'Blog',
    blocks: [
      { key: 'blog_hero_title', label: 'Titre', group: 'Bannière (Hero)', type: 'title', title: 'Nos actualités' },
      { key: 'blog_hero_description', label: 'Texte de présentation', group: 'Bannière (Hero)', type: 'paragraph', content: 'Découvrez nos derniers articles, conseils et actualités autour de la céramique' },
      { key: 'blog_fallback_image', label: 'Image par défaut des articles', group: 'Réglages', type: 'image', image_url: BLOG_FALLBACK },
    ],
  },
];
