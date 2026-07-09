'use client';
import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import type { MonclubSession } from '../../services/supabaseAdmin';

// Classes Tailwind littérales (pour ne pas être purgées par le JIT)
const RING: Record<string, string> = {
  green: 'focus:ring-green-400',
  orange: 'focus:ring-orange-400',
  primary: 'focus:ring-primary-400',
};

interface SessionsEditorProps {
  value: MonclubSession[];
  onChange: (sessions: MonclubSession[]) => void;
  accent?: 'green' | 'orange' | 'primary';
}

const emptySession = (): MonclubSession => ({
  monclub_id: '',
  label: '',
  price: '',
  date_debut: '',
  date_fin: '',
  lieu: '',
  creneaux: [],
});

const SessionsEditor: React.FC<SessionsEditorProps> = ({
  value,
  onChange,
  accent = 'green',
}) => {
  const ring = RING[accent] || RING.green;
  const inputCls = `w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 ${ring} focus:border-transparent`;
  const sessions = value || [];

  const update = (i: number, patch: Partial<MonclubSession>) => {
    const next = sessions.map((s, idx) => (idx === i ? { ...s, ...patch } : s));
    onChange(next);
  };

  const remove = (i: number) => onChange(sessions.filter((_, idx) => idx !== i));
  const add = () => onChange([...sessions, emptySession()]);

  return (
    <div className="space-y-4">
      {sessions.length === 0 && (
        <p className="text-sm text-gray-500 italic">
          Aucune session. Si aucune session n'est ajoutée, un simple bouton
          « Réserver sur MonClub » est affiché.
        </p>
      )}

      {sessions.map((s, i) => (
        <div
          key={i}
          className="border border-gray-200 rounded-xl p-4 bg-gray-50 space-y-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Session {i + 1}
            </span>
            <button
              type="button"
              onClick={() => remove(i)}
              className="p-1.5 rounded-lg hover:bg-red-100 transition-colors"
              title="Supprimer cette session"
            >
              <Trash2 className="w-4 h-4 text-red-500" strokeWidth={1.5} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Intitulé de la session
              </label>
              <input
                type="text"
                value={s.label}
                onChange={(e) => update(i, { label: e.target.value })}
                className={inputCls}
                placeholder="Ex: Session de mars 2026"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Prix (sans le €)
              </label>
              <input
                type="text"
                value={s.price}
                onChange={(e) => update(i, { price: e.target.value })}
                className={inputCls}
                placeholder="Ex: 470"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Identifiant MonClub (formule)
              </label>
              <input
                type="text"
                value={s.monclub_id}
                onChange={(e) => update(i, { monclub_id: e.target.value })}
                className={inputCls}
                placeholder="Ex: 6a282b216f8580f2eee435be"
              />
              <p className="text-[11px] text-gray-400 mt-1">
                Ajouté au lien MonClub (&selectedMembership=…) pour aller
                directement à la réservation.
              </p>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Lieu (optionnel)
              </label>
              <input
                type="text"
                value={s.lieu || ''}
                onChange={(e) => update(i, { lieu: e.target.value })}
                className={inputCls}
                placeholder="Ex: Atelier, 33 rue Danton"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Créneaux / dates (un par ligne)
            </label>
            <textarea
              value={(s.creneaux || []).map((c) => c.label).join('\n')}
              onChange={(e) =>
                update(i, {
                  creneaux: e.target.value
                    .split('\n')
                    .map((line) => line.trim())
                    .filter(Boolean)
                    .map((label) => ({
                      label,
                      date: '',
                      start: '',
                      end: '',
                      places: null,
                    })),
                })
              }
              rows={3}
              className={inputCls}
              placeholder={'Ex:\nSamedi 7 mars — 10h à 17h\nDimanche 8 mars — 10h à 17h'}
            />
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={add}
        className="inline-flex items-center space-x-2 px-4 py-2 bg-white hover:bg-gray-100 text-gray-700 rounded-lg border border-gray-300 transition-colors text-sm"
      >
        <Plus className="w-4 h-4" strokeWidth={2} />
        <span>Ajouter une session</span>
      </button>
    </div>
  );
};

export default SessionsEditor;
