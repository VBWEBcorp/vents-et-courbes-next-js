import client, { BlogPost, Author } from '../lib/contentful';
import { Document, BLOCKS, MARKS } from '@contentful/rich-text-types';

// --- Interfaces pour les Content Types ---

// Interface pour le contenu de la page d'accueil
export interface HomePageContent {
  title: string; // Titre interne pour Contentful
  // Champs pour la section Hero
  heroMainTitle: string;
  heroSubTitle?: string;
  heroDescription?: string;
  heroCta1Text?: string;
  heroCta1Link?: string;
  heroCta2Text?: string;
  heroCta2Link?: string;
  // Champs pour la section Features (exemple, à étendre)
  featuresTitle?: string;
  featuresDescription?: string;
  // Champs pour la section About (exemple, à étendre)
  aboutTitle?: string;
  aboutDescription?: string;
  // Champs pour la section Gallery (exemple, à étendre)
  galleryTitle?: string;
  galleryDescription?: string;
  // Champs pour la section Blog (exemple, à étendre)
  blogTitle?: string;
  blogDescription?: string;
  aboutMainContent?: Document;
  aboutProfessionalFeatures?: { icon: string; title: string; description: string; }[];
  featuresList?: { icon: string; title: string; description: string; }[];
}

// Interface pour le contenu de la page Cours
export interface CoursPageContent {
  title: string;
  heroMainTitle: string;
  heroSubTitle?: string;
  heroDescription?: string;
  introParagraph?: Document;
  formulasSectionTitle?: string;
  formulasSectionDescription?: Document;
  featuresTitle?: string;
  featuresDescription?: string;
  financementDescription?: string;
  financingLinkText?: string;
  qualiopiDescription?: string;
  qualiopiLinkText?: string;
  coursesList?: CourseItem[];
}

// Interface pour un cours individuel
export interface CourseItem {
  title: string;
  duration: string;
  level: string;
  image: string;
  description: string;
  includes: string;
  price: string;
  additional?: string;
  additionalText: string;
  opco?: string;
  reservationSlug: string;
  widgetId: string;
}

// Interface pour le contenu de la page Stages
export interface StagesPageContent {
  title: string;
  heroMainTitle: string;
  heroSubTitle?: string;
  carteCadeauTitle?: string;
  carteCadeauDescription?: Document;
  carteCadeauDetails?: Document;
  decouvrirTitle?: string;
  decouvrirDescription?: Document;
  financementTitle?: string;
  financementDescription?: Document;
  financingLinkText?: string;
  qualiopiLinkText?: string;
  actionButtons?: ActionButton[];
  stagesList?: StageItem[];
}

// Interface pour un stage individuel
export interface StageItem {
  title: string;
  duration: string;
  level: string;
  image: string;
  description: string;
  includes: string;
  price: string;
  additional?: string;
  additionalText: string;
  opco?: string;
  reservationUrl: string;
}

// Interface pour les boutons d'action
export interface ActionButton {
  text: string;
  color: string;
  action?: string;
}

// Interface pour le contenu de la page Formation Pro
export interface FormationProPageContent {
  title: string;
  heroMainTitle: string;
  heroSubTitle?: string;
  formationsProDescription?: Document;
  capFormationTitle?: string;
  capFormationDescription?: Document;
  financementsTitle?: string;
  financementsDescription?: Document;
  financementsDetails?: Document;
  ctaSections?: CtaSection[];
  formationsList?: FormationItem[];
  qualiopiLinkText?: string;
  financingLinkText?: string;
}

// Interface pour les formations
export interface FormationItem {
  title: string;
  subtitle: string;
  description: string;
  specs: FormationSpec;
  price: string;
  priceDetails: string;
  additionalInfo: string[];
  programLink: string;
}

// Interface pour les spécifications de formation
export interface FormationSpec {
  label: string;
  duration: string;
  format: string;
}

// Interface pour les sections CTA
export interface CtaSection {
  title: string;
  description?: string;
  linkText: string;
  linkAction: string;
}

// Interface pour le contenu de la page À propos
export interface AboutPageContent {
  title: string;
  heroMainTitle: string;
  heroSubTitle?: string;
  heroDescription?: string;
  presentationTitle?: string;
  presentationDescription?: string;
  equipeTitle?: string;
  equipeDescription?: string;
  temoignagesTitle?: string;
  temoignagesDescription?: string;
}

// Interface pour le contenu de la page Contact
export interface ContactPageContent {
  title: string;
  heroMainTitle: string;
  heroDescription?: string;
  contactInfoTitle?: string;
  contactInfoData?: ContactInfo[];
  contactFormTitle?: string;
  contactFormDescription?: string;
  contactFormFields?: ContactFormFields;
  mapTitle?: string;
  mapDescription?: string;
  mapData?: MapData;
}

// Interface pour les informations de contact
export interface ContactInfo {
  icon: string;
  title: string;
  content: string;
  link?: string;
  additionalInfo?: string;
}

