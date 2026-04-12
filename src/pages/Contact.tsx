import React from 'react';
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ContactHero from '../components/contact/ContactHero';
import ContactInfo from '../components/contact/ContactInfo';
import ContactForm from '../components/contact/ContactForm';
import ContactMap from '../components/contact/ContactMap';
import StructuredData from '../components/StructuredData';
import { getPageContentBySection, SectionContent } from '../services/pagesContent';

const Contact = () => {
  const [content, setContent] = useState<SectionContent>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      const data = await getPageContentBySection('contact');
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
        <title>Contact Atelier Céramique - Vents et Courbes Le Pré-Saint-Gervais | 06 80 89 39 27</title>
        <meta name="description" content="Contactez l'Atelier Vents et Courbes céramique au Pré-Saint-Gervais. 33 Rue Danton, 93310. Tel: 06 80 89 39 27. Email: contact@ventsetcourbes.org. Formulaire de contact et plan d'accès." />
        <link rel="canonical" href="https://ventsetcourbes.org/contact" />
        <meta property="og:title" content="Contact Atelier Céramique - Vents et Courbes Le Pré-Saint-Gervais" />
        <meta property="og:description" content="Contactez l'Atelier Vents et Courbes céramique au Pré-Saint-Gervais. 33 Rue Danton, 93310. Tel: 06 80 89 39 27." />
        <meta property="og:url" content="https://ventsetcourbes.org/contact" />
      </Helmet>

      <StructuredData pageType="contact" />

      <Header />
      <ContactHero content={content} />
      <ContactInfo content={content} />
      <ContactForm content={content} />
      <ContactMap content={content} />
      <Footer />
    </div>
  );
};

export default Contact;
