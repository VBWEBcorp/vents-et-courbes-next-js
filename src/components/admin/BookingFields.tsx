'use client';
import React from 'react';
import { CalendarClock, GraduationCap } from 'lucide-react';
import SessionsEditor from './SessionsEditor';
import type { Stage, Cours } from '../../services/supabaseAdmin';

const RING: Record<string, string> = {
  green: 'focus:ring-green-400',
  orange: 'focus:ring-orange-400',
  primary: 'focus:ring-primary-400',
};

type Bookable = Partial<Stage & Cours>;

interface BookingFieldsProps {
  formData: Bookable;
  setFormData: (data: Bookable) => void;
  accent?: 'green' | 'orange' | 'primary';
}

/**
 * Champs de réservation (MonClub) + financement (CPF), partagés entre les
 * formulaires Stages et Cours. Le « vrai » widget de réservation du site est
 * le lien MonClub + ses sessions — c'est ce qui est édité ici.
 */
const BookingFields: React.FC<BookingFieldsProps> = ({
  formData,
  setFormData,
  accent = 'green',
}) => {
  const ring = RING[accent] || RING.green;
  const inputCls = `w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 ${ring} focus:border-transparent`;

  return (
    <div className="space-y-6">
      {/* --- Réservation MonClub --- */}
      <div className="border border-gray-200 rounded-2xl p-5 space-y-5">
        <div className="flex items-center space-x-2">
          <CalendarClock className="w-5 h-5 text-gray-500" strokeWidth={1.5} />
          <h3 className="text-base font-semibold text-gray-900">
            Réservation (widget MonClub)
          </h3>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Lien MonClub de l'activité
          </label>
          <input
            type="url"
            value={formData.monclub_url || ''}
            onChange={(e) => setFormData({ ...formData, monclub_url: e.target.value })}
            className={inputCls}
            placeholder="https://ventsetcourbes.monclub.app/app/xxxxxxxxxxxx"
          />
          <p className="text-xs text-gray-500 mt-1">
            Lien de la page d'activité MonClub. Les boutons « Réserver »
            pointent dessus (avec la formule choisie).
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Identifiants de formule par défaut (optionnel)
          </label>
          <input
            type="text"
            value={(formData.monclub_ids || []).join(', ')}
            onChange={(e) =>
              setFormData({
                ...formData,
                monclub_ids: e.target.value
                  .split(',')
                  .map((s) => s.trim())
                  .filter(Boolean),
              })
            }
            className={inputCls}
            placeholder="Ex: 6a282b216f8580f2eee435be"
          />
          <p className="text-xs text-gray-500 mt-1">
            Séparés par des virgules. Utilisé pour le bouton unique quand il
            n'y a aucune session ci-dessous.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sessions / créneaux réservables
          </label>
          <SessionsEditor
            value={formData.sessions || []}
            onChange={(sessions) => setFormData({ ...formData, sessions })}
            accent={accent}
          />
        </div>
      </div>

      {/* --- Financement CPF --- */}
      <div className="border border-gray-200 rounded-2xl p-5 space-y-3">
        <div className="flex items-center space-x-2">
          <GraduationCap className="w-5 h-5 text-gray-500" strokeWidth={1.5} />
          <h3 className="text-base font-semibold text-gray-900">
            Financement CPF
          </h3>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Lien Mon Compte Formation
          </label>
          <input
            type="url"
            value={formData.cpf_link || ''}
            onChange={(e) => setFormData({ ...formData, cpf_link: e.target.value })}
            className={inputCls}
            placeholder="https://www.moncompteformation.gouv.fr/espace-prive/html/#/formation/recherche/..."
          />
          <p className="text-xs text-gray-500 mt-1">
            Laissez vide si la formation n'est pas éligible au CPF. Si rempli,
            le bouton « Réserver via mon CPF » apparaît sur la carte.
          </p>
        </div>
      </div>

      {/* --- Ancien widget (hérité) --- */}
      <details className="border border-gray-200 rounded-2xl p-5">
        <summary className="text-sm font-medium text-gray-500 cursor-pointer">
          Champ avancé — Widget ID Regiondo (hérité, généralement inutile)
        </summary>
        <div className="mt-4">
          <input
            type="text"
            value={formData.widget_id || ''}
            onChange={(e) => setFormData({ ...formData, widget_id: e.target.value })}
            className={inputCls}
            placeholder="Ex: def0899d-1433-4bf7-8d47-b3049e431631"
          />
          <p className="text-xs text-gray-500 mt-1">
            Ancien système de réservation Regiondo. Non utilisé par le site
            actuel (la réservation passe par MonClub).
          </p>
        </div>
      </details>
    </div>
  );
};

export default BookingFields;
