import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { SectionContent } from '../../services/pagesContent';

interface AboutHeroProps {
  content: SectionContent;
}

const AboutHero: React.FC<AboutHeroProps> = ({ content }) => {
  const navigate = useNavigate();

  const scrollToTeam = () => {
    const teamSection = document.getElementById('team-section');
    if (teamSection) {
      teamSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const goToFormations = () => {
    navigate(content.hero_cta2?.button_link || '/cours');
  };

  return (
    <section className="bg-stone-100 min-h-screen flex items-center justify-center px-4 md:px-6 pt-32">
      <div className="max-w-4xl mx-auto text-center">
        <div className="absolute top-32 left-4 md:left-6">
          <Link
            to="/"
            className="inline-flex items-center text-gray-600 hover:text-primary-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" strokeWidth={1.5} />
            Accueil
          </Link>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-bold text-custom-dark mb-4 md:mb-6 leading-tight">
          {content.hero_title?.title || "L'histoire de"}
        </h1>

        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl xl:text-7xl font-bold text-primary-400 mb-6 md:mb-8 leading-tight">
          {content.hero_subtitle?.subtitle || "Vents & Courbes"}
        </h2>

        <p className="text-custom-dark text-base sm:text-lg md:text-xl mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed font-normal px-2">
          {content.hero_description?.content || "Une passion pour la céramique, une équipe expérimentée, un lieu de création unique aux portes de Paris"}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center px-2">
          <button
            onClick={scrollToTeam}
            className="w-full sm:w-auto bg-primary-400 hover:bg-primary-500 text-white px-6 md:px-8 py-3 md:py-3 rounded-full text-base md:text-lg transition-colors min-w-[280px] sm:min-w-[220px] font-normal btn-animate"
          >
            {content.hero_cta1?.button_text || "Découvrir l'équipe"}
          </button>
          <button
            onClick={goToFormations}
            className="w-full sm:w-auto border-2 border-primary-400 text-primary-400 hover:bg-primary-400 hover:text-white px-6 md:px-8 py-3 md:py-3 rounded-full text-base md:text-lg transition-colors min-w-[280px] sm:min-w-[220px] font-normal btn-animate"
          >
            {content.hero_cta2?.button_text || "Nos loisirs"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
