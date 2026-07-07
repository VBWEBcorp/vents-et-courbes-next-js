'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ArrowLeft } from 'lucide-react';
import { getStageBySlug, getCoursBySlug, Stage, Cours } from '../services/supabaseAdmin';
import { isEligibleCPF, getCPFLink } from '../lib/cpf';
import CPFBanner from '../components/CPFBanner';

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
  const monclubUrl = item.monclub_url || 'https://ventsetcourbes.monclub.app';
  // MonClub deep-linke une formule precise via ?selectedMembership=<formuleId>&step=3.
  // step=3 amene directement a l'etape de reservation (choix des creneaux) plutot
  // qu'a l'etape 1 (presentation de la formule).
  // On ne l'ajoute que sur une URL d'activite (/app/<id>) et si la formule est connue,
  // sinon on retombe sur le lien d'activite (choix de la formule cote MonClub).
  const bookingUrl = (formuleId?: string) => {
    if (!formuleId || !monclubUrl.includes('/app/')) return monclubUrl;
    const sep = monclubUrl.includes('?') ? '&' : '?';
    return `${monclubUrl}${sep}selectedMembership=${formuleId}&step=3`;
  };
  const sessions = item.sessions || [];
  const clean = (s: string) => (s || '').replace(/\s+/g, ' ').trim();

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

          {item.image_url && (
            <div className="mb-8 rounded-3xl overflow-hidden shadow-lg">
              <img
                src={item.image_url}
                alt={item.title}
                className="w-full h-64 md:h-96 object-cover"
                loading="lazy"
              />
            </div>
          )}

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
            {isEligibleCPF(item.reservation_slug) && (
              <div className="mb-6">
                <CPFBanner href={getCPFLink(item.reservation_slug)!} />
              </div>
            )}
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              {item.description}
            </p>
            <p className="text-gray-600 italic mb-6">
              {item.includes}
            </p>

            {/* Prix */}
            <div className="border-t border-gray-200 pt-6">
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-primary-400 text-xl font-medium">Prix</span>
                <span className="text-primary-400 text-3xl font-bold ml-auto">
                  {item.price}
                </span>
                {item.additional_price && (
                  <span className="text-primary-400 text-lg">{item.additional_price}</span>
                )}
              </div>
              {item.additional_text && (
                <div className="text-gray-600 text-sm leading-relaxed">
                  {item.additional_text.split('\n').map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}
                </div>
              )}
              {item.opco && (
                <p className="text-gray-600 text-sm mt-2 leading-relaxed">
                  {item.opco}
                </p>
              )}
            </div>
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

          {sessions.length > 0 && (
            <div className="space-y-4 mb-8">
              {sessions.map((s) => (
                <div
                  key={s.monclub_id}
                  className="bg-white border border-gray-200 rounded-2xl p-5 md:p-6 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                >
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 mb-1">{clean(s.label)}</h3>
                    <ul className="text-sm text-gray-600 space-y-0.5">
                      {s.creneaux.map((c, i) => (
                        <li key={i}>{clean(c.label)}</li>
                      ))}
                    </ul>
                    {s.lieu && (
                      <p className="text-xs text-gray-500 mt-2">📍 {s.lieu}</p>
                    )}
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-primary-400 font-bold text-2xl mb-2">
                      {s.price}€
                    </div>
                    <a
                      href={bookingUrl(s.monclub_id)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-primary-400 hover:bg-primary-500 text-white px-6 py-2.5 rounded-full font-medium transition-colors"
                    >
                      Réserver
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}

          {sessions.length === 0 && (
            <div className="text-center mb-4">
              <a
                href={bookingUrl(item.monclub_ids?.[0])}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-primary-400 hover:bg-primary-500 text-white px-8 py-3.5 rounded-full font-medium text-lg transition-colors shadow-lg"
              >
                Réserver sur MonClub
              </a>
            </div>
          )}

          <p className="text-center text-gray-500 text-sm mb-4">
            Inscription et paiement sécurisés sur notre espace MonClub
          </p>

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