// Interface pour les champs du formulaire
export interface ContactFormFields {
  nameLabel: string;
  emailLabel: string;
  phoneLabel: string;
  subjectLabel: string;
  messageLabel: string;
  submitButton: string;
}

// Interface pour les données de la carte
export interface MapData {
  address: string;
  mapImage: string;
  mapAlt: string;
  transportInfo: string;
}

// Interface pour le contenu de la page Blog
export interface BlogPageContent {
  title: string;
  heroMainTitle: string;
  heroDescription?: string;
}

// --- Fonctions pour le blog (utilisant Supabase) ---

// Import Supabase client
import { supabase } from '../lib/supabase';

// Fonction pour convertir le contenu markdown en format rich text simple
const convertMarkdownToSimpleRichText = (markdown: string): string => {
  return markdown;
};

// Récupérer tous les articles de blog depuis Supabase
export const getAllBlogPosts = async (): Promise<BlogPost[]> => {
  try {
    const { data: posts, error } = await supabase
      .from('blog_posts')
      .select(`
        *,
        author:authors(name, bio, image_url)
      `)
      .eq('active', true)
      .order('published_date', { ascending: false });

    if (error) {
      console.error('Erreur Supabase lors de la récupération des articles:', error);
      return [];
    }

    if (!posts || posts.length === 0) {
      console.log('Aucun article trouvé dans Supabase');
      return [];
    }

    return posts.map((post: any) => ({
      titre: post.title,
      slug: post.slug,
      dateDePublication: post.published_date,
      auteur: post.author ? {
        nom: post.author.name || 'Auteur inconnu',
        bio: post.author.bio || '',
        photo: post.author.image_url ? {
          fields: {
            file: {
              url: post.author.image_url.startsWith('http') ? post.author.image_url.replace('https:', '') : post.author.image_url
            }
          }
        } : undefined,
      } : {
        nom: 'Auteur inconnu',
        bio: '',
        photo: undefined
      },
      imagePrincipale: post.image_url ? {
        fields: {
          file: {
            url: post.image_url.startsWith('http') ? post.image_url.replace('https:', '') : post.image_url
          }
        }
      } : undefined,
      extrait: post.excerpt || '',
      contenu: post.content || '',
      titreSeo: post.title,
      descriptionSeo: post.excerpt,
    }));
  } catch (error) {
    console.error('Erreur lors de la récupération des articles depuis Supabase:', error);
    return [];
  }
};

// Récupérer un article de blog par son slug depuis Supabase
export const getBlogPostBySlug = async (slug: string): Promise<BlogPost | null> => {
  try {
    console.log('Recherche de l\'article avec le slug depuis Supabase:', slug);

    const { data: post, error } = await supabase
      .from('blog_posts')
      .select(`
        *,
        author:authors(name, bio, image_url)
      `)
      .eq('slug', slug)
      .eq('active', true)
      .maybeSingle();

    if (error) {
      console.error('Erreur Supabase lors de la récupération de l\'article:', error);
      return null;
    }

    if (!post) {
      console.log('Aucun article trouvé avec le slug:', slug);
      return null;
    }

    console.log('Article trouvé depuis Supabase:', post.title);
    return {
      titre: post.title,
      slug: post.slug,
      dateDePublication: post.published_date,
      auteur: post.author ? {
        nom: post.author.name || 'Auteur inconnu',
        bio: post.author.bio || '',
        photo: post.author.image_url ? {
          fields: {
            file: {
              url: post.author.image_url.startsWith('http') ? post.author.image_url.replace('https:', '') : post.author.image_url
            }
          }
        } : undefined,
      } : {
        nom: 'Auteur inconnu',
        bio: '',
        photo: undefined
      },
      imagePrincipale: post.image_url ? {
        fields: {
          file: {
            url: post.image_url.startsWith('http') ? post.image_url.replace('https:', '') : post.image_url
          }
        }
      } : undefined,
      extrait: post.excerpt || '',
      contenu: post.content || '',
      titreSeo: post.title,
      descriptionSeo: post.excerpt,
    };
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'article par slug depuis Supabase:', slug, error);
    return null;
  }
};

// --- Helpers pour contenu par défaut ---

