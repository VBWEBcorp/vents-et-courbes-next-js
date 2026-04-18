export interface AtelierFormule {
  slug: string;
  name: string;
  title: string;
  subtitle: string;
  price: string;
  engagementBonus: string;
  bonusValue: string;
  widgetId: string;
  description: string;
  includes: string;
  seoTitle: string;
  seoDescription: string;
  popular?: boolean;
}

export const ATELIER_FORMULES: AtelierFormule[] = [
  {
    slug: 'residence-illimitee',
    name: 'Tout Illimité',
    title: 'Résidence Illimitée',
    subtitle: 'Accès sans limite d\'heures',
    price: '300',
    engagementBonus: '1 stage de tournage de 18 heures offert',
    bonusValue: '340',
    widgetId: '7d93e262-68dc-47e3-828f-54980788fce8',
    description: "Accès total à notre atelier partagé de 100 m² au Pré-Saint-Gervais, 7j/7 sans limite d'heures. Idéal pour les céramistes qui souhaitent travailler intensivement leur pratique ou préparer une exposition.",
    includes: 'Accès 7j/7 sans limite, émaillage compris, 8 tours professionnels, fours, cabines d\'émaillage, espace de séchage.',
    seoTitle: 'Résidence Illimitée Céramique - Atelier Partagé Paris | Vents et Courbes',
    seoDescription: 'Résidence Illimitée : accès 7j/7 sans limite d\'heures à notre atelier partagé céramique au Pré-Saint-Gervais. 300 €/mois. 8 tours, fours, émaillage compris.',
    popular: true,
  },
  {
    slug: 'residence-32-heures',
    name: '32 Heures par mois',
    title: 'Résidence 32 Heures',
    subtitle: '32h d\'accès mensuel',
    price: '200',
    engagementBonus: '4 cours de modelage ou de tournage offerts',
    bonusValue: '220',
    widgetId: '9eb717b3-f209-4e56-9f30-9565a29a1276',
    description: "32 heures d'accès mensuel à notre atelier partagé céramique, parfait pour une pratique régulière et soutenue. Multipliez vos créations dans un cadre professionnel équipé.",
    includes: '32 heures mensuelles, émaillage compris, 8 tours professionnels, fours, cabines d\'émaillage, espace de séchage.',
    seoTitle: 'Résidence 32 Heures Céramique - Atelier Partagé Paris | Vents et Courbes',
    seoDescription: 'Résidence 32 Heures : 32h d\'accès mensuel à notre atelier partagé céramique au Pré-Saint-Gervais. 200 €/mois. 8 tours, fours, émaillage compris.',
  },
  {
    slug: 'residence-16-heures',
    name: '16 Heures par mois',
    title: 'Résidence 16 Heures',
    subtitle: '16h d\'accès mensuel',
    price: '100',
    engagementBonus: '1 stage de modelage ou 1 stage pose d\'émail',
    bonusValue: '165',
    widgetId: 'bdb977d1-b0bc-45d0-b4cc-6b8b8caedb15',
    description: "16 heures d'accès mensuel à notre atelier partagé céramique, formule accessible pour progresser à votre rythme dans un cadre professionnel équipé.",
    includes: '16 heures mensuelles, émaillage compris, 8 tours professionnels, fours, cabines d\'émaillage, espace de séchage.',
    seoTitle: 'Résidence 16 Heures Céramique - Atelier Partagé Paris | Vents et Courbes',
    seoDescription: 'Résidence 16 Heures : 16h d\'accès mensuel à notre atelier partagé céramique au Pré-Saint-Gervais. 100 €/mois. 8 tours, fours, émaillage compris.',
  },
];

export const getAtelierFormuleBySlug = (slug: string): AtelierFormule | undefined => {
  return ATELIER_FORMULES.find((f) => f.slug === slug);
};
