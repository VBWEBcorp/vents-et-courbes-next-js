'use client';
import React from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';
import StructuredData from '../components/StructuredData';
import AtelierPartageHero from '../components/atelier-partage/AtelierPartageHero';
import AtelierPartageFormules from '../components/atelier-partage/AtelierPartageFormules';
import AtelierPartageDetails from '../components/atelier-partage/AtelierPartageDetails';

const AtelierPartage = () => {
  return (
    <div className="min-h-screen">

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
