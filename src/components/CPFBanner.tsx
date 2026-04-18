'use client';
import React from 'react';

interface CPFBannerProps {
  href: string;
  onCard?: boolean;
}

const CPFBanner: React.FC<CPFBannerProps> = ({ href, onCard = false }) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(href, '_blank', 'noopener,noreferrer');
  };

  const img = (
    <img
      src="https://i.ibb.co/Kzh5fw8L/Mon-compte-formation-rectangle.png"
      alt="Cette offre de formation est éligible à Mon Compte Formation"
      className={`${onCard ? 'h-10' : 'h-12'} w-auto rounded-md shadow-md`}
    />
  );

  if (onCard) {
    return (
      <button
        type="button"
        onClick={handleClick}
        className="inline-block hover:opacity-90 transition-opacity"
        title="Cette offre est éligible au CPF - moncompteformation.gouv.fr"
      >
        {img}
      </button>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block hover:opacity-90 transition-opacity"
      title="Cette offre est éligible au CPF - moncompteformation.gouv.fr"
    >
      {img}
    </a>
  );
};

export default CPFBanner;
