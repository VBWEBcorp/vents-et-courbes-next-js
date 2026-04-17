'use client';
import React from 'react';
import { useState } from 'react';
import DevisModal from '../DevisModal';

const FormationProGrid = () => {
  const [isDevisModalOpen, setIsDevisModalOpen] = useState(false);
  const [selectedFormation, setSelectedFormation] = useState('');

  return (
    <>
      <section className="bg-white py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 gap-12">
          {/* Formation CAP Tournage */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 lg:col-span-2">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Image Section */}
              <div className="h-64 lg:h-auto overflow-hidden relative group">
                <a
                  href="https://prog1.catalogueformpro.com/3/formation-longue/1763285/formation-cap-tournage-en-ceramique"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full h-full"
                >
                  <img
                    src="https://i.ibb.co/JWg8sRD6/Formation-pro-photo.png"
                    alt="Formation CAP Tournage - Pratique du tournage en céramique"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Overlay avec icône sur hover */}
                  <div className="absolute inset-0 bg-blue-400/0 group-hover:bg-blue-400/10 transition-colors duration-300 flex items-center justify-center">
                    <div className="opacity-90 group-hover:opacity-100 transition-opacity duration-300 bg-white/95 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
                      <span className="text-blue-400 text-sm font-bold">📋 Voir le programme complet</span>
                    </div>
                  </div>
                </a>
              </div>

              {/* Content Section */}
              <div className="flex flex-col">
            {/* Header */}
            <div className="bg-blue-400 text-white p-6">
              <a
                href="https://prog1.catalogueformpro.com/3/formation-longue/1763285/formation-cap-tournage-en-ceramique"
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:text-blue-100 transition-colors group"
                title="Accéder au programme sur DIGIFORMA"
              >
                <h3 className="text-xl font-medium mb-2 group-hover:underline flex items-center">
                  📋 Formation CAP Tournage en Céramique 
                  <span className="ml-2 text-sm opacity-75 group-hover:opacity-100">→ DIGIFORMA</span>
                </h3>
              </a>
            </div>

            {/* Content */}
            <div className="p-6">
              <p className="text-gray-700 text-sm leading-relaxed mb-4">
                <strong>Transformez votre passion en véritable métier</strong> grâce à une formation rigoureuse et complète, 
                conçue pour préparer sérieusement au CAP Tournage en Céramique.
              </p>

              <p className="text-gray-700 text-sm leading-relaxed mb-4">
                Chez Vents & Courbes, nous plaçons l'excellence et la progression au cœur de notre pédagogie.
              </p>

              <p className="text-gray-700 text-sm leading-relaxed mb-4">
                Encadré·e par des formateurs et formatrices expérimentées, vous suivrez un programme structuré qui combine :
              </p>

              <ul className="text-gray-700 text-sm leading-relaxed mb-6 space-y-2 ml-4">
                <li>• L'apprentissage du tournage des formes exigées au CAP, à travers des exercices pratiques répétés,</li>
                <li>• Des évaluations régulières : quiz, devoirs et corrections individualisées,</li>
                <li>• Des CAP blancs pour se préparer dans des conditions réelles d'examen,</li>
                <li>• Une approche complète intégrant technique, théorie et créativité,</li>
                <li>• Le développement de l'autonomie et de la précision indispensables à une pratique professionnelle,</li>
                <li>• Des modules dédiés à la gestion d'atelier, à l'hygiène et à la sécurité.</li>
              </ul>

              <p className="text-gray-700 text-sm leading-relaxed mb-6 italic">
                Une formation exigeante et méthodique pour acquérir un savoir-faire reconnu, bâtir des bases solides 
                et aborder l'examen avec sérénité et confiance.
              </p>

              {/* Specs */}
              <div className="flex items-center justify-between mb-6 p-4 bg-stone-50 rounded-lg">
                <div className="text-center">
                  <div className="text-orange-400 font-medium text-lg">CAP TOURNAGE</div>
                </div>
                <div className="text-center">
                  <div className="text-gray-700 text-sm">571 heures</div>
                </div>
                <div className="text-center">
                  <div className="text-gray-700 text-sm">Présentiel</div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row items-stretch justify-center gap-3 mb-6">
                <button
                  onClick={() => {
                    setSelectedFormation('Formation CAP Tournage en Céramique');
                    setIsDevisModalOpen(true);
                  }}
                  className="flex-1 border border-blue-400 text-blue-400 rounded-full px-6 py-3 text-sm font-medium hover:bg-blue-400 hover:text-white transition-all duration-300 cursor-pointer bg-transparent text-center"
                >
                  Demander un devis
                </button>
                <a
                  href="/programme.pdf"
                  download="PROGRAMME_DU_CAP_TOURNAGE_EN_CERAMIQUE.pdf"
                  className="flex-1 border border-blue-400 text-blue-400 rounded-full px-6 py-3 text-sm font-medium hover:bg-blue-400 hover:text-white transition-all duration-300 text-center"
                >
                  Telecharger le programme
                </a>
              </div>

              {/* Footer info */}
              <div className="space-y-3">
                <p className="text-gray-600 text-xs">
                  Formation à la carte, demandez un devis ↘
                </p>
                <p className="text-gray-600 text-xs">
                  Possibilité de prise en charge par un organisme OPCO
                </p>
                <a
                  href="https://prog1.catalogueformpro.com/3/formation-longue/1763285/formation-cap-tournage-en-ceramique"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 text-sm font-medium hover:text-blue-500 transition-colors flex items-center"
                >
                  + d'informations sur notre programme ↘
                </a>
              </div>
            </div>
              </div>
            </div>
          </div>

          {/* Formation Créateur */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 lg:col-span-2">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Image Section */}
              <div className="h-64 lg:h-auto overflow-hidden relative group">
                <a
                  href="https://prog1.catalogueformpro.com/3/formation-longue/1765161/formation-cap-tournage-en-ceramique-option-createur"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full h-full"
                  title="Voir le programme complet sur DIGIFORMA"
                >
                  <img
                    src="https://i.ibb.co/5WkxqMTw/Formation-Cre-ation.jpg"
                    alt="Formation Créateur Céramique - Pratique de la céramique"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Overlay avec icône sur hover */}
                  <div className="absolute inset-0 bg-blue-400/0 group-hover:bg-blue-400/10 transition-colors duration-300 flex items-center justify-center">
                    <div className="opacity-90 group-hover:opacity-100 transition-opacity duration-300 bg-white/95 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
                      <span className="text-blue-400 text-sm font-bold">📋 Voir le programme complet</span>
                    </div>
                  </div>
                </a>
              </div>

              {/* Content Section */}
              <div className="flex flex-col">
            {/* Header */}
            <div className="bg-blue-400 text-white p-6">
              <a
                href="https://prog1.catalogueformpro.com/3/formation-longue/1765161/formation-cap-tournage-en-ceramique-option-createur"
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:text-blue-100 transition-colors group"
                title="Accéder au programme sur DIGIFORMA"
              >
                <h3 className="text-xl font-medium mb-2 group-hover:underline flex items-center">
                  📋 Formation Créateur Céramique 
                  <span className="ml-2 text-sm opacity-75 group-hover:opacity-100">→ DIGIFORMA</span>
                </h3>
              </a>
            </div>

            {/* Content */}
            <div className="p-6">
              <p className="text-gray-700 text-sm leading-relaxed mb-4">
                La formation Créateur Céramique est spécialement conçue pour celles et ceux qui souhaitent 
                devenir autonomes dans un atelier et bâtir un projet professionnel solide dans le domaine 
                de la céramique.
              </p>

              <p className="text-gray-700 text-sm leading-relaxed mb-6">
                Au fil d'un apprentissage progressif et structuré, vous acquerrez les techniques et 
                connaissances essentielles dans les disciplines clés : tournage, modelage, décors et cuisson.
              </p>

              {/* Specs */}
              <div className="flex items-center justify-between mb-6 p-4 bg-stone-50 rounded-lg">
                <div className="text-center">
                  <div className="text-orange-400 font-medium text-lg">CRÉATEUR</div>
                </div>
                <div className="text-center">
                  <div className="text-gray-700 text-sm">À partir de 350 heures</div>
                </div>
                <div className="text-center">
                  <div className="text-gray-700 text-sm">Présentiel</div>
                </div>
              </div>

              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                Cette formation s'appuie sur la répétition du geste, l'acquisition d'une réelle maîtrise 
                technique, ainsi que sur l'intégration des règles de sécurité indispensables à la pratique 
                professionnelle.
              </p>

              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                Grâce à des exercices pratiques, des mises en situation et des projets créatifs, vous 
                développerez votre autonomie, votre précision et votre créativité, tout en construisant 
                les bases nécessaires pour gérer un atelier de céramique de manière indépendante.
              </p>

              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                <strong>L'objectif :</strong> vous accompagner pas à pas dans la réalisation de votre projet 
                professionnel, en vous transmettant un savoir-faire complet et durable.
              </p>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row items-stretch justify-center gap-3 mb-6">
                <button
                  onClick={() => {
                    setSelectedFormation('Formation Créateur Céramique');
                    setIsDevisModalOpen(true);
                  }}
                  className="flex-1 border border-blue-400 text-blue-400 rounded-full px-6 py-3 text-sm font-medium hover:bg-blue-400 hover:text-white transition-all duration-300 cursor-pointer bg-transparent text-center"
                >
                  Demander un devis
                </button>
              </div>

              {/* Footer info */}
              <div className="space-y-3">
                <p className="text-gray-600 text-xs">
                  Formation à la carte, demandez un devis ↘
                </p>
                <p className="text-gray-600 text-xs">
                  Possibilité de prise en charge par un organisme OPCO
                </p>
                <a
                  href="https://prog1.catalogueformpro.com/3/formation-longue/1765161/formation-cap-tournage-en-ceramique-option-createur"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 text-sm font-medium hover:text-blue-500 transition-colors flex items-center"
                >
                  + d'informations sur notre programme ↘
                </a>
              </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
      </section>

      <DevisModal 
        isOpen={isDevisModalOpen}
        onClose={() => setIsDevisModalOpen(false)}
        formationType={selectedFormation}
      />
    </>
  );
};

export default FormationProGrid;