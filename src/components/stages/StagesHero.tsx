'use client';
import React from 'react';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import FinancementModal from '../FinancementModal';
import { SectionContent } from '../../services/pagesContent';

interface StagesHeroProps {
  onQualiopiClick?: () => void;
  content: SectionContent;
}

const StagesHero: React.FC<StagesHeroProps> = ({ onQualiopiClick, content }) => {
  const [isFinancementModalOpen, setIsFinancementModalOpen] = useState(false);

  return (
    <>
      <section className="bg-stone-100 pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-gray-600 hover:text-green-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" strokeWidth={1.5} />
            Accueil
          </Link>
        </div>

        <div className="mb-16">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-green-400 mb-8 leading-tight">
            {content.hero_title?.title || 'Nos stages'}
          </h1>
          {(content.hero_subtitle?.subtitle) && (
            <h2 className="text-2xl font-medium text-gray-900 mb-8">
              {content.hero_subtitle.subtitle}
            </h2>
          )}

          {content.carte_cadeau?.title && (
            <div className="mb-12">
              <h2 className="text-2xl font-medium text-gray-900 mb-4">
                {content.carte_cadeau.title}
              </h2>
              {content.carte_cadeau.content && (
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  {content.carte_cadeau.content}
                </p>
              )}
            </div>
          )}

          {content.decouvrir?.title && (
            <div className="mb-12">
              <h2 className="text-2xl font-medium text-gray-900 mb-4">
                {content.decouvrir.title}
              </h2>
              {content.decouvrir.content && (
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  {content.decouvrir.content}
                </p>
              )}
            </div>
          )}

          {content.financement?.title && (
            <div className="mb-12">
              <h3 className="text-xl font-medium text-gray-900 mb-4">
                {content.financement.title}
              </h3>
              {content.financement.content && (
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  {content.financement.content}
                </p>
              )}
            </div>
          )}
        </div>

        <div>
          <div className="mb-4">
            <h4 className="text-lg font-medium text-gray-900 mb-4">
              {content.financement_title?.title || 'Une possibilité de financement ?'}
            </h4>
            <a
              href="/guide-financement.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gray-800 hover:bg-gray-900 text-white px-8 py-3 rounded-full text-lg transition-colors"
            >
              {content.financement_button?.button_text || 'Consulter le guide de financement ↓'}
            </a>
          </div>

          <div className="mb-4">
            <h4 className="text-lg font-medium text-gray-900 mb-4">
              {content.cpf_title?.title || 'Vous souhaitez financer votre formation via votre CPF ?'}
            </h4>
            <a
              href="/cpf-mode-emploi.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gray-800 hover:bg-gray-900 text-white px-8 py-3 rounded-full text-lg transition-colors"
            >
              {content.guide_cpf?.button_text || 'Consulter le guide de financement via CPF ↓'}
            </a>
          </div>
        </div>

        <div className="mt-8">
          <button
            onClick={onQualiopiClick}
            className="text-gray-600 hover:text-green-400 transition-colors group"
          >
            <span className="text-sm">
              {content.qualiopi_link?.button_text || 'En apprendre plus sur notre certification Qualiopi'}
            </span>
            <span className="ml-2 group-hover:translate-x-1 transition-transform inline-block">↗</span>
          </button>
        </div>
      </div>
      </section>

      <FinancementModal
        isOpen={isFinancementModalOpen}
        onClose={() => setIsFinancementModalOpen(false)}
      />
    </>
  );
};

export default StagesHero;
