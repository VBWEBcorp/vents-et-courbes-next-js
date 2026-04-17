import type { Metadata } from 'next';
import AtelierPartage from '@/views/AtelierPartage';

export const metadata: Metadata = {
  title: 'Atelier Partage Ceramique Paris - Residence Ceramique | Le Pre-Saint-Gervais',
  description: 'Atelier partage ceramique au Pre-Saint-Gervais : espace de 100 m², 8 tours, emaillage compris. 3 formules de 100 a 300 EUR/mois. Acces libre 7j/7. Vents et Courbes.',
  alternates: { canonical: 'https://ventsetcourbes.org/atelier-partage' },
  openGraph: {
    title: 'Atelier Partage Ceramique - Residence Ceramique',
    description: 'Atelier partage ceramique au Pre-Saint-Gervais : espace equipe de 100 m², 3 formules accessibles. Acces libre 7j/7.',
    url: 'https://ventsetcourbes.org/atelier-partage',
  },
};

export default function AtelierPartagePage() {
  return <AtelierPartage />;
}
