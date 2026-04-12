import React from 'react';
import { Calendar, Flame, ClipboardCheck } from 'lucide-react';

const horaires = [
  { jour: 'Lundi', heures: 'De 07h a 23h' },
  { jour: 'Mardi', heures: 'De 07h a 13h et de 17h a 23h' },
  { jour: 'Mercredi', heures: 'De 13h a 19h' },
  { jour: 'Jeudi', heures: 'De 07h a 19h' },
  { jour: 'Vendredi', heures: 'De 07h a 23h' },
  { jour: 'Samedi', heures: 'De 13h a 23h' },
  { jour: 'Dimanche', heures: 'De 07h a 23h' },
];

const cuissons = [
  { label: '2 cuissons : biscuit + email perso.', prix: '12 EUR / kg' },
  { label: '2 cuissons : biscuit + email atelier', prix: '15 EUR / kg' },
  { label: '1 cuisson biscuit', prix: '9 EUR / kg' },
];

const cuissonsFour = [
  { label: 'Biscuit + email perso.', prix: '110 EUR' },
  { label: 'Biscuit + email atelier', prix: '125 EUR' },
];

const prerequis = [
  'Bonne connaissance de la ceramique',
  'Etre autonome dans un atelier',
  'Savoir cohabiter avec d\'autres personnes',
  'Savoir emailler',
  'Savoir tourner et/ou modeler',
  'Capacite a developper un projet personnel',
];

const AtelierPartageDetails: React.FC = () => {
  return (
    <section className="py-20 px-6 bg-stone-100">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-stone-200">
            <div className="flex items-center mb-6">
              <Calendar className="w-6 h-6 text-primary-400 mr-3" strokeWidth={1.5} />
              <h3 className="text-2xl font-bold text-gray-900">Horaires</h3>
            </div>

            <div className="space-y-3 mb-6">
              {horaires.map((h, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center py-2 border-b border-stone-100 last:border-0"
                >
                  <span className="font-medium text-gray-800 min-w-[100px]">{h.jour}</span>
                  <span className="text-gray-600 text-sm text-right">{h.heures}</span>
                </div>
              ))}
            </div>

            <div className="bg-primary-400/10 rounded-xl p-4">
              <p className="text-gray-700 text-sm italic">
                L'atelier est ouvert de 07h a 23h durant les vacances scolaires.
              </p>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-stone-200">
              <div className="flex items-center mb-6">
                <Flame className="w-6 h-6 text-primary-400 mr-3" strokeWidth={1.5} />
                <h3 className="text-2xl font-bold text-gray-900">Tarifs cuisson</h3>
              </div>

              <p className="text-gray-600 text-sm mb-4">
                Les cuissons sont facturees au poids selon les tarifs ci-dessous :
              </p>

              <div className="space-y-3 mb-6">
                {cuissons.map((c, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center py-2 border-b border-stone-100 last:border-0"
                  >
                    <span className="text-gray-700 text-sm">{c.label}</span>
                    <span className="font-bold text-primary-400 whitespace-nowrap ml-4">{c.prix}</span>
                  </div>
                ))}
              </div>

              <div className="bg-stone-50 rounded-xl p-4">
                <p className="text-sm font-bold text-gray-800 mb-2">Four entier :</p>
                <div className="space-y-1">
                  {cuissonsFour.map((c, i) => (
                    <div key={i} className="flex justify-between">
                      <span className="text-gray-600 text-sm">{c.label}</span>
                      <span className="font-bold text-primary-400 text-sm">{c.prix}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-sm border border-stone-200">
              <div className="flex items-center mb-6">
                <ClipboardCheck className="w-6 h-6 text-primary-400 mr-3" strokeWidth={1.5} />
                <h3 className="text-2xl font-bold text-gray-900">Pre-requis</h3>
              </div>

              <ul className="space-y-3">
                {prerequis.map((p, i) => (
                  <li key={i} className="flex items-start">
                    <span className="w-2 h-2 bg-primary-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-stone-200 inline-block max-w-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Nous contacter</h3>
            <p className="text-gray-600 mb-1">
              <a href="mailto:ventsetcourbes@gmail.com" className="text-primary-400 hover:text-primary-500 transition-colors">
                ventsetcourbes@gmail.com
              </a>
            </p>
            <p className="text-gray-600 mb-1">
              <a href="tel:+33680893927" className="text-primary-400 hover:text-primary-500 transition-colors">
                06.80.89.39.27
              </a>
            </p>
            <p className="text-gray-500 text-sm">33 rue Danton - 93310 Le Pre-Saint-Gervais</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AtelierPartageDetails;
