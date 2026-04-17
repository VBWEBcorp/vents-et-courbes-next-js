'use client';
import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { SectionContent } from '../../services/pagesContent';

interface ContactHeroProps {
  content: SectionContent;
}

const ContactHero: React.FC<ContactHeroProps> = ({ content }) => {
  return (
    <section className="bg-white pt-32 pb-16 md:pb-24 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8 text-left">
          <Link
            href="/"
            className="inline-flex items-center text-gray-600 hover:text-primary-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" strokeWidth={1.5} />
            Accueil
          </Link>
        </div>

        <h1 className="text-4xl md:text-6xl font-light text-primary-400 mb-6 leading-tight">
          {content.hero_title?.title || 'Contactez-nous'}
        </h1>

        <p className="text-gray-600 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
          {content.hero_description?.content || 'Une question, un projet ? Nous sommes là pour vous écouter et vous accompagner.'}
        </p>
      </div>
    </section>
  );
};

export default ContactHero;
