'use client';
import React from 'react';
import { GraduationCap, CheckCircle, Palette, MapPin, Gift, CreditCard } from 'lucide-react';
import { SectionContent } from '../services/pagesContent';

interface FeaturesProps {
  onQualiopiClick?: () => void;
  content?: SectionContent;
}

const featureIcons = [GraduationCap, CheckCircle, Palette, MapPin, Gift, CreditCard];

const defaultFeatures = [
  { title: "Formation", description: "Cours adaptés à tous niveaux" },
  { title: "Qualiopi", description: "Certification qualité" },
  { title: "Artisanat", description: "Savoir-faire traditionnel" },
  { title: "Le Pré Saint Gervais", description: "Atelier aux portes de Paris" },
  { title: "Carte cadeau", description: "Offrez la créativité" },
  { title: "Paiement", description: "Facilités de paiement" },
];

const Features: React.FC<FeaturesProps> = ({ onQualiopiClick, content }) => {
  const features = defaultFeatures.map((defaultFeature, index) => {
    const key = `feature_${index + 1}`;
    const entry = content?.[key];
    return {
      title: entry?.title || defaultFeature.title,
      description: entry?.content || defaultFeature.description,
      icon: featureIcons[index],
    };
  });

  return (
    <section className="bg-white py-12 md:py-16 px-4 md:px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 md:gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className={`bg-stone-50 rounded-2xl p-6 md:p-8 text-center card-hover stagger-item ${
                  feature.title === 'Qualiopi' ? 'cursor-pointer hover:bg-stone-100' : ''
                }`}
                onClick={feature.title === 'Qualiopi' ? onQualiopiClick : undefined}
              >
                <div className="flex justify-center mb-3 md:mb-4 float">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-primary-400/20 rounded-full flex items-center justify-center smooth-hover">
                    <Icon className="w-5 h-5 md:w-6 md:h-6 text-primary-500" strokeWidth={1.5} />
                  </div>
                </div>
                <h3 className="text-gray-900 font-bold text-base md:text-lg mb-2">
                  {feature.title}
                </h3>
                <p className="text-custom-dark text-sm leading-relaxed font-normal">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
