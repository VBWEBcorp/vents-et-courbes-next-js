'use client';
import React from 'react';
import { Award, Users, BookOpen, MapPin } from 'lucide-react';
import { SectionContent } from '../../services/pagesContent';

interface AboutPresentationProps {
  content: SectionContent;
}

const AboutPresentation: React.FC<AboutPresentationProps> = ({ content }) => {
  const features = [
    {
      icon: Award,
      title: "Centre certifié",
      description: "Formation professionnelle certifiée Qualiopi"
    },
    {
      icon: Users,
      title: "Approche personnalisée",
      description: "Accompagnement adapté à chaque élève"
    },
    {
      icon: BookOpen,
      title: "+20 ans d'expérience",
      description: "Expertise et savoir-faire reconnus"
    },
    {
      icon: MapPin,
      title: "100m² dédiés",
      description: "Espace complet aux portes de Paris"
    }
  ];

  return (
    <section className="bg-white py-16 md:py-20 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-primary-400 mb-4">
            {content.presentation_title?.title || "Présentation de Vents & Courbes"}
          </h2>
          <div className="w-24 h-1 bg-primary-400 mx-auto mb-6 md:mb-8"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 mb-12 md:mb-16">
          <div className="space-y-6">
            <p className="text-gray-700 text-base md:text-lg leading-relaxed">
              <strong>{content.presentation_fondation?.content || "Vents & Courbes a été fondé en 2015 par Philippe Paumier, artiste céramiste ayant plus de 20 ans d'expérience et désireux de créer un lieu d'échange et d'apprentissage autour de la pratique de la céramique."}</strong>
            </p>

            <div className="bg-primary-50 rounded-2xl p-6 md:p-8">
              <h3 className="text-lg md:text-xl font-medium text-gray-900 mb-4">
                {content.presentation_approche?.title || "Une approche personnalisée de la céramique"}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {content.presentation_approche?.content || "Dans un souci de transmission du savoir-faire, d'une passion, Philippe Paumier propose une approche très personnelle de l'apprentissage de la céramique se reposant sur la répétition des gestes appris, de l'accord du geste et du corps sur la terre."}
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-stone-50 rounded-2xl p-6 md:p-8">
              <h3 className="text-lg md:text-xl font-medium text-gray-900 mb-4">
                {content.presentation_formation?.title || "Un centre de formation certifié"}
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                {content.presentation_formation?.content || "Aujourd'hui, Vents & Courbes est aussi un centre de formation certifié vous permettant de vous professionnaliser. Des formations professionnelles, cours et divers stages sont proposés pour tout public."}
              </p>
              <p className="text-gray-700 leading-relaxed">
                <a href="/formation-pro" className="text-primary-400 hover:text-primary-500 transition-colors">Formations professionnelles ↘</a>,{' '}
                <a href="/cours" className="text-primary-400 hover:text-primary-500 transition-colors">cours ↘</a> et{' '}
                <a href="/stages" className="text-primary-400 hover:text-primary-500 transition-colors">stages ↘</a>
              </p>
            </div>

            <div className="bg-primary-50 rounded-2xl p-6 md:p-8">
              <h3 className="text-lg md:text-xl font-medium text-gray-900 mb-4">
                {content.presentation_espace?.title || "Un espace dédié à la création"}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {content.presentation_espace?.content || "L'atelier offre un espace de 100 m² aux portes de Paris dédié à la création et à la recherche : une salle de tournage, une salle de modelage et de décoration sur céramique, et enfin un espace de stockage et de cuisson des pièces. Une bibliothèque est également à la disposition des élèves."}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 md:mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="text-center bg-stone-50 rounded-2xl p-6 md:p-8 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary-500" strokeWidth={1.5} />
                  </div>
                </div>
                <h4 className="text-gray-900 font-medium text-base md:text-lg mb-2">
                  {feature.title}
                </h4>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="bg-primary-50 rounded-3xl p-8 md:p-12 text-center">
          <h3 className="text-xl md:text-2xl font-medium text-gray-900 mb-6">
            {content.presentation_cta?.title || "Vous êtes artisan·e, artiste, designer, ou même amateur et aimez l'esprit de l'atelier mais vous voulez en savoir plus ?"}
          </h3>
          <p className="text-gray-700 text-lg mb-8">
            {content.presentation_cta?.content || "Nous sommes là pour échanger"}
          </p>
          <a
            href={content.presentation_cta?.button_link || "/contact"}
            className="inline-flex items-center bg-primary-400 hover:bg-primary-500 text-white px-6 md:px-8 py-3 md:py-4 rounded-full text-base md:text-lg font-medium transition-colors"
          >
            {content.presentation_cta?.button_text || "Échanger avec nous ↘"}
          </a>
        </div>
      </div>
    </section>
  );
};

export default AboutPresentation;
