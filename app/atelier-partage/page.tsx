import type { Metadata } from 'next';
import AtelierPartage from '@/views/AtelierPartage';

export const metadata: Metadata = {
  title: 'Atelier Partagé Céramique Paris - Résidence Céramique | Le Pré-Saint-Gervais',
  description: 'Atelier partagé céramique au Pré-Saint-Gervais : espace de 100 m², 8 tours, émaillage compris. 3 formules de 100 à 300 €/mois. Accès libre 7j/7. Vents et Courbes.',
  alternates: { canonical: 'https://ventsetcourbes.org/atelier-partage' },
  openGraph: {
    title: 'Atelier Partagé Céramique - Résidence Céramique',
    description: 'Atelier partagé céramique au Pré-Saint-Gervais : espace équipé de 100 m², 3 formules accessibles. Accès libre 7j/7.',
    url: 'https://ventsetcourbes.org/atelier-partage',
  },
};

export default function AtelierPartagePage() {
  return <AtelierPartage />;
}
