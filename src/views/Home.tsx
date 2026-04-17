'use client';
import React from 'react';
import { useState, useEffect } from 'react';

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