const getDefaultHomePageContent = (): HomePageContent => ({
  title: 'Home Page',
  heroMainTitle: 'Atelier de céramique',
  heroSubTitle: '& Centre de formation',
  heroDescription: 'Un espace de création dédié à la pratique de la céramique à Paris',
  heroCta1Text: 'Découvrir nos cours & stages',
  heroCta1Link: '#',
  heroCta2Text: 'Formation professionnelle',
  heroCta2Link: '/formation-pro',
  featuresTitle: 'Nos services',
  featuresDescription: 'Découvrez notre gamme complète de services',
  aboutTitle: 'À propos',
  aboutDescription: 'Notre histoire et notre passion',
  galleryTitle: 'Galerie',
  galleryDescription: 'Découvrez nos créations',
  blogTitle: 'Blog',
  blogDescription: 'Actualités et conseils',
  aboutMainContent: {
    nodeType: BLOCKS.DOCUMENT,
    data: {},
    content: [
      {
        nodeType: BLOCKS.PARAGRAPH,
        data: {},
        content: [
          {
            nodeType: 'text',
            value: 'Vents & Courbes est un espace de création dédié à la pratique de la céramique, situé au cœur de Paris.',
            marks: [],
            data: {}
          }
        ]
      }
    ]
  } as Document,
  aboutProfessionalFeatures: [
    { icon: "Award", title: "Équipe expérimentée", description: "Des artisans passionnés avec plus de 15 ans d'expérience" },
    { icon: "BookOpen", title: "Programmes adaptés", description: "Des formations sur mesure pour tous les niveaux" },
    { icon: "Users", title: "Communauté créative", description: "Un espace de partage et d'échange entre passionnés" },
    { icon: "Heart", title: "Passion artisanale", description: "L'amour du travail de la terre au cœur de notre démarche" }
  ],
  featuresList: [
    { icon: "GraduationCap", title: "Formation", description: "Cours adaptés à tous niveaux" },
    { icon: "CheckCircle", title: "Qualiopi", description: "Certification qualité" },
    { icon: "Palette", title: "Artisanat", description: "Savoir-faire traditionnel" },
    { icon: "MapPin", title: "Paris 11ème", description: "Atelier aux portes de Paris" },
    { icon: "Gift", title: "Carte cadeau", description: "Offrez la créativité" },
    { icon: "CreditCard", title: "Paiement", description: "Facilités de paiement" }
  ]
});

// --- Nouvelle fonction pour le contenu de la page d'accueil ---

export const getHomePageContent = async (): Promise<HomePageContent | null> => {
  if (!client) {
    console.warn('⚠️ Client Contentful non disponible - Contenu par défaut utilisé');
    return getDefaultHomePageContent();
  }

  try {
    const response = await client.getEntries({
      content_type: 'homePageContent',
      'fields.title': 'Home Page', // Nous allons créer une entry avec ce titre
      limit: 1,
    });

    if (response.items.length === 0) {
      console.warn('Aucune entrée trouvée pour la page d\'accueil. Utilisation du contenu par défaut.');
      return getDefaultHomePageContent();
    }

    const item = response.items[0] as any;
    return {
      title: item.fields.title,
      heroMainTitle: item.fields.heroMainTitle,
      heroSubTitle: item.fields.heroSubTitle,
      heroDescription: item.fields.heroDescription,
      heroCta1Text: item.fields.heroCta1Text,
      heroCta1Link: item.fields.heroCta1Link,
      heroCta2Text: item.fields.heroCta2Text,
      heroCta2Link: item.fields.heroCta2Link,
      featuresTitle: item.fields.featuresTitle,
      featuresDescription: item.fields.featuresDescription,
      aboutTitle: item.fields.aboutTitle,
      aboutDescription: item.fields.aboutDescription,
      galleryTitle: item.fields.galleryTitle,
      galleryDescription: item.fields.galleryDescription,
      blogTitle: item.fields.blogTitle,
      blogDescription: item.fields.blogDescription,
      aboutMainContent: item.fields.aboutMainContent,
      aboutProfessionalFeatures: item.fields.aboutProfessionalFeatures,
      featuresList: item.fields.featuresList,
    };
  } catch (error) {
    console.error('Erreur lors de la récupération du contenu de la page d\'accueil:', error);
    console.warn('Erreur de connexion à Contentful. Utilisation du contenu par défaut.');
    return getDefaultHomePageContent();
  }
};

// --- Nouvelles fonctions pour toutes les autres pages ---

