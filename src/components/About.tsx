'use client';
import React from 'react';
import { Award, BookOpen, Users, Heart } from 'lucide-react';

interface AboutProps {
  title?: string | null;
  description?: string | null;
  aboutContent?: string | null;
}

const About: React.FC<AboutProps> = ({ title, description, aboutContent }) => {
  const professionalFeatures = [
    {
      icon: Award,
      title: "Équipe expérimentée",
      description: "Des artisans passionnés avec plus de 15 ans d'expérience"
    },
    {
      icon: BookOpen,
      title: "Programmes adaptés",
      description: "Des formations sur mesure pour tous les niveaux"
    },
    {
      icon: Users,
      title: "Communauté créative",
      description: "Un espace de partage et d'échange entre passionnés"
    },
    {
      icon: Heart,
      title: "Passion artisanale",
      description: "Atelier aux portes de Paris"
    }
  ];

  const displayContent = aboutContent || "Vents & Courbes est un espace de création dédié à la pratique de la céramique, situé au cœur de Paris. Notre atelier offre un environnement inspirant où artistes débutants et confirmés peuvent explorer leur créativité à travers l'art ancestral de la terre.";

  const paragraphs = displayContent.split('\n').filter(p => p.trim());

  return (
    <section className="bg-white py-16 md:py-20 px-4 md:px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16 fade-in">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-primary-400 mb-4 float">
            {title || "Atelier de céramique à Paris"}
          </h2>
          <div className="w-24 h-1 bg-primary-400 mx-auto scale-in"></div>
          {description && (
            <div className="mt-6">
              <p className="text-gray-700 text-lg max-w-2xl mx-auto leading-relaxed">
                {description}
              </p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-start fade-in-delay">
          <div className="space-y-6">
            {paragraphs.map((paragraph, index) => (
              <p key={index} className="text-gray-700 text-base md:text-lg leading-relaxed slide-up">
                {paragraph}
              </p>
            ))}
          </div>

          <div>
            <h3 className="text-xl md:text-2xl font-medium text-gray-900 mb-6 md:mb-8 slide-up">
              Des formations professionnelles :
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
              {professionalFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={index}
                    className="bg-stone-50 rounded-2xl p-4 md:p-6 text-center sm:text-left sm:flex sm:items-start sm:space-x-4 card-hover stagger-item"
                  >
                    <div className="flex justify-center sm:justify-start mb-3 sm:mb-0 sm:flex-shrink-0 float">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-primary-100 rounded-full flex items-center justify-center pulse-soft">
                        <Icon className="w-5 h-5 md:w-6 md:h-6 text-primary-500" strokeWidth={1.5} />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-gray-900 font-medium text-base md:text-lg mb-2 md:mb-3">
                        {feature.title}
                      </h4>
                      <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
