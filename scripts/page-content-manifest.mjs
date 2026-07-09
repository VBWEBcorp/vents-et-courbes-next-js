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
        key: 'home_hero_third_title',
        label: 'Troisième ligne (optionnelle)',
        group: 'Bannière (haut de page)',
        type: 'title',
        title: '',
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
        button_link: '',
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
];
