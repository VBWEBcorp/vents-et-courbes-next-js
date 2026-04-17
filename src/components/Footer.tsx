'use client';
import React from 'react';
import NAP from './NAP';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-8 px-6">
      <div className="max-w-7xl mx-auto text-center">
        {/* Business Information with structured data */}
        <div className="mb-6" itemScope itemType="https://schema.org/LocalBusiness">
          <meta itemProp="name" content="Atelier Vents et Courbes" />
          <meta itemProp="telephone" content="+33680893927" />
          <meta itemProp="email" content="contact@ventsetcourbes.org" />
          <div itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
            <meta itemProp="streetAddress" content="33 Rue Danton" />
            <meta itemProp="addressLocality" content="Le Pré-Saint-Gervais" />
            <meta itemProp="postalCode" content="93310" />
            <meta itemProp="addressCountry" content="FR" />
          </div>
          <meta itemProp="aggregateRating" itemScope itemType="https://schema.org/AggregateRating" />
          <meta itemProp="ratingValue" content="4.9" />
          <meta itemProp="reviewCount" content="938" />
        </div>
        
        {/* Logos côte à côte */}
        <div className="flex items-center justify-center gap-6 mb-4">
          <img 
            src="https://i.ibb.co/ZzWhrH6J/logo-ventsetcourbes.png" 
            alt="Vents et Courbes"
            className="h-16 w-auto"
          />
          <img 
            src="https://i.ibb.co/Q318G1sD/vignette-qualiopi-marque-de-certification-0-jpg.webp" 
            alt="Certification Qualiopi"
            className="h-16 w-auto"
          />
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