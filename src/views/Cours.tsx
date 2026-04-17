'use client';
import React from 'react';
import { useState, useEffect } from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';
import CoursHero from '../components/cours/CoursHero';
import CoursGrid from '../components/cours/CoursGrid';
import QualiopiModal from '../components/QualiopiModal';
import StructuredData from '../components/StructuredData';
import { getPageContentBySection, SectionContent } from '../services/pagesContent';

const Cours = () => {
  const [isQualiopiModalOpen, setIsQualiopiModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [content, setContent] = useState<SectionContent>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      const data = await getPageContentBySection('cours');
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

      <StructuredData pageType="courses" />

      <Header />
      <CoursHero
        content={content}
        onQualiopiClick={() => setIsQualiopiModalOpen(true)}
      />
      <CoursGrid
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

export default Cours;
