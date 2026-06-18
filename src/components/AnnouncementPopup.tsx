'use client';
import React, { useState, useEffect } from 'react';
import { X, Sparkles } from 'lucide-react';
import { useIsAdminPage } from '../hooks/useIsAdminPage';

const STORAGE_KEY = 'flyer-prix-2026-2027-seen';
const FLYER_PDF = '/affiche-saison-2026-2027.pdf';

const AnnouncementPopup = () => {
  const isAdminPage = useIsAdminPage();
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  // Le viewer PDF est lourd : on ne le monte qu'apres l'animation d'ouverture
  // (~0.6s) pour que le popup s'ouvre sans a-coup.
  const [flyerReady, setFlyerReady] = useState(false);

  useEffect(() => {
    if (isAdminPage) return;
    if (sessionStorage.getItem(STORAGE_KEY)) return;

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2800);

    return () => clearTimeout(timer);
  }, [isAdminPage]);

  useEffect(() => {
    if (!isVisible) return;
    const timer = setTimeout(() => setFlyerReady(true), 650);
    return () => clearTimeout(timer);
  }, [isVisible]);

  const handleClose = () => {
    setIsClosing(true);
    sessionStorage.setItem(STORAGE_KEY, '1');
    setTimeout(() => setIsVisible(false), 300);
  };

  if (isAdminPage || !isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9998] flex items-center justify-center px-4 ${
        isClosing ? 'announcement-exit' : 'announcement-enter'
      }`}
      onClick={handleClose}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden ${
          isClosing ? 'announcement-card-exit' : 'announcement-card-enter'
        }`}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-gray-700 hover:text-primary-400 flex items-center justify-center shadow-md transition-all hover:scale-110"
          aria-label="Fermer"
        >
          <X className="w-5 h-5" strokeWidth={2} />
        </button>

        <div className="bg-gradient-to-r from-primary-500 to-primary-400 text-white px-8 py-6 text-center">
          <div className="inline-flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5" strokeWidth={2} />
            <span className="text-sm font-medium tracking-wider uppercase">
              Annonce
            </span>
            <Sparkles className="w-5 h-5" strokeWidth={2} />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold">
            Rentrée 2026 / 2027
          </h2>
        </div>

        <div className="px-6 md:px-10 py-6 md:py-8 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 200px)' }}>
          {/* Flyer de prix saison 2026-2027 */}
          <a
            href={FLYER_PDF}
            target="_blank"
            rel="noopener noreferrer"
            className="block mb-6 rounded-xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-md transition-shadow"
            aria-label="Ouvrir le programme et les tarifs 2026-2027 (PDF)"
          >
            {flyerReady ? (
              <object
                data={`${FLYER_PDF}#view=FitH&toolbar=0&navpanes=0`}
                type="application/pdf"
                className="w-full h-[420px] pointer-events-none bg-stone-50"
              >
                <div className="p-8 text-center text-gray-600">
                  Cliquez pour ouvrir le programme et les tarifs 2026-2027 (PDF)
                </div>
              </object>
            ) : (
              <div className="w-full h-[420px] bg-stone-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-400" />
              </div>
            )}
            <div className="bg-primary-400 text-white text-center py-2.5 text-sm font-medium">
              Cliquez pour agrandir le programme &amp; les tarifs 2026-2027
            </div>
          </a>

          <p className="text-gray-700 leading-relaxed mb-4">
            Bonjour à toutes et à tous !
          </p>

          <p className="text-gray-700 leading-relaxed mb-4">
            En vue de la prochaine rentrée 2026 / 2027, nous serons heureux de vous proposer de nombreux{' '}
            <strong className="text-primary-500">stages de perfectionnement et d'initiation en tournage</strong>{' '}
            (1 fois par mois) mais aussi, <strong>nouveauté !</strong>{' '}
            deux <strong className="text-primary-500">stages de modelage tous niveaux</strong>{' '}
            proposés par Florence Volang.
          </p>

          <p className="text-gray-700 leading-relaxed mb-4">
            Les plages de cours resteront inchangées, avec un{' '}
            <strong>cours de modelage supplémentaire le lundi soir de 18h30 à 21h30</strong>.
          </p>

          <p className="text-gray-700 leading-relaxed mb-4">
            N'oublions pas nos rendez-vous annuels :
          </p>

          <ul className="text-gray-700 leading-relaxed mb-4 space-y-2 pl-4">
            <li>
              <strong className="text-primary-500">Vincent Lévy</strong> — impression d'images sur céramique
            </li>
            <li>
              <strong className="text-primary-500">Maria Bosch</strong> — venue spécialement de Catalogne pour 3 sessions sur la recherche d'engobes vitrifiées
            </li>
            <li>
              <strong className="text-primary-500">Sylvie Barbara</strong> — recherche des émaux haute température
            </li>
          </ul>

          <p className="text-gray-700 leading-relaxed mb-4">
            Les dates et possibilités de réservation sur notre site web seront bientôt mises en ligne !
          </p>

          <p className="text-gray-700 leading-relaxed mb-6">
            En tant qu'organisme de formation certifié, vous avez la possibilité de souscrire à nos formations courtes avec le{' '}
            <strong className="text-primary-500">CPF</strong>, voir tous les renseignements sur notre site web.
          </p>

          <p className="text-gray-700 leading-relaxed italic">
            Bonne céramique et à très bientôt !<br />
            <span className="font-medium not-italic">— Philippe Paumier</span>
          </p>
        </div>

        <div className="bg-stone-50 px-6 py-4 border-t border-gray-100 flex justify-end">
          <button
            onClick={handleClose}
            className="bg-primary-400 hover:bg-primary-500 text-white px-6 py-2.5 rounded-full font-medium btn-animate"
          >
            J'ai compris
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementPopup;