export const getCoursPageContent = async (): Promise<CoursPageContent | null> => {
  if (!client) {
    console.warn('⚠️ Client Contentful non disponible - Contenu par défaut Cours');
    return null;
  }

  try {
    const response = await client.getEntries({
      content_type: 'coursPageContent',
      'fields.title': 'Cours Page',
      limit: 1,
    });

    if (response.items.length === 0) {
      // Retourner du contenu par défaut si aucune entrée n'est trouvée
      return {
        title: 'Cours Page',
        heroMainTitle: 'Nos cours à la carte',
        heroSubTitle: 'Formation céramique',
        heroDescription: 'Découvrez nos formations en tournage et modelage',
        introParagraph: {
          nodeType: BLOCKS.DOCUMENT,
          data: {},
          content: [
            {
              nodeType: BLOCKS.PARAGRAPH,
              data: {},
              content: [
                {
                  nodeType: 'text',
                  value: 'Vents & Courbes vous propose plusieurs modules de cours en tournage, modelage :',
                  marks: [],
                  data: {}
                }
              ]
            }
          ]
        } as Document,
        formulasSectionTitle: 'Formules Trimestrielles et Annuelles',
        formulasSectionDescription: {
          nodeType: BLOCKS.DOCUMENT,
          data: {},
          content: [
            {
              nodeType: BLOCKS.PARAGRAPH,
              data: {},
              content: [
                {
                  nodeType: 'text',
                  value: 'Nos formules trimestrielles et annuelles vous permettront d\'acquérir des techniques de modelage et tournage de manière plus approfondie. La régularité de la pratique vous permettra d\'évoluer efficacement dans toutes les nouvelles techniques appréhendées.',
                  marks: [],
                  data: {}
                }
              ]
            }
          ]
        } as Document,
        featuresTitle: 'Nos formations',
        featuresDescription: 'Des cours adaptés à tous les niveaux',
        financementDescription: 'Formations éligibles à différents financements',
        financingLinkText: 'On fait le point avec vous >',
        qualiopiDescription: 'Centre de formation certifié Qualiopi',
        qualiopiLinkText: 'En apprendre plus sur notre certification Qualiopi',
        coursesList: [
          {
            title: "32 cours de tournage",
            duration: "Annuel",
            level: "Tous niveaux",
            image: "https://i.ibb.co/0j4PDXMv/32-cours-de-tournage.jpg",
            description: "Tout au long de l'année, perfectionnez vos gestes et vos postures en explorant les formes emblématiques du tournage : bols, cylindres, bouteilles, boîtes, boules…",
            includes: "Séance de décors et cuissons comprises chaque trimestre",
            price: "1600€",
            additional: "+20€",
            additionalText: "Prix Net de TVA\nAdhésion annuelle",
            opco: "Possibilité de prise en charge par un organisme OPCO",
            reservationSlug: "tournage-annuel",
            widgetId: "d460bea4-176a-41a4-821b-7aa85a887209"
          },
          {
            title: "12 cours de tournage",
            duration: "Trimestriel",
            level: "Tous niveaux",
            image: "https://i.ibb.co/fzj2M41N/12-cours-de-tournage.jpg",
            description: "Pendant un trimestre, initiez-vous aux bons gestes et aux bonnes postures pour aborder le tournage et le tournassage de formes variées : cylindres, bols, boîtes…",
            includes: "Séance de décors et cuissons comprises chaque trimestre.",
            price: "620€",
            additional: "+20€",
            additionalText: "Prix Net de TVA\nAdhésion annuelle",
            opco: "Possibilité de prise en charge par un organisme OPCO",
            reservationSlug: "tournage-trimestriel",
            widgetId: "1999d262-007b-414c-b3a6-524c896de0fe"
          },
          {
            title: "32 cours de modelage",
            duration: "Annuel",
            level: "Tous niveaux",
            image: "https://i.ibb.co/93pSdphm/32-cours-de-modelage.jpg",
            description: "Le temps d'un cours, découvrez les gestes de base du modelage : pincé, plaque, colombins… et initiez-vous au travail de la terre en façonnant vos premières formes.",
            includes: "Séance de décors et cuissons comprises chaque trimestre",
            price: "1440€",
            additional: "+20€",
            additionalText: "Prix Net de TVA\nAdhésion annuelle",
            opco: "Possibilité de prise en charge par un organisme OPCO",
            reservationSlug: "modelage-annuel",
            widgetId: "605d2317-4d0a-47b2-a9e6-b038397729b8"
          },
          {
            title: "12 cours de modelage",
            duration: "Trimestriel",
            level: "Tous niveaux",
            image: "https://i.ibb.co/99h8cqM3/12-cours-de-modelage.jpg",
            description: "Le temps d'un trimestre, explorez les techniques de modelage : pincé, plaque, colombins… et façonnez vos propres pièces, que vous émaillerez en fin de session.",
            includes: "Séance de décors et cuissons comprises chaque trimestre.",
            price: "580€",
            additional: "+20€",
            additionalText: "Prix Net de TVA\nAdhésion annuelle",
            opco: "Possibilité de prise en charge par un organisme OPCO",
            reservationSlug: "modelage-trimestriel",
            widgetId: "4c4af054-0682-4ce9-a16b-3efd8e09e076"
          },
          {
            title: "1 cours de modelage",
            duration: "1 séance 3h",
            level: "Débutant",
            image: "https://i.ibb.co/3mqv0rNZ/1-cours-de-modelage.jpg",
            description: "À travers ce cours d'initiation, familiarisez-vous avec la terre et découvrez les bases du modelage, une technique de façonnage à la main.",
            includes: "Vous expérimenterez notamment le pot pincé : une boule de terre creusée au pouce, puis élargie petit à petit pour former une première pièce.",
            price: "50€",
            additionalText: "Prix Net de TVA",
            opco: "Possibilité de prise en charge par un organisme OPCO",
            reservationSlug: "modelage-single",
            widgetId: "3237935e-8e14-4f24-a262-52822b97d9c9"
          },
        ]
      };
    }

    const item = response.items[0] as any;
    return {
      title: item.fields.title,
      heroMainTitle: item.fields.heroMainTitle,
      heroSubTitle: item.fields.heroSubTitle,
      heroDescription: item.fields.heroDescription,
      introParagraph: item.fields.introParagraph,
      formulasSectionTitle: item.fields.formulasSectionTitle,
      formulasSectionDescription: item.fields.formulasSectionDescription,
      featuresTitle: item.fields.featuresTitle,
      featuresDescription: item.fields.featuresDescription,
      financementDescription: item.fields.financementDescription,
      financingLinkText: item.fields.financingLinkText,
      qualiopiDescription: item.fields.qualiopiDescription,
      qualiopiLinkText: item.fields.qualiopiLinkText,
      coursesList: item.fields.coursesList,
    };
  } catch (error) {
    console.error('Erreur lors de la récupération du contenu de la page Cours:', error);
    return {
      title: 'Cours Page',
      heroMainTitle: 'Nos cours à la carte',
      heroSubTitle: 'Formation céramique',
      heroDescription: 'Découvrez nos formations en tournage et modelage',
      introParagraph: {
        nodeType: BLOCKS.DOCUMENT,
        data: {},
        content: [
          {
            nodeType: BLOCKS.PARAGRAPH,
            data: {},
            content: [
              {
                nodeType: 'text',
                value: 'Vents & Courbes vous propose plusieurs modules de cours en tournage, modelage :',
                marks: [],
                data: {}
              }
            ]
          }
        ]
      } as Document,
      formulasSectionTitle: 'Formules Trimestrielles et Annuelles',
      formulasSectionDescription: {
        nodeType: BLOCKS.DOCUMENT,
        data: {},
        content: [
          {
            nodeType: BLOCKS.PARAGRAPH,
            data: {},
            content: [
              {
                nodeType: 'text',
                value: 'Nos formules trimestrielles et annuelles vous permettront d\'acquérir des techniques de modelage et tournage de manière plus approfondie. La régularité de la pratique vous permettra d\'évoluer efficacement dans toutes les nouvelles techniques appréhendées.',
                marks: [],
                data: {}
              }
            ]
          }
        ]
      } as Document,
      featuresTitle: 'Nos formations',
      featuresDescription: 'Des cours adaptés à tous les niveaux',
      financementDescription: 'Formations éligibles à différents financements',
      financingLinkText: 'On fait le point avec vous >',
      qualiopiDescription: 'Centre de formation certifié Qualiopi',
      qualiopiLinkText: 'En apprendre plus sur notre certification Qualiopi',
      coursesList: []
    };
  }
};

