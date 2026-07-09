// Mapping des slugs de prestations vers les liens CPF
// Si un slug est dans ce mapping, une bannière "Éligible au CPF" s'affiche
export const CPF_LINKS: Record<string, string> = {
  // Stages de tournage (3 à 4 jours)
  'stage-tournage-ceramique': 'https://www.moncompteformation.gouv.fr/espace-prive/html/#/formation/recherche/80326607100023_PREPATOURBC02/80326607100023_PREPATOURBC02?contexteFormation=ACTIVITE_PROFESSIONNELLE',
  'stage-tournage-3-jours': 'https://www.moncompteformation.gouv.fr/espace-prive/html/#/formation/recherche/80326607100023_PREPATOURBC02/80326607100023_PREPATOURBC02?contexteFormation=ACTIVITE_PROFESSIONNELLE',

  // Stage impression d'images sur céramique
  'impressions-ceramique': 'https://www.moncompteformation.gouv.fr/espace-prive/html/#/formation/recherche/80326607100023_IMPRESSCERA16HEURES/80326607100023_IMPRESSCERAM16HEURES?contexteFormation=ACTIVITE_PROFESSIONNELLE',

  // Stage de recherche et compréhension d'émail
  'recherche-email': 'https://www.moncompteformation.gouv.fr/espace-prive/html/#/formation/recherche/80326607100023_EMAILSTAGE28/80326607100023_EMAILSTAGE28?contexteFormation=ACTIVITE_PROFESSIONNELLE',

  // Ateliers Maria Bosch (engobes vitrifiés)
  'volumes-engobes-maria-bosch': 'https://www.moncompteformation.gouv.fr/espace-prive/html/#/formation/recherche/80326607100023_EMAILSTAGE28/80326607100023_EMAILSTAGE28?contexteFormation=ACTIVITE_PROFESSIONNELLE',
  'engobes-vitrifie-maria-bosch': 'https://www.moncompteformation.gouv.fr/espace-prive/html/#/formation/recherche/80326607100023_EMAILSTAGE28/80326607100023_EMAILSTAGE28?contexteFormation=ACTIVITE_PROFESSIONNELLE',

  // Cours de tournage (12 à 32 séances)
  'tournage-annuel': 'https://www.moncompteformation.gouv.fr/espace-prive/html/#/formation/recherche/80326607100023_36HEURESTOUR/80326607100023_36HEURESTOUR?contexteFormation=ACTIVITE_PROFESSIONNELLE',
  'tournage-trimestriel': 'https://www.moncompteformation.gouv.fr/espace-prive/html/#/formation/recherche/80326607100023_36HEURESTOUR/80326607100023_36HEURESTOUR?contexteFormation=ACTIVITE_PROFESSIONNELLE',

  // Cours de modelage (12 à 32 séances)
  'modelage-annuel': 'https://www.moncompteformation.gouv.fr/espace-prive/html/#/formation/recherche/80326607100023_36HEURESMODELAGE/80326607100023_36HEURESMODELAGE?contexteFormation=ACTIVITE_PROFESSIONNELLE',
  'modelage-trimestriel': 'https://www.moncompteformation.gouv.fr/espace-prive/html/#/formation/recherche/80326607100023_36HEURESMODELAGE/80326607100023_36HEURESMODELAGE?contexteFormation=ACTIVITE_PROFESSIONNELLE',
};

// Lien CPF pour les formations professionnelles (CAP Tournage et Créateur)
export const CPF_LINK_FORMATION_PRO = 'https://www.moncompteformation.gouv.fr/espace-prive/html/#/formation/recherche/80326607100023_PREPABC01BC02/80326607100023_PREPABC01BC02?contexteFormation=ACTIVITE_PROFESSIONNELLE';

export const isEligibleCPF = (slug: string): boolean => slug in CPF_LINKS;

export const getCPFLink = (slug: string): string | undefined => CPF_LINKS[slug];

// ------------------------------------------------------------------
// Version « par enregistrement » : le lien CPF est désormais éditable
// directement sur chaque stage/cours (champ `cpf_link` dans l'admin).
// On retombe sur l'ancienne map codée en dur si le champ est vide, pour
// rester compatible avec les enregistrements pas encore renseignés.
// ------------------------------------------------------------------
interface CpfItem {
  cpf_link?: string;
  reservation_slug?: string;
}

export const getCpfLinkFor = (item: CpfItem): string | undefined => {
  const link = item.cpf_link?.trim();
  if (link) return link;
  if (item.reservation_slug) return CPF_LINKS[item.reservation_slug];
  return undefined;
};

export const isEligibleCPFItem = (item: CpfItem): boolean =>
  Boolean(getCpfLinkFor(item));
