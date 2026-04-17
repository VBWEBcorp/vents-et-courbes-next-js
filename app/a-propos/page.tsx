import type { Metadata } from 'next';
import About from '@/views/About';

export const metadata: Metadata = {
  title: 'À Propos Céramique Paris - Histoire Atelier Vents et Courbes Le Pré-Saint-Gervais',
  description: 'À propos de l\'Atelier Vents et Courbes : histoire, équipe et savoir-faire céramique au Pré-Saint-Gervais depuis 2015. Centre de formation certifié Qualiopi avec Philippe Paumier et son équipe d\'experts.',
  alternates: { canonical: 'https://ventsetcourbes.org/a-propos' },
  openGraph: {
    title: 'À Propos Céramique Paris - Histoire Atelier Vents et Courbes',
    description: 'À propos de l\'Atelier Vents et Courbes : histoire, équipe et savoir-faire céramique au Pré-Saint-Gervais depuis 2015.',
    url: 'https://ventsetcourbes.org/a-propos',
  },
};

export default function AboutPage() {
  return <About />;
}
