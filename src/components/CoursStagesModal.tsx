'use client';
import React, { useState } from 'react';
import { X, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface CoursStagesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CoursStagesModal: React.FC<CoursStagesModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('cours');

  const cours = [
    {
      title: "32 cours de tournage",
      description: "Formation annuelle complète pour maîtriser le tournage",
      duration: "96h - Annuel",
      price: "1600€",
      link: "/cours"
    },
    {
      title: "12 cours de tournage", 
      description: "Initiation trimestrielle aux techniques de base",
      duration: "36h - Trimestriel",
      price: "620€",
      link: "/cours"
    },
    {
      title: "1 cours de tournage",
      description: "Cours d'essai pour découvrir le tournage",
      duration: "3h - Séance unique",
      price: "55€",
      link: "/reservation/tournage-single"
    },
    {
      title: "32 cours de modelage",
      description: "Formation annuelle en techniques de modelage",
      duration: "96h - Annuel", 
      price: "1440€",
      link: "/cours"
    },
    {
      title: "12 cours de modelage",
      description: "Découverte trimestrielle du modelage à la main",
      duration: "36h - Trimestriel",
      price: "580€",
      link: "/cours"
    },
    {
      title: "1 cours de modelage",
      description: "Initiation aux bases du façonnage manuel",
      duration: "3h - Séance unique", 
      price: "50€",
      link: "/reservation/modelage-single"
    }
  ];

  const stages = [
    {
      title: "Stage de tournage 4 jours",
      description: "Stage intensif pour maîtriser le tournage",
      duration: "25h sur 4 jours",
      price: "470€",
      link: "/reservation/stage-tournage-ceramique"
    },
    {
      title: "Stage de tournage 3 jours", 
      description: "Weekend intensif de perfectionnement",
      duration: "18h sur 3 jours",
      price: "340€",
      link: "/reservation/stage-tournage-3-jours"
    },
    {
      title: "Duo de bols au tour",
      description: "Découverte du tournage de bols avec un proche",
      duration: "3h - Initiation",
      price: "72€", 
      link: "/reservation/duo-bols-au-tour"
    },
    {
      title: "Tournage & Modelage",
      description: "Journée complète pour découvrir les deux techniques",
      duration: "7h - Initiation",
      price: "165€",
      link: "/reservation/tournage-modelage-initiation"
    },
    {
      title: "Modelage d'une carafe",
      description: "Créez votre carafe en technique de modelage",
      duration: "6h - Journée",
      price: "165€",
      link: "/reservation/modelage-carafe"
    },
    {
      title: "Initiation émaillage",
      description: "Découverte des techniques de décors céramique",
      duration: "3h - Initiation",
      price: "70€",
      link: "/reservation/initiation-emaillage"
    },
    {
      title: "Recherche et compréhension d'émail",
      description: "Stage avancé de formulation d'émaux avec Sylvie Barbara",
      duration: "28h - Avancé",
      price: "470€",
      link: "/reservation/recherche-email"
    },
    {
      title: "Impressions sur céramique",
      description: "Techniques d'impression d'images sur céramique avec Vincent Lévy",
      duration: "16h - Avancé",
      price: "360€",
      link: "/reservation/impressions-ceramique"
    },
    {
      title: "Volumes et engobes vitrifiés - Luberon",
      description: "Stage avec Maria Bosch dans le Luberon (5 jours)",
      duration: "35h sur 5 jours",
      price: "695€",
      link: "/reservation/volumes-engobes-maria-bosch"
    },
    {
      title: "Volumes et engobes vitrifiés - Paris",
      description: "Stage d'engobes vitrifiés haute température avec Maria Bosch",
      duration: "21h sur 3 jours",
      price: "490€",
      link: "/reservation/engobes-vitrifie-maria-bosch"
    }
  ];

  const formations = [
    {
      title: "Formation CAP Tournage",
      description: "Formation diplômante pour devenir céramiste professionnel",
      duration: "571h - Certifiante",
      price: "12 000€",
      link: "/formation-pro"
    },
    {
      title: "Formation Créateur Céramique",
      description: "Parcours complet pour créer son activité céramique",
      duration: "À partir de 350h",
      price: "11 000€", 
      link: "/formation-pro"
    }
  ];

  if (!isOpen) return null;

  const renderItems = (items: any[]) => (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div key={index} className="group">
          <Link
            href={item.link}
            onClick={onClose}
            className="block bg-stone-50 hover:bg-stone-100 rounded-lg p-4 transition-colors"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h4 className="text-gray-900 font-medium text-sm mb-1 group-hover:text-primary-400 transition-colors">
                  {item.title}
                </h4>
                <p className="text-gray-600 text-xs mb-2 leading-relaxed">
                  {item.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 text-xs">
                    {item.duration}
                  </span>
                  <span className="text-primary-400 font-medium text-sm">
                    {item.price}
                  </span>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-primary-400 group-hover:translate-x-1 transition-all ml-3 flex-shrink-0" strokeWidth={1.5} />
            </div>
          </Link>
        </div>
      ))}
    </div>
  );

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[85vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-primary-400 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors p-1"
          >
            <X className="w-6 h-6" strokeWidth={1.5} />
          </button>
          
          <h2 className="text-2xl font-bold mb-2">
            Découvrir nos cours & stages
          </h2>
          <p className="text-primary-100">
            Trouvez la formation qui vous correspond
          </p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          {[
            { id: 'cours', label: 'Cours', count: cours.length },
            { id: 'cours', label: 'Loisirs', count: cours.length },
            { id: 'stages', label: 'Stages', count: stages.length },
            { id: 'formations', label: 'Formations Pro', count: formations.length }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-primary-400 border-b-2 border-primary-400 bg-primary-50'
                  : 'text-gray-600 hover:text-primary-400'
              }`}
            >
              {tab.label}
              <span className="ml-2 text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {activeTab === 'cours' && (
            <div>
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Nos loisirs céramique
                </h3>
                <p className="text-gray-600 text-sm">
                  Formations régulières en tournage et modelage
                </p>
              </div>
              {renderItems(cours)}
              
              {/* Bouton discret Voir tous les cours */}
              <div className="mt-6 text-center">
                <Link
                  href="/cours"
                  onClick={onClose}
                  className="inline-flex items-center text-gray-500 hover:text-primary-400 text-sm font-medium transition-colors"
                >
                  Voir tous les loisirs →
                </Link>
              </div>
            </div>
          )}

          {activeTab === 'stages' && (
            <div>
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Nos stages intensifs  
                </h3>
                <p className="text-gray-600 text-sm">
                  Stages ponctuels pour découvrir ou se perfectionner
                </p>
              </div>
              {renderItems(stages)}
              
              {/* Bouton discret Voir tous les stages */}
              <div className="mt-6 text-center">
                <Link
                  href="/stages"
                  onClick={onClose}
                  className="inline-flex items-center text-gray-500 hover:text-primary-400 text-sm font-medium transition-colors"
                >
                  Voir tous les stages →
                </Link>
              </div>
            </div>
          )}

          {activeTab === 'formations' && (
            <div>
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Formations professionnelles
                </h3>
                <p className="text-gray-600 text-sm">
                  Formations certifiées pour se professionnaliser
                </p>
              </div>
              {renderItems(formations)}
              
              {/* Bouton discret Voir toutes les formations pro */}
              <div className="mt-6 text-center">
                <Link
                  href="/formation-pro"
                  onClick={onClose}
                  className="inline-flex items-center text-gray-500 hover:text-primary-400 text-sm font-medium transition-colors"
                >
                  Voir toutes les formations pro →
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-stone-50 p-4 text-center border-t border-gray-200">
          <p className="text-gray-600 text-sm mb-2">
            Besoin d'aide pour choisir ?
          </p>
          <Link
            href="/contact"
            onClick={onClose}
            className="text-primary-400 hover:text-primary-500 font-medium text-sm"
          >
            Contactez-nous →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CoursStagesModal;