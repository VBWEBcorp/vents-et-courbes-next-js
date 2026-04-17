'use client';
import React from 'react';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import FinancementModal from '../FinancementModal';
import { SectionContent } from '../../services/pagesContent';

interface FormationProHeroProps {
  onQualiopiClick?: () => void;
  content: SectionContent;
}

const FormationProHero: React.FC<FormationProHeroProps> = ({ onQualiopiClick, content }) => {
  const [isFinancementModalOpen, setIsFinancementModalOpen] = useState(false);

  return (
    <>
      <section className="bg-stone-100 pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center text-gray-600 hover:text-blue-400 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" strokeWidth={1.5} />
              Accueil
            </Link>
          </div>

          <div className="mb-16">
            <h1 className="text-3xl md:text-6xl lg:text-7xl font-bold text-blue-400 mb-8 leading-tight">
              {content.hero_title?.title || 'Formations professionnelles à la carte'}
            </h1>
          </div>

          <div className="mb-12">
            <p className="text-gray-700 text-lg leading-relaxed mb-8">
              {content.qualiopi_text?.content || content.intro_qualiopi?.content || "Vents & Courbes est un organisme de formation certifié avec le label qualité"}{' '}
              <button
                onClick={onQualiopiClick}
                className="text-blue-400 hover:text-blue-500 transition-colors"
              >
                Qualiopi ↘
              </button>
              .
            </p>

            <p className="text-gray-700 text-lg leading-relaxed mb-8">
              {content.proposition_text?.content || content.intro_formations?.content || 'Nous proposons deux formations qui s\'adapteront à votre projet professionnel :'}
            </p>
          </div>

          {(content.cap_title?.title || content.cap_titre?.title) && (
            <div className="mb-12">
              <h3 className="text-xl font-medium text-gray-900 mb-4">
                {content.cap_title?.title || content.cap_titre?.title}
              </h3>
              {content.cap_description?.content && (
                <p className="text-gray-700 text-lg leading-relaxed mb-8">
                  {content.cap_description.content}
                </p>
              )}
            </div>
          )}

          {(content.financement_title?.title || content.financements_titre?.title) && (
            <div className="mb-12">
              <h3 className="text-xl font-medium text-gray-900 mb-4">
                {content.financement_title?.title || content.financements_titre?.title || 'Financements Disponibles'}
              </h3>
              {(content.financement_description?.content || content.financements_description?.content) && (
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  {content.financement_description?.content || content.financements_description?.content}
                </p>
              )}
              {content.financement_content?.content && (
                <p className="text-gray-700 text-lg leading-relaxed mb-8">
                  {content.financement_content.content}
                </p>
              )}
            </div>
          )}

          <div className="mb-8">
            <h4 className="text-lg font-medium text-gray-900 mb-4">
              {content.guide_title?.title || content.guide_financement?.title || 'Une possibilité de financement ?'}
            </h4>
            <a
              href="/guide-financement.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gray-800 hover:bg-gray-900 text-white px-8 py-3 rounded-full text-lg transition-colors"
            >
              {content.guide_financement?.button_text || 'Consulter le guide de financement ↓'}
            </a>
          </div>

          <div className="mb-8">
            <h4 className="text-lg font-medium text-gray-900 mb-4">
              {content.cpf_title?.title || content.guide_cpf?.title || 'Vous souhaitez financer votre formation via votre CPF ?'}
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
      </section>

      <FinancementModal
        isOpen={isFinancementModalOpen}
        onClose={() => setIsFinancementModalOpen(false)}
      />
    </>
  );
};

export default FormationProHero;
