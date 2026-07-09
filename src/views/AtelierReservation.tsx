'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ArrowLeft, Gift } from 'lucide-react';
import {
  AtelierFormuleDoc,
  getAtelierFormuleBySlugApi,
} from '../services/supabaseAdmin';
import { ATELIER_MONCLUB_URL } from '../lib/ateliers';

interface AtelierReservationProps {
  slug: string;
  initialFormule: AtelierFormuleDoc;
}

const AtelierReservation: React.FC<AtelierReservationProps> = ({
  slug,
  initialFormule,
}) => {
  // Snapshot build pour le SEO/1er rendu, puis mise à jour live depuis la base.
  const [formule, setFormule] = useState<AtelierFormuleDoc>(initialFormule);

  useEffect(() => {
    let mounted = true;
    getAtelierFormuleBySlugApi(slug).then(({ data }) => {
      if (mounted && data) setFormule(data);
    });
    return () => {
      mounted = false;
    };
  }, [slug]);

  const monclubUrl = formule.monclub_url || ATELIER_MONCLUB_URL;
  const bookingHref =
    formule.monclub_id && monclubUrl.includes('/app/')
      ? `${monclubUrl}${monclubUrl.includes('?') ? '&' : '?'}selectedMembership=${formule.monclub_id}&step=3`
      : monclubUrl;

  return (
    <div className="min-h-screen">
      <Header />

      <section className="bg-white pt-32 pb-4 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link
              href="/atelier-partage"
              className="inline-flex items-center text-gray-600 hover:text-primary-400 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" strokeWidth={1.5} />
              Retour à l'atelier partagé
            </Link>
          </div>

          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-primary-400 mb-4 leading-tight">
              {formule.title}
            </h1>
            <div className="flex flex-wrap gap-4 text-gray-700 mb-6">
              <div className="flex items-center gap-2">
                <span className="font-medium">Accès :</span>
                <span>{formule.subtitle}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">Tarif :</span>
                <span>{formule.price} € / mois</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                  Émaillage compris
                </span>
              </div>
            </div>

            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              {formule.description}
            </p>
            <p className="text-gray-600 italic mb-6">
              {formule.includes}
            </p>

            {formule.engagement_bonus && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-start gap-3">
                <Gift className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                <div>
                  <p className="text-gray-800 font-medium">
                    Avec engagement 10 à 12 mois : {formule.engagement_bonus}
                  </p>
                  {formule.bonus_value && (
                    <p className="text-gray-600 text-sm">
                      (d'une valeur de {formule.bonus_value} €)
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="bg-white py-4 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-stone-50 rounded-2xl p-8 md:p-12 text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Réservez votre résidence
            </h2>
            <p className="text-gray-700 text-lg">
              Choisissez votre formule et réservez directement en ligne
            </p>
          </div>

          <div className="text-center mb-4">
            <a
              href={bookingHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-primary-400 hover:bg-primary-500 text-white px-8 py-3.5 rounded-full font-medium text-lg transition-colors shadow-lg"
            >
              Réserver sur MonClub
            </a>
            <p className="text-gray-500 text-sm mt-3">
              Inscription et paiement sécurisés sur notre espace MonClub
            </p>
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

export default AtelierReservation;
