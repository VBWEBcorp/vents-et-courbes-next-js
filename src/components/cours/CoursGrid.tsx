'use client';
import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { getAllCours, Cours } from '../../services/supabaseAdmin';

interface CoursGridProps {
  courses?: any[];
  activeFilter?: string;
  onFilterChange?: (filter: string) => void;
}

const CoursGrid: React.FC<CoursGridProps> = ({ activeFilter = 'all', onFilterChange }) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const [cours, setCours] = useState<Cours[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCours();
  }, []);

  const loadCours = async () => {
    setLoading(true);
    const { data, error } = await getAllCours(false);
    if (data) {
      setCours(data);
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

  const filteredCours = cours.filter(course => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'tournage') return course.title.toLowerCase().includes('tournage');
    if (activeFilter === 'modelage') return course.title.toLowerCase().includes('modelage');
    if (activeFilter === 'cuisson') return course.has_cuisson;
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
              Tous les cours
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
            {filteredCours.length} cours
            {activeFilter !== 'all' && (
              <span className="text-green-400 font-medium ml-1">
                - {activeFilter}
              </span>
            )}
          </p>
        </div>

        {/* Grid responsive */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-6 lg:gap-8 cours-grid">
          {filteredCours.map((course, index) => (
            <Link
              href={`/reservation/${course.reservation_slug}`}
              key={course.id}
              className="block bg-white rounded-2xl overflow-hidden shadow-lg card-hover course-item hover:shadow-xl transition-all duration-500"
              style={{
                animationDelay: `${index * 0.1}s`,
                opacity: 0,
                transform: 'translateY(20px)'
              }}
            >
              {/* Header with title and badges */}
              <div className="bg-green-400 text-white p-6 relative bounce-in min-h-[140px] flex flex-col justify-center">
                <h3 className="text-lg lg:text-xl font-medium mb-2 leading-tight">
                  {course.title}
                </h3>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-green-100">{course.duration}</span>
                  <span className="text-green-100">{course.level}</span>
                </div>
              </div>

              {/* Image */}
              <div className="h-48 lg:h-56 overflow-hidden image-zoom relative">
                <img
                  src={course.image_url}
                  alt={course.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />

                {/* Badge cuisson comprise */}
                {course.has_cuisson && (
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
                  {course.description}
                </p>

                {/* Includes */}
                <p className="text-gray-600 text-sm italic mb-6 leading-relaxed">
                  {course.includes}
                </p>

                {/* Price section */}
                <div className="mb-4">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-green-400 text-xl font-medium">Prix</span>
                    <span className="text-green-400 text-2xl lg:text-3xl font-bold ml-auto">
                      {course.price}
                    </span>
                    {course.additional_price && (
                      <span className="text-green-400 text-lg">{course.additional_price}</span>
                    )}
                  </div>

                  <div className="text-gray-600 text-sm leading-relaxed">
                    {course.additional_text.split('\n').map((line: string, i: number) => (
                      <div key={i}>{line}</div>
                    ))}
                  </div>
                </div>

                {/* OPCO */}
                {course.opco && (
                  <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                    {course.opco}
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

export default CoursGrid;
