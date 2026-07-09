'use client';
import React from 'react';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import CoursStagesModal from './CoursStagesModal';
import { getPageContentBySection, img } from '../services/pagesContent';
import { useGlobalContent } from '../hooks/useGlobalContent';

const DEFAULT_HERO_BG = 'https://i.ibb.co/r2pTGFy7/Artisanat-Paumier-02-2017-EH-21-1-1-scaled-1.jpg';
const DEFAULT_LOGO = 'https://i.ibb.co/ZzWhrH6J/logo-ventsetcourbes.png';

interface HeroProps {
  mainTitle?: string;
  subTitle?: string;
  thirdTitle?: string;
  description?: string;
  cta1Text?: string;
  cta1Link?: string;
  cta2Text?: string;
  cta2Link?: string;
  section?: string;
}

const Hero: React.FC<HeroProps> = ({
  mainTitle: propMainTitle,
  subTitle: propSubTitle,
  thirdTitle: propThirdTitle,
  description: propDescription,
  cta1Text: propCta1Text,
  cta1Link: propCta1Link,
  cta2Text: propCta2Text,
  cta2Link: propCta2Link,
  section = 'home',
}) => {
  const [isCoursStagesModalOpen, setIsCoursStagesModalOpen] = useState(false);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const [content, setContent] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const global = useGlobalContent();
  const logo = img(global.logo, DEFAULT_LOGO);

  useEffect(() => {
    const loadContent = async () => {
      const data = await getPageContentBySection(section);
      setContent(data);
      setLoading(false);
    };
    loadContent();
  }, [section]);

  const mainTitle = content.hero_title?.title || propMainTitle || "Atelier de céramique";
  const subTitle = content.hero_subtitle?.subtitle || propSubTitle || "Centre de formation";
  const thirdTitle = content.hero_third_title?.title || propThirdTitle;
  const description = content.hero_description?.content || propDescription || "Bienvenue sur le site de Vents & Courbes, votre espace créatif aux portes de Paris.";
  const cta1Text = content.hero_cta1?.button_text || propCta1Text || "Découvrir nos cours & stages";
  const cta1Link = content.hero_cta1?.button_link || propCta1Link;
  const cta2Text = content.hero_cta2?.button_text || propCta2Text || "Formation professionnelle";
  const cta2Link = content.hero_cta2?.button_link || propCta2Link || "/formation-pro";
  const heroBg = content.hero_image?.image_url || DEFAULT_HERO_BG;

  useEffect(() => {
    let rafId: number | null = null;

    const update = () => {
      rafId = null;
      const parallax = parallaxRef.current;
      if (parallax) {
        const scrolled = window.pageYOffset;
        parallax.style.transform = `translate3d(0, ${scrolled * 0.5}px, 0)`;
      }
    };

    const handleScroll = () => {
      // Coalesce scroll events: au plus une mise a jour du transform par frame
      if (rafId === null) {
        rafId = window.requestAnimationFrame(update);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId !== null) window.cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center px-4 md:px-6 pt-32 overflow-hidden">
        {/* Background Image with Parallax */}
        <div className="absolute inset-0 overflow-hidden">
          <div 
            ref={parallaxRef}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-110"
            style={{
              backgroundImage: `url("${heroBg}")`,
              willChange: 'transform',
              height: '120%',
              top: '-10%',
              filter: 'brightness(1.25)'
            }}
          ></div>
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-black/25"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Logo mobile uniquement */}
        <div className="block md:hidden mb-8 fade-in">
          <img
            src={logo}
            alt="Vents et Courbes"
            className="h-16 w-auto mx-auto pulse-soft"
          />
        </div>

        {/* Main Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-bold text-white mb-4 md:mb-6 leading-tight fade-in drop-shadow-lg">
          {mainTitle || "Atelier de céramique"}
        </h1>

        {/* Subtitle */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl xl:text-7xl font-bold text-primary-400 mb-3 md:mb-4 leading-tight fade-in-delay drop-shadow-lg">
          {subTitle || "Centre de formation"}
        </h2>
        
        {/* Third Title */}
        {thirdTitle && (
          <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl xl:text-7xl font-bold text-primary-400 mb-6 md:mb-8 leading-tight fade-in-delay-2 drop-shadow-lg">
            {thirdTitle}
          </h3>
        )}

        {/* Description */}
        <p className="text-white text-base sm:text-lg md:text-xl mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed font-normal px-2 fade-in-delay-2 drop-shadow-md">
          {description || "Bienvenue sur le site de Vents & Courbes, votre espace créatif aux portes de Paris."}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center px-2 slide-up-delay mb-16 md:mb-20">
          <button
            onClick={() => setIsCoursStagesModalOpen(true)}
            className="w-full sm:w-auto bg-primary-400 hover:bg-primary-500 text-white px-6 md:px-8 py-3 md:py-3 rounded-full text-base md:text-lg min-w-[280px] sm:min-w-[220px] font-normal btn-animate shadow-lg"
          >
            {cta1Text || "Découvrir nos cours & stages"}
          </button>
          <Link
            href={cta2Link || "/formation-pro"}
            className="w-full sm:w-auto border-2 border-white text-white hover:bg-white hover:text-primary-400 px-6 md:px-8 py-3 md:py-3 rounded-full text-base md:text-lg min-w-[280px] sm:min-w-[220px] font-normal btn-animate text-center inline-block shadow-lg backdrop-blur-sm"
          >
            {cta2Text || "Formation professionnelle"}
          </Link>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce fade-in z-10">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-2 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
      </section>

      <CoursStagesModal
        isOpen={isCoursStagesModalOpen}
        onClose={() => setIsCoursStagesModalOpen(false)}
      />
    </>
  );
};

export default Hero;