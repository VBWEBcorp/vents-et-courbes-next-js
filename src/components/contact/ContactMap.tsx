import React from 'react';
import { SectionContent } from '../../services/pagesContent';

interface ContactMapProps {
  content: SectionContent;
}

const ContactMap: React.FC<ContactMapProps> = ({ content }) => {
  return (
    <section className="bg-stone-50 py-12 md:py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-light text-gray-900 mb-4">
            {content.map_title?.title || 'Nous trouver'}
          </h2>
          <p className="text-gray-600">
            {content.map_title?.content || '33 rue Danton — 93310 Le Pré-Saint-Gervais'}
          </p>
        </div>

        <div className="rounded-2xl overflow-hidden shadow-lg">
          <img
            src="https://i.ibb.co/TDVGN5c7/MAP-VC.png"
            alt="Plan d'accès à l'atelier Vents et Courbes"
            className="w-full h-auto"
            loading="lazy"
          />
        </div>

        <div className="text-center mt-6">
          <p className="text-gray-600 text-sm">
            <span className="font-medium">Transports :</span> Métro 11 & 5, Tram T3, Bus 48/61/170
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactMap;
