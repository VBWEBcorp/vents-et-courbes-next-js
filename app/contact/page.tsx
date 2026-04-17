import type { Metadata } from 'next';
import Contact from '@/views/Contact';

export const metadata: Metadata = {
  title: 'Contact Atelier Céramique - Vents et Courbes Le Pré-Saint-Gervais | 06 80 89 39 27',
  description: 'Contactez l\'Atelier Vents et Courbes céramique au Pré-Saint-Gervais. 33 Rue Danton, 93310. Tel: 06 80 89 39 27. Email: contact@ventsetcourbes.org. Formulaire de contact et plan d\'accès.',
  alternates: { canonical: 'https://ventsetcourbes.org/contact' },
  openGraph: {
    title: 'Contact Atelier Céramique - Vents et Courbes Le Pré-Saint-Gervais',
    description: 'Contactez l\'Atelier Vents et Courbes céramique au Pré-Saint-Gervais. 33 Rue Danton, 93310. Tel: 06 80 89 39 27.',
    url: 'https://ventsetcourbes.org/contact',
  },
};

export default function ContactPage() {
  return <Contact />;
}