export const getStagesPageContent = async (): Promise<StagesPageContent | null> => {
  if (!client) {
    console.warn('⚠️ Client Contentful non disponible - Contenu par défaut Stages');
    return null;
  }

  try {
    const response = await client.getEntries({
      content_type: 'stagesPageContent',
      'fields.title': 'Stages Page',
      limit: 1,
    });

    if (response.items.length === 0) {
      return {
        title: 'Stages Page',
        heroMainTitle: 'Nos stages à la carte',
        heroSubTitle: 'Stages intensifs',
        carteCadeauTitle: 'Carte cadeau',
        carteCadeauDescription: 'Offrez la créativité',
        decouvrirTitle: 'Découvrir',
        decouvrirDescription: 'Stages pour tous niveaux',
        financementTitle: 'Financement',
        financementDescription: 'Prise en charge possible'
      };
    }

    const item = response.items[0] as any;
    return {
      title: item.fields.title,
      heroMainTitle: item.fields.heroMainTitle,
      heroSubTitle: item.fields.heroSubTitle,
      carteCadeauTitle: item.fields.carteCadeauTitle,
      carteCadeauDescription: item.fields.carteCadeauDescription,
      decouvrirTitle: item.fields.decouvrirTitle,
      decouvrirDescription: item.fields.decouvrirDescription,
      financementTitle: item.fields.financementTitle,
      financementDescription: item.fields.financementDescription,
    };
  } catch (error) {
    console.error('Erreur lors de la récupération du contenu de la page Stages:', error);
    return {
      title: 'Stages Page',
      heroMainTitle: 'Nos stages à la carte',
      heroSubTitle: 'Stages intensifs',
      carteCadeauTitle: 'Carte cadeau',
      carteCadeauDescription: 'Offrez la créativité',
      decouvrirTitle: 'Découvrir',
      decouvrirDescription: 'Stages pour tous niveaux',
      debutantsTitle: 'Débutants',
      debutantsDescription: 'Stages adaptés aux débutants',
      financementTitle: 'Financement',
      financementDescription: 'Prise en charge possible'
    };
  }
};

