import React from 'react';
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';
import StagesHero from '../components/stages/StagesHero';
import StagesGrid from '../components/stages/StagesGrid';
import QualiopiModal from '../components/QualiopiModal';
import StructuredData from '../components/StructuredData';
import { getPageContentBySection, SectionContent } from '../services/pagesContent';

const Stages = () => {
  const [isQualiopiModalOpen, setIsQualiopiModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [content, setContent] = useState<SectionContent>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      const data = await getPageContentBySection('stages');
      setContent(data);
      setLoading(false);
    };
    fetchContent();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="flex justify-center items-center py-32">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-400 mx-auto mb-4"></div>
            <p className="text-gray-600">Chargement...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Stages Céramique Paris - Intensifs Tournage Modelage | Le Pré-Saint-Gervais</title>
        <meta name="description" content="Stages intensifs céramique au Pré-Saint-Gervais : tournage, modelage, émaillage. Weekends et semaines complètes. Carte cadeau disponible. Atelier Vents et Courbes Paris." />
        <link rel="canonical" href="https://ventsetcourbes.org/stages" />
        <meta property="og:title" content="Stages Céramique Paris - Intensifs Tournage Modelage" />
        <meta property="og:description" content="Stages intensifs céramique au Pré-Saint-Gervais : tournage, modelage, émaillage. Weekends et semaines complètes." />
        <meta property="og:url" content="https://ventsetcourbes.org/stages" />
      </Helmet>

      <StructuredData pageType="stages" />

      <Header />
      <StagesHero
        content={content}
        onQualiopiClick={() => setIsQualiopiModalOpen(true)}
      />
      <StagesGrid
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />
      <Footer />

      <QualiopiModal
        isOpen={isQualiopiModalOpen}
        onClose={() => setIsQualiopiModalOpen(false)}
      />
    </div>
  );
};

export default Stages;
