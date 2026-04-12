import React from 'react';
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Features from '../components/Features';
import About from '../components/About';
import Gallery from '../components/Gallery';
import Blog from '../components/Blog';
import Footer from '../components/Footer';
import QualiopiModal from '../components/QualiopiModal';
import StructuredData from '../components/StructuredData';
import { getPageContentBySection, SectionContent } from '../services/pagesContent';

const Home = () => {
  const [isQualiopiModalOpen, setIsQualiopiModalOpen] = useState(false);
  const [content, setContent] = useState<SectionContent>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      const data = await getPageContentBySection('home');
      setContent(data);
      setLoading(false);
    };
    fetchContent();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-400 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Céramique Le Pré-Saint-Gervais - Atelier Vents et Courbes Paris | Cours Tournage Modelage</title>
        <meta name="description" content="Céramique au Pré-Saint-Gervais : Atelier Vents et Courbes, centre de formation certifié Qualiopi. Cours de tournage, modelage céramique, stages intensifs et formations professionnelles CAP. 4,9★ (938 avis) - 33 Rue Danton, Paris." />
        <link rel="canonical" href="https://ventsetcourbes.org/" />
        <meta property="og:title" content="Céramique Le Pré-Saint-Gervais - Atelier Vents et Courbes Paris" />
        <meta property="og:description" content="Céramique au Pré-Saint-Gervais : centre de formation certifié Qualiopi. Cours de tournage, modelage céramique, stages intensifs. 4,9★ (938 avis) - 33 Rue Danton, Paris." />
        <meta property="og:url" content="https://ventsetcourbes.org/" />
      </Helmet>

      <StructuredData pageType="home" />

      <Header />
      <Hero section="home" />
      <Features
        onQualiopiClick={() => setIsQualiopiModalOpen(true)}
        content={content}
      />
      <About
        title={content.about_title?.title}
        description={content.about_description?.content}
        aboutContent={content.about_content?.content}
      />
      <Gallery
        title={content.gallery_title?.title}
        description={content.gallery_description?.content}
      />
      <Blog
        title={content.blog_title?.title}
        description={content.blog_description?.content}
      />
      <Footer />

      <QualiopiModal
        isOpen={isQualiopiModalOpen}
        onClose={() => setIsQualiopiModalOpen(false)}
      />
    </div>
  );
};

export default Home;
