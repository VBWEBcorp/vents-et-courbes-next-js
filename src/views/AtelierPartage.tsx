'use client';
import React from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';
import StructuredData from '../components/StructuredData';
import AtelierPartageHero from '../components/atelier-partage/AtelierPartageHero';
import AtelierPartageFormules from '../components/atelier-partage/AtelierPartageFormules';
import AtelierPartageDetails from '../components/atelier-partage/AtelierPartageDetails';
import Gallery from '../components/Gallery';

const AtelierPartage = () => {
  return (
    <div className="min-h-screen">

      <StructuredData pageType="stages" />

      <Header />
      <AtelierPartageHero />
      <Gallery
        title="Notre atelier partage en images"
        description="Un espace de 100 m² entierement equipe au Pre-Saint-Gervais"
      />
      <AtelierPartageFormules />
      <AtelierPartageDetails />
      <Footer />
    </div>
  );
};

export default AtelierPartage;