export const getFormationProPageContent = async (): Promise<FormationProPageContent | null> => {
  if (!client) {
    console.warn('⚠️ Client Contentful non disponible - Contenu par défaut Formation Pro');
    return null;
  }

  try {
    const response = await client.getEntries({
      content_type: 'formationProPageContent',
      'fields.title': 'Formation Pro Page',
      limit: 1,
    });

    if (response.items.length === 0) {
      return {
        title: 'Formation Pro Page',
        heroMainTitle: 'Formations professionnelles',
        heroSubTitle: 'Formations professionnelles',
        formationsProDescription: {
          nodeType: BLOCKS.DOCUMENT,
          data: {},
          content: [
            {
              nodeType: BLOCKS.PARAGRAPH,
              data: {},
              content: [
                {
                  nodeType: 'text',
                  value: 'Vents & Courbes est un organisme de formation certifié avec le label qualité ',
                  marks: [],
                  data: {}
                }
              ]
            }
          ]
        } as Document,
        capFormationTitle: 'CAP Formation',
        capFormationDescription: {
          nodeType: BLOCKS.DOCUMENT,
          data: {},
          content: [
            {
              nodeType: BLOCKS.PARAGRAPH,
              data: {},
              content: [
                {
                  nodeType: 'text',
                  value: 'La formation CAP Tournage en Céramique et la formation CAP Tournage en Céramique OPTION Créateur sont dispensées à partir d\'un socle pédagogique commun, avec une adaptation aux particularités, objectifs et envies de chacun.',
                  marks: [],
                  data: {}
                }
              ]
            }
          ]
        } as Document,
        financementsTitle: 'Financements',
        financementsDescription: {
          nodeType: BLOCKS.DOCUMENT,
          data: {},
          content: [
            {
              nodeType: BLOCKS.PARAGRAPH,
              data: {},
              content: [
                {
                  nodeType: 'text',
                  value: 'Ces formations sont éligibles à des financements tels que les Opco (ex: AFDAS), la région (ex: Aire2), Transition Pro, etc.',
                  marks: [],
                  data: {}
                }
              ]
            }
          ]
        } as Document,
        financementsDetails: {
          nodeType: BLOCKS.DOCUMENT,
          data: {},
          content: [
            {
              nodeType: BLOCKS.PARAGRAPH,
              data: {},
              content: [
                {
                  nodeType: 'text',
                  value: 'Contactez-nous pour obtenir plus d\'informations sur les possibilités de financement !',
                  marks: [],
                  data: {}
                }
              ]
            }
          ]
        } as Document,
        qualiopiLinkText: 'Qualiopi ↘',
        financingLinkText: 'On fait le point ↘',
        ctaSections: [
          {
            title: 'Une possibilité de financement ?',
            linkText: 'On fait le point ↘',
            linkAction: 'openFinancementModal'
          },
          {
            title: 'Formation CAP tournage en céramique',
            description: 'Vous voulez vous\nprofessionnaliser ?',
            linkText: 'On vous écoute ↘',
            linkAction: 'contact'
          }
        ],
        formationsList: []
      };
    }

    const item = response.items[0] as any;
    return {
      title: item.fields.title,
      heroMainTitle: item.fields.heroMainTitle,
      heroSubTitle: item.fields.heroSubTitle,
      heroThirdTitle: item.fields.heroThirdTitle,
      formationsProDescription: item.fields.formationsProDescription,
      capFormationTitle: item.fields.capFormationTitle,
      capFormationDescription: item.fields.capFormationDescription,
      financementsTitle: item.fields.financementsTitle,
      financementsDescription: item.fields.financementsDescription,
      financementsDetails: item.fields.financementsDetails,
      qualiopiLinkText: item.fields.qualiopiLinkText,
      financingLinkText: item.fields.financingLinkText,
      ctaSections: item.fields.ctaSections,
      formationsList: item.fields.formationsList,
    };
  } catch (error) {
    console.error('Erreur lors de la récupération du contenu de la page Formation Pro:', error);
    return {
      title: 'Formation Pro Page',
      heroMainTitle: 'Formations professionnelles',
      heroSubTitle: 'Formations professionnelles',
      formationsProDescription: {
        nodeType: BLOCKS.DOCUMENT,
        data: {},
        content: []
      } as Document,
      capFormationTitle: 'CAP Formation',
      capFormationDescription: {
        nodeType: BLOCKS.DOCUMENT,
        data: {},
        content: []
      } as Document,
      financementsTitle: 'Financements',
      financementsDescription: {
        nodeType: BLOCKS.DOCUMENT,
        data: {},
        content: []
      } as Document,
      qualiopiLinkText: 'Qualiopi ↘',
      financingLinkText: 'On fait le point ↘',
      ctaSections: [],
      formationsList: []
    };
  }
};

