import type { Metadata } from 'next';
import Cours from '@/views/Cours';

export const metadata: Metadata = {
  title: 'Loisirs Céramique Paris - Tournage Modelage Le Pré-Saint-Gervais | Atelier Vents et Courbes',
  description: 'Loisirs céramique au Pré-Saint-Gervais : tournage, modelage pour tous niveaux. Formation trimestrielle, annuelle, cours d\'essai. Centre certifié Qualiopi. Réservation en ligne disponible.',
  alternates: { canonical: 'https://ventsetcourbes.org/cours' },
  openGraph: {
    title: 'Loisirs Céramique Paris - Tournage Modelage Le Pré-Saint-Gervais',
    description: 'Loisirs céramique au Pré-Saint-Gervais : tournage, modelage pour tous niveaux. Formation trimestrielle, annuelle, cours d\'essai.',
    url: 'https://ventsetcourbes.org/cours',
  },
};

export default function CoursPage() {
  return <Cours />;
}
