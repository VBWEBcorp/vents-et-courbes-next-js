'use client';
import React from 'react';
import NAP from './NAP';
import { useSiteSettings } from '../lib/siteSettings';
import { useGlobalContent } from '../hooks/useGlobalContent';
import { img } from '../services/pagesContent';

const DEFAULT_LOGO = 'https://i.ibb.co/ZzWhrH6J/logo-ventsetcourbes.png';
const DEFAULT_QUALIOPI = 'https://i.ibb.co/Q318G1sD/vignette-qualiopi-marque-de-certification-0-jpg.webp';
const DEFAULT_CPF = 'https://i.ibb.co/GQfWb9vF/Mon-compte-formation-carr.png';

const Footer = () => {
  const settings = useSiteSettings();
  const global = useGlobalContent();
  const logo = img(global.logo, DEFAULT_LOGO);
  const qualiopi = img(global.qualiopi_logo, DEFAULT_QUALIOPI);
  const cpf = img(global.cpf_logo, DEFAULT_CPF);
  return (
    <footer className="bg-white border-t border-gray-200 py-8 px-6">
      <div className="max-w-7xl mx-auto text-center">
        {/* Business Information with structured data */}
        <div className="mb-6" itemScope itemType="https://schema.org/LocalBusiness">
          <meta itemProp="name" content={settings.business_name} />
          <meta itemProp="telephone" content={settings.phone.replace(/\s/g, '')} />
          <meta itemProp="email" content={settings.email} />
          <div itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
            <meta itemProp="streetAddress" content={settings.address} />
            <meta itemProp="addressLocality" content={settings.city} />
            <meta itemProp="postalCode" content={settings.postal_code} />
            <meta itemProp="addressCountry" content="FR" />
          </div>
          {settings.rating_value && settings.rating_count && (
            <div itemProp="aggregateRating" itemScope itemType="https://schema.org/AggregateRating">
              <meta itemProp="ratingValue" content={settings.rating_value} />
              <meta itemProp="reviewCount" content={settings.rating_count} />
              <meta itemProp="bestRating" content="5" />
            </div>
          )}
        </div>
        
        {/* Logos côte à côte */}
        <div className="flex items-center justify-center gap-6 mb-4 flex-wrap">
          <img
            src={logo}
            alt="Vents et Courbes"
            className="h-16 w-auto"
          />
          <img
            src={qualiopi}
            alt="Certification Qualiopi"
            className="h-24 w-auto"
          />
          <a
            href="https://www.moncompteformation.gouv.fr/"
            target="_blank"
            rel="noopener noreferrer"
            title="Certaines formations sont éligibles au CPF - moncompteformation.gouv.fr"
            className="inline-block hover:opacity-90 transition-opacity"
          >
            <img
              src={cpf}
              alt="Cette offre de formation est éligible à Mon Compte Formation"
              className="h-24 w-auto"
            />
          </a>
        </div>
        
        <div className="space-y-2">
          <p className="text-gray-900 font-medium">
            Vents & Courbes
          </p>
          <p className="text-gray-600 text-sm mb-3">
            Centre de formation certifié Qualiopi
          </p>
          <p className="text-gray-600 text-sm">
            © 2025 Tous droits réservés
          </p>
          <p className="text-gray-500 text-xs">
            Design réalisation création{' '}
            <a 
              href="https://vbweb.fr" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary-400 hover:text-primary-500 transition-colors"
            >
              vbweb.fr
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;