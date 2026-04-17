'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ArrowLeft } from 'lucide-react';
import { getStageBySlug, getCoursBySlug, Stage, Cours } from '../services/supabaseAdmin';

type ReservationItem = (Stage | Cours) & { itemType: 'stage' | 'cours' };

const Reservation = ({ params }: { params: { courseId: string } }) => {
  const courseId = params.courseId;
  const [item, setItem] = useState<ReservationItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const loadReservationData = async () => {
      if (!courseId) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      setLoading(true);

      const { data: stageData } = await getStageBySlug(courseId);
      if (stageData) {
        setItem({ ...stageData, itemType: 'stage' });
        setLoading(false);
        return;
      }

      const { data: coursData } = await getCoursBySlug(courseId);
      if (coursData) {
        setItem({ ...coursData, itemType: 'cours' });
        setLoading(false);
        return;
      }

      setNotFound(true);
      setLoading(false);
    };

    loadReservationData();
  }, [courseId]);

  useEffect(() => {
    if (item) {
      // Recharger le script Regiondo pour initialiser le widget
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
    }
  }, [item]);

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="flex justify-center items-center py-32">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-400 mx-auto mb-4"></div>
            <p className="text-gray-600">Chargement...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (notFound || !item) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="pt-32 pb-16 px-6 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Page introuvable</h1>
          <div className="space-y-2">
            <Link href="/cours" className="block text-primary-400 hover:text-primary-500">
              Retour aux cours
            </Link>
            <Link href="/stages" className="block text-primary-400 hover:text-primary-500">
              Retour aux stages
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const isStage = item.itemType === 'stage';

  return (
    <div className="min-h-screen">
      <Header />

      <section className="bg-white pt-32 pb-4 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link
              href={isStage ? "/stages" : "/cours"}
              className="inline-flex items-center text-gray-600 hover:text-primary-400 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" strokeWidth={1.5} />
              {isStage ? "Retour aux stages" : "Retour aux cours"}
            </Link>
          </div>

          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-primary-400 mb-4 leading-tight">
              {item.title}
            </h1>
            <div className="flex flex-wrap gap-4 text-gray-700 mb-6">
              <div className="flex items-center gap-2">
                <span className="font-medium">Durée:</span>
                <span>{item.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">Niveau:</span>
                <span>{item.level}</span>
              </div>
              {item.has_cuisson && (
                <div className="flex items-center gap-2">
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                    ✨ Cuisson comprise
                  </span>
                </div>
              )}
            </div>
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              {item.description}
            </p>
            <p className="text-gray-600 italic">
              {item.includes}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-4 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-stone-50 rounded-2xl p-8 md:p-12 text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Réservez votre place
            </h2>
            <p className="text-gray-700 text-lg">
              Choisissez vos dates et réservez directement en ligne
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-4 md:p-6 shadow-lg">
            <div id="regiondo-widget-container" className="min-h-[700px] w-full">
              <product-details-widget widget-id={item.widget_id}></product-details-widget>
            </div>
          </div>

          <div className="mt-8 text-center text-gray-600">
            <p className="mb-2">
              <strong>Besoin d'aide ?</strong> Contactez-nous au{' '}
              <a href="tel:+33680893927" className="text-primary-400 hover:text-primary-500">
                06 80 89 39 27
              </a>
            </p>
            <p>
              ou par email à{' '}
              <a href="mailto:contact@ventsetcourbes.org" className="text-primary-400 hover:text-primary-500">
                contact@ventsetcourbes.org
              </a>
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Reservation;
