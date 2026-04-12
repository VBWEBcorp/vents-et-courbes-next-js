import React from 'react';
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AboutHero from '../components/about/AboutHero';
import AboutPresentation from '../components/about/AboutPresentation';
import AboutTeam from '../components/about/AboutTeam';
import AboutTestimonials from '../components/about/AboutTestimonials';
import StructuredData from '../components/StructuredData';
import { getPageContentBySection, SectionContent } from '../services/pagesContent';

const About = () => {
  const [content, setContent] = useState<SectionContent>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      const data = await getPageContentBySection('about');
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
        <title>À Propos Céramique Paris - Histoire Atelier Vents et Courbes Le Pré-Saint-Gervais</title>
        <meta name="description" content="À propos de l'Atelier Vents et Courbes : histoire, équipe et savoir-faire céramique au Pré-Saint-Gervais depuis 2015. Centre de formation certifié Qualiopi avec Philippe Paumier et son équipe d'experts." />
        <link rel="canonical" href="https://ventsetcourbes.org/a-propos" />
        <meta property="og:title" content="À Propos Céramique Paris - Histoire Atelier Vents et Courbes" />
        <meta property="og:description" content="À propos de l'Atelier Vents et Courbes : histoire, équipe et savoir-faire céramique au Pré-Saint-Gervais depuis 2015." />
        <meta property="og:url" content="https://ventsetcourbes.org/a-propos" />
      </Helmet>

      <StructuredData pageType="about" />

      <Header />
      <AboutHero content={content} />
      <AboutPresentation content={content} />
      <AboutTeam content={content} />
      <AboutTestimonials />
      <Footer />
    </div>
  );
};

export default About;
