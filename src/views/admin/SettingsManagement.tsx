'use client';
import React, { useState, useEffect } from 'react';
import { Save, Check, AlertCircle } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import {
  getSiteSettings,
  updateSiteSettings,
  SiteSettings,
} from '../../services/supabaseAdmin';
import { DEFAULT_SETTINGS } from '../../lib/siteSettings';

const DAYS = [
  'lundi',
  'mardi',
  'mercredi',
  'jeudi',
  'vendredi',
  'samedi',
  'dimanche',
];

const inputCls =
  'w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-400 focus:border-transparent';

const SettingsManagement = () => {
  const [form, setForm] = useState<SiteSettings>(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data } = await getSiteSettings();
      if (data) {
        setForm({
          ...DEFAULT_SETTINGS,
          ...data,
          hours:
            data.hours && Object.keys(data.hours).length
              ? data.hours
              : DEFAULT_SETTINGS.hours,
        });
      }
      setLoading(false);
    })();
  }, []);

  const set = (patch: Partial<SiteSettings>) => setForm({ ...form, ...patch });

  const setHours = (day: string, value: string) => {
    const slots = value
      .split('/')
      .map((s) => s.trim())
      .filter(Boolean);
    setForm({
      ...form,
      hours: { ...form.hours, [day]: slots.length ? slots : ['Fermé'] },
    });
  };

  const handleSave = async () => {
    setError('');
    setSuccess('');
    setSaving(true);
    try {
      const { error: saveError } = await updateSiteSettings(form);
      if (saveError) throw saveError;
      setSuccess('Réglages enregistrés avec succès');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(err.message || 'Erreur lors de l\'enregistrement');
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout
      title="Réglages du site"
      subtitle="Coordonnées, horaires et informations affichées sur le site"
    >
      {success && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-xl p-4 flex items-center space-x-3">
          <Check className="w-5 h-5 text-green-600" strokeWidth={2} />
          <p className="text-green-800">{success}</p>
        </div>
      )}
      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 flex items-center space-x-3">
          <AlertCircle className="w-5 h-5 text-red-600" strokeWidth={2} />
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-400"></div>
        </div>
      ) : (
        <div className="max-w-3xl space-y-8">
          {/* Coordonnées */}
          <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-5">
            <h2 className="text-lg font-semibold text-gray-900">Coordonnées</h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nom de l'établissement
              </label>
              <input
                type="text"
                value={form.business_name}
                onChange={(e) => set({ business_name: e.target.value })}
                className={inputCls}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Adresse
                </label>
                <input
                  type="text"
                  value={form.address}
                  onChange={(e) => set({ address: e.target.value })}
                  className={inputCls}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Code postal
                </label>
                <input
                  type="text"
                  value={form.postal_code}
                  onChange={(e) => set({ postal_code: e.target.value })}
                  className={inputCls}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ville
                </label>
                <input
                  type="text"
                  value={form.city}
                  onChange={(e) => set({ city: e.target.value })}
                  className={inputCls}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pays
                </label>
                <input
                  type="text"
                  value={form.country}
                  onChange={(e) => set({ country: e.target.value })}
                  className={inputCls}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Téléphone (lien tel:)
                </label>
                <input
                  type="text"
                  value={form.phone}
                  onChange={(e) => set({ phone: e.target.value })}
                  className={inputCls}
                  placeholder="+33 6 80 89 39 27"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Téléphone (affiché)
                </label>
                <input
                  type="text"
                  value={form.phone_display}
                  onChange={(e) => set({ phone_display: e.target.value })}
                  className={inputCls}
                  placeholder="06 80 89 39 27"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => set({ email: e.target.value })}
                className={inputCls}
              />
            </div>
          </section>

          {/* Horaires */}
          <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-5">
            <h2 className="text-lg font-semibold text-gray-900">
              Horaires d'ouverture
            </h2>
            <p className="text-sm text-gray-500">
              Séparez plusieurs créneaux d'une même journée par une barre
              oblique « / ». Ex : <em>14h – 17h / 19h – 22h</em>. Tapez{' '}
              <em>Fermé</em> pour un jour de fermeture.
            </p>
            <div className="space-y-3">
              {DAYS.map((day) => (
                <div key={day} className="flex items-center gap-4">
                  <span className="capitalize font-medium text-gray-700 w-28 flex-shrink-0">
                    {day}
                  </span>
                  <input
                    type="text"
                    value={(form.hours[day] || []).join(' / ')}
                    onChange={(e) => setHours(day, e.target.value)}
                    className={inputCls}
                    placeholder="Ex: 14h – 17h / 19h – 22h ou Fermé"
                  />
                </div>
              ))}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Note sous les horaires
              </label>
              <input
                type="text"
                value={form.hours_note}
                onChange={(e) => set({ hours_note: e.target.value })}
                className={inputCls}
                placeholder="Ex: Atelier fermé pendant les vacances scolaires"
              />
            </div>
          </section>

          {/* Avis (SEO) */}
          <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-5">
            <h2 className="text-lg font-semibold text-gray-900">
              Note d'avis (données structurées SEO)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Note moyenne (sur 5)
                </label>
                <input
                  type="text"
                  value={form.rating_value || ''}
                  onChange={(e) => set({ rating_value: e.target.value })}
                  className={inputCls}
                  placeholder="4.9"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre d'avis
                </label>
                <input
                  type="text"
                  value={form.rating_count || ''}
                  onChange={(e) => set({ rating_count: e.target.value })}
                  className={inputCls}
                  placeholder="938"
                />
              </div>
            </div>
          </section>

          <div className="flex justify-end">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center space-x-2 px-6 py-3 bg-green-400 hover:bg-green-500 text-white rounded-xl transition-colors disabled:opacity-50"
            >
              <Save className="w-5 h-5" strokeWidth={2} />
              <span>{saving ? 'Enregistrement...' : 'Enregistrer'}</span>
            </button>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default SettingsManagement;
