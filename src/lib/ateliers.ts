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
    name: 'Tout Illimite',
    title: 'Residence Illimitee',
    subtitle: 'Acces sans limite d\'heures',
    price: '300',
    engagementBonus: '1 stage de tournage de 18 heures offert',
    bonusValue: '340',
    widgetId: '7d93e262-68dc-47e3-828f-54980788fce8',
    description: "La formule Residence Illimitee vous donne un acces total a notre atelier partage de 100 m² au Pre-Saint-Gervais, 7 jours sur 7, sans limite d'heures. Ideal pour les ceramistes passionnes qui souhaitent travailler intensivement leur pratique, developper leur production ou preparer une exposition. Vous beneficiez de l'ensemble des equipements professionnels (8 tours, fours, cabines d'emaillage, espaces de sechage) et de l'accompagnement de nos formateurs experimentes.",
    includes: 'Acces 7j/7 sans limite, emaillage compris, 8 tours professionnels, fours a disposition, cabines d\'emaillage, espace de sechage.',
    seoTitle: 'Residence Illimitee Ceramique - Atelier Partage Paris | Vents et Courbes',
    seoDescription: 'Residence Illimitee : acces 7j/7 sans limite d\'heures a notre atelier partage ceramique au Pre-Saint-Gervais. 300 EUR/mois. 8 tours, fours, emaillage compris.',
    popular: true,
  },
  {
    slug: 'residence-32-heures',
    name: '32 Heures par mois',
    title: 'Residence 32 Heures',
    subtitle: '32h d\'acces mensuel',
    price: '200',
    engagementBonus: '4 cours de modelage ou de tournage offerts',
    bonusValue: '220',
    widgetId: '9eb717b3-f209-4e56-9f30-9565a29a1276',
    description: "La formule Residence 32 Heures vous offre 32 heures d'acces mensuel a notre atelier partage ceramique, parfaite pour une pratique reguliere et soutenue. Developpez votre technique, multipliez vos creations et beneficiez d'un cadre professionnel avec tous les equipements necessaires. Cette formule equilibre liberte creative et flexibilite pour les ceramistes qui souhaitent pratiquer plusieurs fois par semaine.",
    includes: '32 heures d\'acces mensuel, emaillage compris, 8 tours professionnels, fours a disposition, cabines d\'emaillage, espace de sechage.',
    seoTitle: 'Residence 32 Heures Ceramique - Atelier Partage Paris | Vents et Courbes',
    seoDescription: 'Residence 32 Heures : 32h d\'acces mensuel a notre atelier partage ceramique au Pre-Saint-Gervais. 200 EUR/mois. 8 tours, fours, emaillage compris.',
  },
  {
    slug: 'residence-16-heures',
    name: '16 Heures par mois',
    title: 'Residence 16 Heures',
    subtitle: '16h d\'acces mensuel',
    price: '100',
    engagementBonus: '1 stage de modelage ou 1 stage pose d\'email',
    bonusValue: '165',
    widgetId: 'bdb977d1-b0bc-45d0-b4cc-6b8b8caedb15',
    description: "La formule Residence 16 Heures vous offre 16 heures d'acces mensuel a notre atelier partage ceramique au Pre-Saint-Gervais. Cette formule accessible est ideale pour une pratique reguliere sans contrainte, permettant de progresser a son rythme dans un cadre professionnel. Vous beneficiez de tous les equipements (tours, fours, emaillage) et pouvez reserver vos creneaux selon vos disponibilites.",
    includes: '16 heures d\'acces mensuel, emaillage compris, 8 tours professionnels, fours a disposition, cabines d\'emaillage, espace de sechage.',
    seoTitle: 'Residence 16 Heures Ceramique - Atelier Partage Paris | Vents et Courbes',
    seoDescription: 'Residence 16 Heures : 16h d\'acces mensuel a notre atelier partage ceramique au Pre-Saint-Gervais. 100 EUR/mois. 8 tours, fours, emaillage compris.',
  },
];

export const getAtelierFormuleBySlug = (slug: string): AtelierFormule | undefined => {
  return ATELIER_FORMULES.find((f) => f.slug === slug);
};
