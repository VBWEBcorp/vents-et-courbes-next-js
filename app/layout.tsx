import type { Metadata } from 'next';
import '@/index.css';
import ScrollToTop from '@/components/ScrollToTop';
import LogoLoader from '@/components/LogoLoader';
import Chatbot from '@/components/Chatbot';
import CookiePopup from '@/components/CookiePopup';

export const metadata: Metadata = {
  title: 'Céramique Le Pré-Saint-Gervais - Atelier Vents et Courbes Paris | Cours Tournage Modelage',
  description: 'Céramique au Pré-Saint-Gervais : Atelier Vents et Courbes, centre de formation certifié Qualiopi. Cours de tournage, modelage céramique, stages intensifs et formations professionnelles CAP. 4,9★ (938 avis) - 33 Rue Danton, Paris.',
  keywords: 'céramique Pré-Saint-Gervais, cours tournage Paris, formation modelage céramique, stage poterie Paris, CAP céramique, atelier céramique Seine-Saint-Denis, centre formation Qualiopi céramique, cours potier Paris Est',
  authors: [{ name: 'Atelier Vents et Courbes' }],
  openGraph: {
    type: 'website',
    url: 'https://ventsetcourbes.org/',
    title: 'Céramique Le Pré-Saint-Gervais - Atelier Vents et Courbes Paris',
    description: 'Céramique au Pré-Saint-Gervais : centre de formation certifié Qualiopi. Cours de tournage, modelage céramique, stages intensifs. 4,9★ (938 avis) - 33 Rue Danton, Paris.',
    images: [{ url: 'https://i.ibb.co/ZzWhrH6J/logo-ventsetcourbes.png', width: 1200, height: 630 }],
    locale: 'fr_FR',
    siteName: 'Vents & Courbes',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Céramique Le Pré-Saint-Gervais - Atelier Vents et Courbes Paris',
    description: 'Céramique au Pré-Saint-Gervais : centre de formation certifié Qualiopi. Cours de tournage, modelage céramique, stages intensifs. 4,9★ (938 avis)',
    images: ['https://i.ibb.co/ZzWhrH6J/logo-ventsetcourbes.png'],
  },
  verification: {
    google: 'LqQiW7NDm-naEnpIiRmfn32BnHsiOYYDS5CQDLNY0wA',
  },
  other: {
    'geo.region': 'FR-93',
    'geo.placename': 'Le Pré-Saint-Gervais',
    'geo.position': '48.8854;2.4103',
    'ICBM': '48.8854, 2.4103',
    'business:contact_data:street_address': '33 Rue Danton',
    'business:contact_data:locality': 'Le Pré-Saint-Gervais',
    'business:contact_data:region': 'Seine-Saint-Denis',
    'business:contact_data:postal_code': '93310',
    'business:contact_data:country_name': 'France',
    'business:contact_data:phone_number': '+33680893927',
    'business:contact_data:email': 'contact@ventsetcourbes.org',
  },
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
        <meta name="theme-color" content="#C4553C" />
        <link rel="preload" href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap" as="style" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap" />
        <script type="text/javascript" src="https://widgets.regiondo.net/product/v1/product-widget.min.js" async defer />
      </head>
      <body>
        <LogoLoader />
        <ScrollToTop />
        <div className="min-h-screen">
          {children}
        </div>
        <Chatbot />
        <CookiePopup />
      </body>
    </html>
  );
}
