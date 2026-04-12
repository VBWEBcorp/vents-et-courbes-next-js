import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllStages, Stage } from '../../services/supabaseAdmin';

interface StagesGridProps {
  activeFilter?: string;
  onFilterChange?: (filter: string) => void;
}

const StagesGrid: React.FC<StagesGridProps> = ({ activeFilter = 'all', onFilterChange }) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const [stages, setStages] = useState<Stage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStages();
  }, []);

  const loadStages = async () => {
    setLoading(true);
    const { data, error } = await getAllStages(false);
    if (data) {
      setStages(data);
    }
    setLoading(false);
  };

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

  const filteredStages = stages.filter(stage => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'tournage') return stage.title.toLowerCase().includes('tournage') || stage.title.toLowerCase().includes('duo de bols');
    if (activeFilter === 'modelage') return stage.title.toLowerCase().includes('modelage') || stage.title.toLowerCase().includes('carafe');
    if (activeFilter === 'decors') return stage.title.toLowerCase().includes('émail') || stage.title.toLowerCase().includes('impressions') || stage.title.toLowerCase().includes('engobe');
    if (activeFilter === 'cuisson') return stage.has_cuisson;
    return true;
  });

  if (loading) {
    return (
      <section className="bg-white py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-400"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-16 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto" ref={gridRef}>
        {/* Filter Buttons */}
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

        {/* Grid responsive */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-6 lg:gap-8 stages-grid">
          {filteredStages.map((stage, index) => (
            <Link
              to={`/reservation/${stage.reservation_slug}`}
              key={stage.id}
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
                  src={stage.image_url}
                  alt={stage.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />

                {/* Badge cuisson comprise */}
                {stage.has_cuisson && (
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
                    {stage.additional_price && (
                      <span className="text-green-400 text-lg">{stage.additional_price}</span>
                    )}
                  </div>

                  <div className="text-gray-600 text-sm leading-relaxed">
                    {stage.additional_text.split('\n').map((line, i) => (
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
