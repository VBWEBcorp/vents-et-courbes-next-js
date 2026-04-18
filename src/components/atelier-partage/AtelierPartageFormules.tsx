'use client';
import React, { useEffect } from 'react';
import { Gift } from 'lucide-react';

interface Formule {
  name: string;
  subtitle: string;
  price: string;
  engagementBonus: string;
  bonusValue: string;
  widgetId: string;
}

const formules: Formule[] = [
  {
    name: 'Tout Illimite',
    subtitle: 'Acces sans limite d\'heures',
    price: '300',
    engagementBonus: '1 stage de tournage de 18 heures offert',
    bonusValue: '340',
    widgetId: '7d93e262-68dc-47e3-828f-54980788fce8',
  },
  {
    name: '32 Heures par mois',
    subtitle: '32h d\'acces mensuel',
    price: '200',
    engagementBonus: '4 cours de modelage ou de tournage offerts',
    bonusValue: '220',
    widgetId: '9eb717b3-f209-4e56-9f30-9565a29a1276',
  },
  {
    name: '16 Heures par mois',
    subtitle: '16h d\'acces mensuel',
    price: '100',
    engagementBonus: '1 stage de modelage ou 1 stage pose d\'email',
    bonusValue: '165',
    widgetId: 'bdb977d1-b0bc-45d0-b4cc-6b8b8caedb15',
  },
];

const AtelierPartageFormules: React.FC = () => {
  useEffect(() => {
    // Charger le script Regiondo pour initialiser les widgets
    const existingScript = document.querySelector('script[src*="regiondo.net"]');
    if (existingScript) {
      existingScript.remove();
    }
    const script = document.createElement('script');
    script.src = 'https://widgets.regiondo.net/product/v1/product-widget.min.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  return (
    <>
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-center text-gray-900 mb-4 slide-up">
            Nos Formules
          </h2>
          <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
            Choisissez la formule qui correspond a votre rythme de creation
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {formules.map((formule, i) => (
              <div
                key={i}
                className={`relative rounded-3xl border-2 p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 ${
                  i === 0
                    ? 'border-primary-400 bg-primary-400/5'
                    : 'border-stone-200 bg-stone-50'
                }`}
              >
                {i === 0 && (
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

                <a
                  href={`#reserver-${formule.widgetId}`}
                  className={`block text-center py-3 rounded-full font-medium transition-colors ${
                    i === 0
                      ? 'bg-primary-400 hover:bg-primary-500 text-white'
                      : 'bg-gray-800 hover:bg-gray-900 text-white'
                  }`}
                >
                  Reserver en ligne
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Widgets de reservation Regiondo */}
      <section className="py-16 px-6 bg-stone-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
            Reservez votre residence
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Selectionnez vos dates et reservez directement en ligne
          </p>

          <div className="space-y-12">
            {formules.map((formule) => (
              <div
                key={formule.widgetId}
                id={`reserver-${formule.widgetId}`}
                className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-lg scroll-mt-24"
              >
                <h3 className="text-2xl font-bold text-primary-400 mb-2">
                  Residence {formule.name}
                </h3>
                <p className="text-gray-600 mb-6">{formule.subtitle}</p>
                <div className="min-h-[600px] w-full">
                  <product-details-widget widget-id={formule.widgetId}></product-details-widget>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center text-gray-600">
            <p className="mb-2">
              <strong>Besoin d'aide ?</strong> Contactez-nous au{' '}
              <a href="tel:+33680893927" className="text-primary-400 hover:text-primary-500">
                06 80 89 39 27
              </a>
            </p>
            <p>
              ou par email a{' '}
              <a href="mailto:contact@ventsetcourbes.org" className="text-primary-400 hover:text-primary-500">
                contact@ventsetcourbes.org
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default AtelierPartageFormules;
