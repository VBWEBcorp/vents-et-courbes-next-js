import type { Metadata } from 'next';
import Stages from '@/views/Stages';

export const metadata: Metadata = {
  title: 'Stages Céramique Paris - Intensifs Tournage Modelage | Le Pré-Saint-Gervais',
  description: 'Stages intensifs céramique au Pré-Saint-Gervais : tournage, modelage, émaillage. Weekends et semaines complètes. Carte cadeau disponible. Atelier Vents et Courbes Paris.',
  alternates: { canonical: 'https://ventsetcourbes.org/stages' },
  openGraph: {
    title: 'Stages Céramique Paris - Intensifs Tournage Modelage',
    description: 'Stages intensifs céramique au Pré-Saint-Gervais : tournage, modelage, émaillage. Weekends et semaines complètes.',
    url: 'https://ventsetcourbes.org/stages',
  },
};

export default function StagesPage() {
  return <Stages />;
}
