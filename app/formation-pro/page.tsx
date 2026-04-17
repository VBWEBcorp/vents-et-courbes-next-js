import type { Metadata } from 'next';
import FormationPro from '@/views/FormationPro';

export const metadata: Metadata = {
  title: 'Formation Professionnelle Céramique CAP - Centre Certifié Qualiopi Le Pré-Saint-Gervais',
  description: 'Formation professionnelle CAP céramique certifiée Qualiopi au Pré-Saint-Gervais. CAP Tournage, formation Créateur céramique. Financement CPF, OPCO. 571h de formation professionnalisante.',
  alternates: { canonical: 'https://ventsetcourbes.org/formation-pro' },
  openGraph: {
    title: 'Formation Professionnelle Céramique CAP - Centre Certifié Qualiopi',
    description: 'Formation professionnelle CAP céramique certifiée Qualiopi au Pré-Saint-Gervais. CAP Tournage, formation Créateur céramique.',
    url: 'https://ventsetcourbes.org/formation-pro',
  },
};

export default function FormationProPage() {
  return <FormationPro />;
}
