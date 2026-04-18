'use client';
import React from 'react';
import Link from 'next/link';
import { Gift } from 'lucide-react';
import { ATELIER_FORMULES } from '../../lib/ateliers';

const AtelierPartageFormules: React.FC = () => {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-center text-gray-900 mb-4 slide-up">
          Nos Formules
        </h2>
        <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
          Choisissez la formule qui correspond a votre rythme de creation
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ATELIER_FORMULES.map((formule, i) => (
            <div
              key={formule.slug}
              className={`relative rounded-3xl border-2 p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 ${
                formule.popular
                  ? 'border-primary-400 bg-primary-400/5'
                  : 'border-stone-200 bg-stone-50'
              }`}
            >
              {formule.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary-400 text-white text-xs font-bold px-4 py-1.5 rounded-full">
                  Populaire
                </div>
              )}

              <h3 className="text-xl font-bold text-gray-900 mb-1">{formule.name}</h3>
              <p className="text-gray-500 text-sm mb-6">{formule.subtitle}</p>

              <div className="mb-6">
                <p className="text-sm text-gray-500 mb-1">Sans engagement</p>
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold text-gray-900">{formule.price}</span>
                  <span className="text-gray-500 ml-1">EUR / mois</span>
                </div>
              </div>

              <div className="border-t border-stone-200 pt-6 mb-6">
                <p className="text-sm text-gray-500 mb-1">Engagement 10 a 12 mois</p>
                <div className="flex items-baseline mb-4">
                  <span className="text-4xl font-bold text-primary-400">{formule.price}</span>
                  <span className="text-gray-500 ml-1">EUR / mois</span>
                </div>

                <div className="flex items-start bg-green-50 rounded-xl p-3">
                  <Gift className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                  <div>
                    <p className="text-gray-800 text-sm font-medium">{formule.engagementBonus}</p>
                    <p className="text-gray-500 text-xs">(d'une valeur de {formule.bonusValue} EUR)</p>
                  </div>
                </div>
              </div>

              <Link
                href={`/atelier-partage/${formule.slug}`}
                className={`block text-center py-3 rounded-full font-medium transition-colors ${
                  formule.popular
                    ? 'bg-primary-400 hover:bg-primary-500 text-white'
                    : 'bg-gray-800 hover:bg-gray-900 text-white'
                }`}
              >
                Reserver en ligne
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AtelierPartageFormules;
