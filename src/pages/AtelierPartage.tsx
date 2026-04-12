import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';
import StructuredData from '../components/StructuredData';
import AtelierPartageHero from '../components/atelier-partage/AtelierPartageHero';
import AtelierPartageFormules from '../components/atelier-partage/AtelierPartageFormules';
import AtelierPartageDetails from '../components/atelier-partage/AtelierPartageDetails';

const AtelierPartage = () => {
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Atelier Partage Ceramique Paris - Residence Ceramique | Le Pre-Saint-Gervais</title>
        <meta name="description" content="Atelier partage ceramique au Pre-Saint-Gervais : espace de 100 m², 8 tours, emaillage compris. 3 formules de 100 a 300 EUR/mois. Acces libre 7j/7. Vents et Courbes." />
        <link rel="canonical" href="https://ventsetcourbes.org/atelier-partage" />
        <meta property="og:title" content="Atelier Partage Ceramique - Residence Ceramique" />
        <meta property="og:description" content="Atelier partage ceramique au Pre-Saint-Gervais : espace equipe de 100 m², 3 formules accessibles. Acces libre 7j/7." />
        <meta property="og:url" content="https://ventsetcourbes.org/atelier-partage" />
      </Helmet>

      <StructuredData pageType="stages" />

      <Header />
      <AtelierPartageHero />
      <AtelierPartageFormules />
      <AtelierPartageDetails />
      <Footer />
    </div>
  );
};

export default AtelierPartage;
