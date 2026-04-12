import React from 'react';
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FormationProHero from '../components/formation-pro/FormationProHero';
import FormationProGrid from '../components/formation-pro/FormationProGrid';
import QualiopiModal from '../components/QualiopiModal';
import StructuredData from '../components/StructuredData';
import { getPageContentBySection, SectionContent } from '../services/pagesContent';

const FormationPro = () => {
  const [isQualiopiModalOpen, setIsQualiopiModalOpen] = useState(false);
  const [content, setContent] = useState<SectionContent>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      const data = await getPageContentBySection('formation_pro');
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
        <title>Formation Professionnelle Céramique CAP - Centre Certifié Qualiopi Le Pré-Saint-Gervais</title>
        <meta name="description" content="Formation professionnelle CAP céramique certifiée Qualiopi au Pré-Saint-Gervais. CAP Tournage, formation Créateur céramique. Financement CPF, OPCO. 571h de formation professionnalisante." />
        <link rel="canonical" href="https://ventsetcourbes.org/formation-pro" />
        <meta property="og:title" content="Formation Professionnelle Céramique CAP - Centre Certifié Qualiopi" />
        <meta property="og:description" content="Formation professionnelle CAP céramique certifiée Qualiopi au Pré-Saint-Gervais. CAP Tournage, formation Créateur céramique." />
        <meta property="og:url" content="https://ventsetcourbes.org/formation-pro" />
      </Helmet>

      <StructuredData pageType="formation" />

      <Header />
      <FormationProHero
        content={content}
        onQualiopiClick={() => setIsQualiopiModalOpen(true)}
      />
      <FormationProGrid />
      <Footer />

      <QualiopiModal
        isOpen={isQualiopiModalOpen}
        onClose={() => setIsQualiopiModalOpen(false)}
      />
    </div>
  );
};

export default FormationPro;