export const getAboutPageContent = async (): Promise<AboutPageContent | null> => {
  if (!client) {
    console.warn('⚠️ Client Contentful non disponible - Contenu par défaut About');
    return null;
  }

  try {
    const response = await client.getEntries({
      content_type: 'aboutPageContent',
      'fields.title': 'About Page',
      limit: 1,
    });

    if (response.items.length === 0) {
      return {
        title: 'About Page',
        heroMainTitle: 'L\'histoire de Vents & Courbes',
        heroSubTitle: 'Notre passion',
        heroDescription: 'Une équipe dédiée à la céramique',
        heroCtaButtons: [
          { text: 'Découvrir l\'équipe', action: 'scrollToTeam' },
          { text: 'Nos formations', action: 'goToFormations' }
        ],
        presentationTitle: 'Présentation',
        presentationIntro: {
          nodeType: BLOCKS.DOCUMENT,
          data: {},
          content: [
            {
              nodeType: BLOCKS.PARAGRAPH,
              data: {},
              content: [
                {
                  nodeType: 'text',
                  value: 'Vents & Courbes a été fondé en 2015 par Philippe Paumier, artiste céramiste ayant plus de 20 ans d\'expérience et désireux de créer un lieu d\'échange et d\'apprentissage autour de la pratique de la céramique.',
                  marks: [{ type: MARKS.BOLD }],
                  data: {}
                }
              ]
            }
          ]
        } as Document,
        presentationStory: [
          {
            title: 'Une approche personnalisée de la céramique',
            content: 'Dans un souci de transmission du savoir-faire, d\'une passion, Philippe Paumier propose une approche très personnelle de l\'apprentissage de la céramique se reposant sur la répétition des gestes appris, de l\'accord du geste et du corps sur la terre.',
            style: 'primary-bg'
          },
          {
            title: 'Un centre de formation certifié',
            content: 'Aujourd\'hui, Vents & Courbes est aussi un centre de formation certifié vous permettant de vous professionnaliser. Des formations professionnelles, cours et divers stages sont proposés pour tout public.',
            style: 'stone-bg'
          },
          {
            title: 'Un espace dédié à la création',
            content: 'L\'atelier offre un espace de 100 m² aux portes de Paris dédié à la création et à la recherche : une salle de tournage, une salle de modelage et de décoration sur céramique, et enfin un espace de stockage et de cuisson des pièces. Une bibliothèque est également à la disposition des élèves.',
            style: 'primary-bg'
          }
        ],
        presentationFeatures: [
          { icon: 'Award', title: 'Centre certifié', description: 'Formation professionnelle certifiée Qualiopi' },
          { icon: 'Users', title: 'Approche personnalisée', description: 'Accompagnement adapté à chaque élève' },
          { icon: 'BookOpen', title: '+20 ans d\'expérience', description: 'Expertise et savoir-faire reconnus' },
          { icon: 'MapPin', title: '100m² dédiés', description: 'Espace complet aux portes de Paris' }
        ],
        presentationCta: {
          title: 'Vous êtes artisan·e, artiste, designer, ou même amateur et aimez l\'esprit de l\'atelier mais vous voulez en savoir plus ?',
          description: 'Nous sommes là pour échanger',
          buttonText: 'Échanger avec nous ↘',
          buttonLink: '/contact'
        },
        equipeTitle: 'Notre équipe',
        equipeDescription: 'Des artistes passionnés et expérimentés qui vous accompagnent dans votre découverte de la céramique',
        equipeMembers: [],
        temoignagesTitle: 'Témoignages',
        temoignagesDescription: 'Ce que disent nos élèves',
        temoignagesData: {
          rating: 4.9,
          totalReviews: 7,
          testimonials: []
        }
      };
    }

    const item = response.items[0] as any;
    return {
      title: item.fields.title,
      heroMainTitle: item.fields.heroMainTitle,
      heroSubTitle: item.fields.heroSubTitle,
      heroDescription: item.fields.heroDescription,
      heroCtaButtons: item.fields.heroCtaButtons,
      presentationTitle: item.fields.presentationTitle,
      presentationIntro: item.fields.presentationIntro,
      presentationStory: item.fields.presentationStory,
      presentationFeatures: item.fields.presentationFeatures,
      presentationCta: item.fields.presentationCta,
      equipeTitle: item.fields.equipeTitle,
      equipeDescription: item.fields.equipeDescription,
      equipeMembers: item.fields.equipeMembers,
      temoignagesTitle: item.fields.temoignagesTitle,
      temoignagesDescription: item.fields.temoignagesDescription,
      temoignagesData: item.fields.temoignagesData,
    };
  } catch (error) {
    console.error('Erreur lors de la récupération du contenu de la page À propos:', error);
    return {
      title: 'About Page',
      heroMainTitle: 'L\'histoire de Vents & Courbes',
      heroSubTitle: 'Notre passion',
      heroDescription: 'Une équipe dédiée à la céramique',
      heroCtaButtons: [],
      presentationTitle: 'Présentation',
      presentationIntro: {
        nodeType: BLOCKS.DOCUMENT,
        data: {},
        content: []
      } as Document,
      presentationStory: [],
      presentationFeatures: [],
      equipeTitle: 'Notre équipe',
      equipeDescription: 'Des experts passionnés',
      equipeMembers: [],
      temoignagesTitle: 'Témoignages',
      temoignagesDescription: 'Ce que disent nos élèves',
      temoignagesData: { rating: 4.9, totalReviews: 0, testimonials: [] }
    };
  }
};

