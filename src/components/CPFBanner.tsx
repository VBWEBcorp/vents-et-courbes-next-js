'use client';
import React from 'react';
import { useGlobalContent } from '../hooks/useGlobalContent';
import { img } from '../services/pagesContent';

interface CPFBannerProps {
  href: string;
  onCard?: boolean;
}

// Petit logo « Mon Compte Formation » (version carrée) — repli si non édité.
const DEFAULT_CPF_LOGO = 'https://i.ibb.co/GQfWb9vF/Mon-compte-formation-carr.png';

const CPFBanner: React.FC<CPFBannerProps> = ({ href, onCard = false }) => {
  const global = useGlobalContent();
  const CPF_LOGO = img(global.cpf_logo, DEFAULT_CPF_LOGO);
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(href, '_blank', 'noopener,noreferrer');
  };

  const className = `inline-flex items-center gap-2 bg-[#000091] hover:bg-[#00007a] text-white font-medium rounded-full shadow-md transition-colors ${
    onCard ? 'px-3 py-1.5 text-xs' : 'px-4 py-2.5 text-sm'
  }`;

  const content = (
    <>
      <img
        src={CPF_LOGO}
        alt="Mon Compte Formation"
        className={`${onCard ? 'h-5 w-5' : 'h-6 w-6'} rounded bg-white object-contain flex-shrink-0`}
      />
      <span>Réserver via mon CPF</span>
    </>
  );

  if (onCard) {
    return (
      <button
        type="button"
        onClick={handleClick}
        className={className}
        title="Réserver via mon CPF - moncompteformation.gouv.fr"
      >
        {content}
      </button>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      title="Réserver via mon CPF - moncompteformation.gouv.fr"
    >
      {content}
    </a>
  );
};

export default CPFBanner;
