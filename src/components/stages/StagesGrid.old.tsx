import React from 'react';
import { useRef, useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

interface StagesGridProps {
  activeFilter?: string;
  onFilterChange?: (filter: string) => void;
}

const StagesGrid: React.FC<StagesGridProps> = ({ activeFilter = 'all', onFilterChange }) => {
  const gridRef = useRef<HTMLDivElement>(null);

  // Scroll vers la grille quand le filtre change
  useEffect(() => {
    if (activeFilter !== 'all' && gridRef.current) {
      const timer = setTimeout(() => {
        gridRef.current?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [activeFilter]);

  // Stages avec cuisson comprise
  const stagesWithCuisson = [
    'tournage-modelage-initiation',
    'modelage-carafe',
    'initiation-emaillage',
    'duo-bols-au-tour'
  ];

  const getStageSlug = (title: string) => {
    const slugMap: { [key: string]: string } = {
      "Tournage & Modelage": 'tournage-modelage-initiation',
      "Modelage d'une carafe": 'modelage-carafe',
      "Initiation émaillage": 'initiation-emaillage',
      "Duo de bols au tour": 'duo-bols-au-tour'
    };
    return slugMap[title] || '';
  };

  const stages = [
    {
      title: "4 jours de tournage",
      duration: "25 heures",
      level: "Tous niveaux",
      image: "https://i.ibb.co/nNtRR44G/4-jours-de-tournage.jpg",
      description: "Découvrez le tournage en céramique ou perfectionnez vos gestes grâce à l'accompagnement d'un.e céramiste professionnel.le.",
      includes: "Vous y pratiquerez plusieurs séances de tournage, ainsi qu'une séance de tournassage de vos pièces. Repartez avec vos pièces biscuitées, non émaillées.",
      price: "470€",
      additional: "+20€",
      additionalText: "Prix Net de TVA\nAdhésion annuelle",
      opco: "Possibilité de prise en charge par un organisme OPCO",
      reservationUrl: "/reservation/stage-tournage-ceramique"
    },
    {
      title: "3 jours de tournage",
      duration: "3 jours - 18 heures", 
      level: "Tous niveaux",
      image: "https://i.ibb.co/Y74rpwGr/3-jours-de-tournage.jpg",
      description: "Découvrez le tournage en céramique ou perfectionnez vos gestes grâce à l'accompagnement d'un.e céramiste professionnel.le.",
      includes: "Vous y pratiquerez plusieurs séances de tournage, ainsi qu'une séance de tournassage de vos pièces. Repartez avec vos pièces biscuitées, non émaillées.",
      price: "340€",
      additionalText: "Prix Net de TVA",
      opco: "Possibilité de prise en charge par un organisme OPCO",
      reservationUrl: "/reservation/stage-tournage-3-jours"
    },
    {
      title: "Tournage & Modelage",
      duration: "7 heures",
      level: "Initiation",
      image: "https://i.ibb.co/GjdsDzW/tournage-modelage-1.jpg",
      description: "Découvrez le tournage et le modelage en céramique lors d'une journée complète d'initiation. Une approche complète pour aborder ces deux techniques essentielles.",
      includes: "Initiation aux deux techniques principales de la céramique : tournage et modelage. Repartez avec vos pièces émaillées et cuites par nos soins !",
      price: "165€",
      additionalText: "Prix Net de TVA",
      reservationUrl: "/reservation/tournage-modelage-initiation"
    },
    {
      title: "Recherche et compréhension d'émail",
      duration: "28 heures",
      level: "Avancé",
      image: "https://i.ibb.co/gbtx9TYf/Recherche-et-compr-hension-d-mail.jpg",
      description: "Approfondissez vos connaissances sur les émaux céramiques et découvrez les techniques de recherche et formulation d'émaux avec Sylvie Barbara.",
      includes: "Formation approfondie sur les émaux, leurs compositions et leurs applications. Expérimentation et création de vos propres émaux.",
      price: "610€",
      additionalText: "Prix Net de TVA",
      opco: "Possibilité de prise en charge par un organisme OPCO",
      reservationUrl: "/reservation/recherche-email"
    },
    {
      title: "Volumes et engobes vitrifiés dans le Luberon",
      duration: "35 heures",
      level: "Avancé",
      image: "https://i.ibb.co/JLGJz2c/Volumes-et-engobes-vitrifi-s-avec-Maria-Bosh.png",
      description: "Du 20 au 24 juin 2026 84400 – Saignon dans le Luberon. Pendant ces 5 jours, Maria vous propose de plonger dans son univers de formes infinies.",
      includes: "Stage intensif avec Maria Bosch dans le Luberon. Hébergement et repas non inclus. Transport à organiser.",
      price: "695€",
      additionalText: "Prix Net de TVA",
      opco: "Possibilité de prise en charge par un organisme OPCO",
      reservationUrl: "/reservation/volumes-engobes-maria-bosch"
    },
    {
      title: "Volumes et engobes à Paris",
      duration: "21 heures",
      level: "Avancé",
      image: "https://i.ibb.co/gMm03Scw/Les-engobes-vitrifi-s-Paris-avec-Maria-Bosh.jpg",
      description: "L'initiation de recherche d'engobes vitrifiés haute température (1 260°C) vous permettra de mener une recherche d'engobes et explorer toutes les possibilités que cette technique peut offrir.",
      includes: "Formation sur les engobes vitrifiés haute température avec Maria Bosch à Paris. Matériel et cuissons inclus.",
      price: "490€",
      additionalText: "Prix Net de TVA",
      opco: "Possibilité de prise en charge par un organisme OPCO",
      reservationUrl: "/reservation/engobes-vitrifie-maria-bosch"
    },
    {
      title: "Impressions d'images sur céramique",
      duration: "16 heures",
      level: "Avancé",
      image: "https://i.ibb.co/YTD0Zyzp/Impressions-d-images-sur-c-ramique.jpg",
      description: "Ce stage sera l'occasion de développer votre créativité par l'utilisation d'impressions d'images photographiques et graphiques sur vos pièces céramiques.",
      includes: "Techniques d'impression photographique sur céramique avec Vincent Lévy. Matériel spécialisé fourni.",
      price: "360€",
      additionalText: "Prix Net de TVA",
      opco: "Possibilité de prise en charge par un organisme OPCO",
      reservationUrl: "/reservation/impressions-ceramique"
    },
    {
      title: "Initiation émaillage",
      duration: "3 heures",
      level: "Initiation",
      image: "https://i.ibb.co/27v9nsN4/initiation-e-maillage-1.jpg",
      description: "Lors de cette séance, nous aborderons les différentes techniques de décors sur céramique de manière théorique et pratique.",
      includes: "Initiation aux techniques d'émaillage et de décoration céramique. Repartez avec vos pièces émaillées et cuites par nos soins !",
      price: "70€",
      additionalText: "Prix Net de TVA",
      reservationUrl: "/reservation/initiation-emaillage"
    },
    {
      title: "Modelage d'une carafe",
      duration: "6 heures",
      level: "Tous niveaux",
      image: "https://i.ibb.co/qY3dXj4Z/cre-ation-carafe-1.jpg",
      description: "Découvrez le modelage en céramique à travers la création d'une carafe. Une journée complète pour apprendre les techniques de façonnage à la main.",
      includes: "Création d'une carafe personnalisée en technique de modelage. Repartez avec votre pièce émaillée et cuite par nos soins !",
      price: "165€",
      additionalText: "Prix Net de TVA",
      reservationUrl: "/reservation/modelage-carafe"
    },
    {
      title: "Duo de bols au tour",
      duration: "3 heures",
      level: "Initiation",
      image: "https://i.ibb.co/QFd5FZ16/Duo-de-bols-au-tour.jpg",
      description: "Découvrez les techniques de tournage du bol et initiez vous au tournage en céramique avec Frédérique Buisson !",
      includes: "Nous vous accompagnerons lors de cette séance dans la découverte du matériau, en répondant à vos questions et en vous laissant expérimenter les limites de la matière. Repartez avec votre pièce émaillée et cuite par nos soins !",
      price: "72€",
      additionalText: "Prix Net de TVA",
      reservationUrl: "/reservation/duo-bols-au-tour"
    }
  ];

  const filteredStages = stages.filter(stage => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'tournage') return stage.title.toLowerCase().includes('tournage') || stage.title.toLowerCase().includes('duo de bols');
    if (activeFilter === 'modelage') return stage.title.toLowerCase().includes('modelage') || stage.title.toLowerCase().includes('carafe');
    if (activeFilter === 'decors') return stage.title.toLowerCase().includes('émail') || stage.title.toLowerCase().includes('impressions') || stage.title.toLowerCase().includes('engobe');
    if (activeFilter === 'cuisson') return stagesWithCuisson.includes(getStageSlug(stage.title));
    return true;
  });

  return (
    <section className="bg-white py-16 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto" ref={gridRef}>
        {/* Filter Buttons - Responsive */}
        {onFilterChange && (
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8 fade-in">
            <button
              onClick={() => onFilterChange('all')}
              className={`px-4 md:px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                activeFilter === 'all'
                  ? 'bg-green-400 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-green-100'
              }`}
            >
              Tous les stages
            </button>
            <button
              onClick={() => onFilterChange('tournage')}
              className={`px-4 md:px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                activeFilter === 'tournage'
                  ? 'bg-green-400 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-green-100'
              }`}
            >
              Tournage
            </button>
            <button
              onClick={() => onFilterChange('modelage')}
              className={`px-4 md:px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                activeFilter === 'modelage'
                  ? 'bg-green-400 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-green-100'
              }`}
            >
              Modelage
            </button>
            <button
              onClick={() => onFilterChange('decors')}
              className={`px-4 md:px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                activeFilter === 'decors'
                  ? 'bg-green-400 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-green-100'
              }`}
            >
              Décors
            </button>
            <button
              onClick={() => onFilterChange('cuisson')}
              className={`px-4 md:px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                activeFilter === 'cuisson'
                  ? 'bg-green-400 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-green-100'
              }`}
            >
              Cuisson comprise
            </button>
          </div>
        )}
        
        {/* Compteur de résultats */}
        <div className="text-center mb-6 fade-in-delay">
          <p className="text-gray-600">
            {filteredStages.length} stage{filteredStages.length > 1 ? 's' : ''} 
            {activeFilter !== 'all' && (
              <span className="text-green-400 font-medium ml-1">
                - {activeFilter}
              </span>
            )}
          </p>
        </div>

        {/* Grid responsive: 1 colonne mobile, 2 tablette, 3 desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-6 lg:gap-8 stages-grid">
          {filteredStages.map((stage, index) => (
            <Link
              to={stage.reservationUrl}
              key={index}
              className="block bg-white rounded-2xl overflow-hidden shadow-lg card-hover stage-item hover:shadow-xl transition-all duration-500"
              style={{ 
                animationDelay: `${index * 0.1}s`,
                opacity: 0,
                transform: 'translateY(20px)'
              }}
            >
              {/* Header with title and badges */}
              <div className="bg-green-400 text-white p-6 relative bounce-in min-h-[140px] flex flex-col justify-center">
                <h3 className="text-lg lg:text-xl font-medium mb-2 leading-tight">
                  {stage.title}
                </h3>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-green-100">{stage.duration}</span>
                  <span className="text-green-100">{stage.level}</span>
                </div>
              </div>

              {/* Image */}
              <div className="h-48 lg:h-56 overflow-hidden image-zoom relative">
                <img
                  src={stage.image}
                  alt={stage.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                
                {/* Badge cuisson comprise */}
                {stagesWithCuisson.includes(getStageSlug(stage.title)) && (
                  <div className="absolute top-3 right-3">
                    <div className="bg-white/95 backdrop-blur-sm border border-green-400/30 text-green-600 px-3 py-1.5 rounded-full text-xs font-medium shadow-sm">
                      ✨ Cuisson comprise
                    </div>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Description */}
                <p className="text-gray-700 text-sm leading-relaxed mb-4">
                  {stage.description}
                </p>

                {/* Includes */}
                <p className="text-gray-600 text-sm italic mb-6 leading-relaxed">
                  {stage.includes}
                </p>

                {/* Price section */}
                <div className="mb-4">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-green-400 text-xl font-medium">Prix</span>
                    <span className="text-green-400 text-2xl lg:text-3xl font-bold ml-auto">
                      {stage.price}
                    </span>
                    {stage.additional && (
                      <span className="text-green-400 text-lg">{stage.additional}</span>
                    )}
                  </div>
                  
                  <div className="text-gray-600 text-sm leading-relaxed">
                    {stage.additionalText.split('\n').map((line, i) => (
                      <div key={i}>{line}</div>
                    ))}
                  </div>
                </div>

                {/* OPCO */}
                {stage.opco && (
                  <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                    {stage.opco}
                  </p>
                )}

                {/* CTA indication */}
                <div className="text-green-400 text-sm font-medium flex items-center">
                  Réserver ↘
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StagesGrid;