export const getContactPageContent = async (): Promise<ContactPageContent | null> => {
  if (!client) {
    console.warn('⚠️ Client Contentful non disponible - Contenu par défaut Contact');
    return null;
  }

  try {
    const response = await client.getEntries({
      content_type: 'contactPageContent',
      'fields.title': 'Contact Page',
      limit: 1,
    });

    if (response.items.length === 0) {
      return {
        title: 'Contact Page',
        heroMainTitle: 'Contactez-nous',
        heroDescription: 'Nous sommes là pour vous accompagner',
        contactInfoTitle: 'Nos informations de contact',
        contactInfoData: [
          {
            icon: 'Mail',
            title: 'Email',
            content: 'contact@ventsetcourbes.org',
            link: 'mailto:contact@ventsetcourbes.org'
          },
          {
            icon: 'Phone',
            title: 'Téléphone',
            content: '06 80 89 39 27',
            link: 'tel:+33680893927',
            additionalInfo: 'Lun-Sam 9h-19h'
          },
          {
            icon: 'MapPin',
            title: 'Adresse',
            content: '33 rue Danton\n93310 Le Pré-Saint-Gervais'
          }
        ],
        contactFormTitle: 'Envoyez-nous un message',
        contactFormDescription: 'Une question, un projet ? Contactez-nous !',
        contactFormFields: {
          nameLabel: 'Nom *',
          emailLabel: 'Email *',
          phoneLabel: 'Téléphone',
          subjectLabel: 'Sujet',
          messageLabel: 'Message',
          submitButton: 'Envoyer'
        },
        mapTitle: 'Nous trouver',
        mapDescription: '33 rue Danton — 93310 Le Pré-Saint-Gervais',
        mapData: {
          address: '33 rue Danton — 93310 Le Pré-Saint-Gervais',
          mapImage: 'https://i.ibb.co/TDVGN5c7/MAP-VC.png',
          mapAlt: 'Plan d\'accès à l\'atelier Vents et Courbes',
          transportInfo: 'Métro 11 & 5, Tram T3, Bus 48/61/170'
        }
      };
    }

    const item = response.items[0] as any;
    return {
      title: item.fields.title,
      heroMainTitle: item.fields.heroMainTitle,
      heroDescription: item.fields.heroDescription,
      contactInfoTitle: item.fields.contactInfoTitle,
      contactInfoData: item.fields.contactInfoData,
      contactFormTitle: item.fields.contactFormTitle,
      contactFormDescription: item.fields.contactFormDescription,
      contactFormFields: item.fields.contactFormFields,
      mapTitle: item.fields.mapTitle,
      mapDescription: item.fields.mapDescription,
      mapData: item.fields.mapData,
    };
  } catch (error) {
    console.error('Erreur lors de la récupération du contenu de la page Contact:', error);
    return {
      title: 'Contact Page',
      heroMainTitle: 'Contactez-nous',
      heroDescription: 'Nous sommes là pour vous accompagner',
      contactInfoTitle: 'Nos informations de contact',
      contactInfoData: [],
      contactFormTitle: 'Envoyez-nous un message',
      contactFormDescription: 'Nous vous répondons rapidement',
      contactFormFields: {
        nameLabel: 'Nom *',
        emailLabel: 'Email *',
        phoneLabel: 'Téléphone',
        subjectLabel: 'Sujet',
        messageLabel: 'Message',
        submitButton: 'Envoyer'
      },
      mapTitle: 'Nous trouver',
      mapDescription: 'Notre atelier à Paris',
      mapData: {
        address: '',
        mapImage: '',
        mapAlt: '',
        transportInfo: ''
      }
    };
  }
};

export const getBlogPageContent = async (): Promise<BlogPageContent | null> => {
  if (!client) {
    console.warn('⚠️ Client Contentful non disponible - Contenu par défaut Blog');
    return null;
  }

  try {
    const response = await client.getEntries({
      content_type: 'blogPageContent',
      'fields.title': 'Blog Page',
      limit: 1,
    });

    if (response.items.length === 0) {
      return {
        title: 'Blog Page',
        heroMainTitle: 'Nos actualités',
        heroDescription: 'Découvrez nos derniers articles et actualités'
      };
    }

    const item = response.items[0] as any;
    return {
      title: item.fields.title,
      heroMainTitle: item.fields.heroMainTitle,
      heroDescription: item.fields.heroDescription,
    };
  } catch (error) {
    console.error('Erreur lors de la récupération du contenu de la page Blog:', error);
    return {
      title: 'Blog Page',
      heroMainTitle: 'Nos actualités',
      heroDescription: 'Découvrez nos derniers articles et actualités'
    };
  }
};