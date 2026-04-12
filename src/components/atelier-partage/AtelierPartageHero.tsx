import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, Box, Layers, Wrench, Palette, Download } from 'lucide-react';

const equipment = [
  { icon: Layers, label: '8 tours' },
  { icon: Box, label: 'Espaces de stockage' },
  { icon: Wrench, label: 'Table de petrissage' },
  { icon: Wrench, label: 'Petit outillage' },
  { icon: Palette, label: 'Emaillage compris' },
];

const AtelierPartageHero: React.FC = () => {
  return (
    <section className="bg-stone-100 pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center text-gray-600 hover:text-primary-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" strokeWidth={1.5} />
            Accueil
          </Link>
        </div>

        <div className="mb-12">
          <h1 className="text-3xl md:text-6xl lg:text-7xl font-bold text-primary-400 mb-6 leading-tight slide-up">
            Atelier Partage Ceramique
          </h1>
          <div className="flex items-center text-gray-600 mb-2 fade-in-delay">
            <MapPin className="w-4 h-4 mr-2 flex-shrink-0" strokeWidth={1.5} />
            <span>33 rue Danton, 93310 Le Pre-Saint-Gervais</span>
          </div>
          <div className="flex items-center text-gray-600 fade-in-delay">
            <Clock className="w-4 h-4 mr-2 flex-shrink-0" strokeWidth={1.5} />
            <span>Acces libre tous les jours de 07h00 a 23h00</span>
          </div>
        </div>

        <div className="mb-12 fade-in-delay-2">
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            Profitez de notre atelier equipe pour creer en toute liberte avec nos 3 formules !
            Disponible au mois ou a l'annee, l'espace de 100 m² comprend :
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
            {equipment.map((item, i) => (
              <div
                key={i}
                className="flex items-center bg-white rounded-xl px-4 py-3 shadow-sm border border-stone-200"
              >
                <item.icon className="w-5 h-5 text-primary-400 mr-3 flex-shrink-0" strokeWidth={1.5} />
                <span className="text-gray-800">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-primary-400/10 border border-primary-400/20 rounded-2xl p-6 mb-8">
          <p className="text-gray-800 font-bold mb-2">
            Seul le gres est autorise
          </p>
          <p className="text-gray-600 text-sm">
            GSAT40 disponible a 10 EUR/10 kg. La cuisson des pieces n'est pas incluse.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200 mb-8">
          <h3 className="text-lg font-bold text-gray-900 mb-3">Prix</h3>
          <div className="space-y-2 text-gray-700 mb-4">
            <p>Illimite : <span className="font-bold text-primary-400">300 EUR / mois</span></p>
            <p>32 heures : <span className="font-bold text-primary-400">200 EUR / mois</span></p>
            <p>16 heures : <span className="font-bold text-primary-400">100 EUR / mois</span></p>
          </div>
          <p className="text-gray-600 text-sm italic">
            Pour un engagement de 10 a 12 mois, un stage vous est offert (voir detail).
          </p>
          <p className="text-gray-600 text-sm italic">
            1 cheque de caution de 200 EUR est a prevoir.
          </p>
        </div>

        <a
          href="/RESIDENCE_CERAMIQUE_compressed_(1).pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center bg-gray-800 hover:bg-gray-900 text-white px-8 py-3 rounded-full text-lg transition-colors btn-animate"
        >
          <Download className="w-5 h-5 mr-2" strokeWidth={1.5} />
          Telecharger la brochure PDF
        </a>
      </div>
    </section>
  );
};

export default AtelierPartageHero;
