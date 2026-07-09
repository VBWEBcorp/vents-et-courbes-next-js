'use client';
import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, X, Save, AlertCircle, Check, Download } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import {
  getAllAtelierFormules,
  createAtelierFormule,
  updateAtelierFormule,
  deleteAtelierFormule,
  AtelierFormuleDoc,
} from '../../services/supabaseAdmin';
import { hardcodedAtelierDocs } from '../../lib/ateliers';

const inputCls =
  'w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent';

const emptyForm = (order = 0): Partial<AtelierFormuleDoc> => ({
  slug: '',
  name: '',
  title: '',
  subtitle: '',
  price: '',
  engagement_bonus: '',
  bonus_value: '',
  monclub_url: '',
  monclub_id: '',
  description: '',
  includes: '',
  seo_title: '',
  seo_description: '',
  popular: false,
  order_index: order,
  active: true,
});

const AtelierPartageManagement = () => {
  const [formules, setFormules] = useState<AtelierFormuleDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<AtelierFormuleDoc | null>(null);
  const [formData, setFormData] = useState<Partial<AtelierFormuleDoc>>(emptyForm());
  const [saving, setSaving] = useState(false);
  const [seeding, setSeeding] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    setLoading(true);
    const { data, error } = await getAllAtelierFormules(true);
    if (data) setFormules(data);
    if (error) setError('Erreur lors du chargement des formules');
    setLoading(false);
  };

  const handleAdd = () => {
    setEditing(null);
    setFormData(emptyForm(formules.length));
    setShowModal(true);
  };

  const handleEdit = (f: AtelierFormuleDoc) => {
    setEditing(f);
    setFormData(f);
    setShowModal(true);
  };

  const handleSave = async () => {
    setError('');
    setSuccess('');
    setSaving(true);
    try {
      if (editing) {
        const { error } = await updateAtelierFormule(editing.id!, formData);
        if (error) throw error;
        setSuccess('Formule modifiée avec succès');
      } else {
        const { error } = await createAtelierFormule(
          formData as Omit<AtelierFormuleDoc, 'id' | 'created_at' | 'updated_at'>,
        );
        if (error) throw error;
        setSuccess('Formule créée avec succès');
      }
      setShowModal(false);
      await load();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (deleteConfirm !== id) {
      setDeleteConfirm(id);
      return;
    }
    const { error } = await deleteAtelierFormule(id);
    if (!error) {
      setSuccess('Formule supprimée');
      await load();
      setTimeout(() => setSuccess(''), 3000);
    } else {
      setError('Erreur lors de la suppression');
    }
    setDeleteConfirm(null);
  };

  const handleSeed = async () => {
    setSeeding(true);
    setError('');
    try {
      for (const doc of hardcodedAtelierDocs()) {
        await createAtelierFormule(doc);
      }
      setSuccess('Formules par défaut importées');
      await load();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(err.message || 'Erreur lors de l\'import');
    } finally {
      setSeeding(false);
    }
  };

  return (
    <AdminLayout
      title="Atelier partagé"
      subtitle={`${formules.length} formule(s)`}
    >
      <div className="mb-6 flex justify-end gap-3">
        {formules.length === 0 && !loading && (
          <button
            onClick={handleSeed}
            disabled={seeding}
            className="flex items-center space-x-2 px-4 py-2 bg-white hover:bg-gray-100 text-gray-700 rounded-lg border border-gray-300 transition-colors disabled:opacity-50"
          >
            <Download className="w-5 h-5" strokeWidth={2} />
            <span>{seeding ? 'Import...' : 'Importer les 3 formules par défaut'}</span>
          </button>
        )}
        <button
          onClick={handleAdd}
          className="flex items-center space-x-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors"
        >
          <Plus className="w-5 h-5" strokeWidth={2} />
          <span className="font-medium">Ajouter une formule</span>
        </button>
      </div>

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
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400"></div>
        </div>
      ) : formules.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center">
          <p className="text-gray-600 mb-4">Aucune formule pour le moment</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {formules.map((f) => (
            <div
              key={f.id}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-start justify-between"
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-semibold text-gray-900">{f.title}</h3>
                  {f.popular && (
                    <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs rounded-full">
                      Populaire
                    </span>
                  )}
                  {!f.active && (
                    <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">
                      Inactif
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600">
                  {f.subtitle} • <span className="font-semibold text-purple-600">{f.price} €/mois</span>
                </p>
                <p className="text-xs text-gray-400 mt-1">/{f.slug}</p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleEdit(f)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Edit className="w-5 h-5 text-gray-600" strokeWidth={1.5} />
                </button>
                <button
                  onClick={() => handleDelete(f.id!)}
                  className={`p-2 rounded-lg transition-colors ${
                    deleteConfirm === f.id ? 'bg-red-100 hover:bg-red-200' : 'hover:bg-gray-100'
                  }`}
                >
                  <Trash2
                    className={`w-5 h-5 ${deleteConfirm === f.id ? 'text-red-600' : 'text-gray-600'}`}
                    strokeWidth={1.5}
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 rounded-t-3xl flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-gray-900">
                {editing ? 'Modifier la formule' : 'Ajouter une formule'}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" strokeWidth={1.5} />
              </button>
            </div>

            <div className="px-8 py-6 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nom court *</label>
                  <input type="text" value={formData.name || ''} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className={inputCls} placeholder="Ex: Tout Illimité" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Titre *</label>
                  <input type="text" value={formData.title || ''} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className={inputCls} placeholder="Ex: Résidence Illimitée" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sous-titre *</label>
                  <input type="text" value={formData.subtitle || ''} onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })} className={inputCls} placeholder="Ex: Accès sans limite d'heures" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Slug (URL) *</label>
                  <input type="text" value={formData.slug || ''} onChange={(e) => setFormData({ ...formData, slug: e.target.value })} className={inputCls} placeholder="Ex: residence-illimitee" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Prix (€/mois) *</label>
                  <input type="text" value={formData.price || ''} onChange={(e) => setFormData({ ...formData, price: e.target.value })} className={inputCls} placeholder="Ex: 300" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bonus engagement</label>
                  <input type="text" value={formData.engagement_bonus || ''} onChange={(e) => setFormData({ ...formData, engagement_bonus: e.target.value })} className={inputCls} placeholder="Ex: 1 stage offert" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Valeur du bonus (€)</label>
                  <input type="text" value={formData.bonus_value || ''} onChange={(e) => setFormData({ ...formData, bonus_value: e.target.value })} className={inputCls} placeholder="Ex: 340" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Lien MonClub</label>
                  <input type="url" value={formData.monclub_url || ''} onChange={(e) => setFormData({ ...formData, monclub_url: e.target.value })} className={inputCls} placeholder="https://ventsetcourbes.monclub.app/app/..." />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Identifiant formule MonClub</label>
                  <input type="text" value={formData.monclub_id || ''} onChange={(e) => setFormData({ ...formData, monclub_id: e.target.value })} className={inputCls} placeholder="selectedMembership=..." />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                <textarea value={formData.description || ''} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={3} className={inputCls} />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ce qui est inclus</label>
                <textarea value={formData.includes || ''} onChange={(e) => setFormData({ ...formData, includes: e.target.value })} rows={2} className={inputCls} />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Titre SEO</label>
                <input type="text" value={formData.seo_title || ''} onChange={(e) => setFormData({ ...formData, seo_title: e.target.value })} className={inputCls} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description SEO</label>
                <textarea value={formData.seo_description || ''} onChange={(e) => setFormData({ ...formData, seo_description: e.target.value })} rows={2} className={inputCls} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-center">
                <label className="flex items-center space-x-3">
                  <input type="checkbox" checked={!!formData.popular} onChange={(e) => setFormData({ ...formData, popular: e.target.checked })} className="w-5 h-5 text-purple-500 border-gray-300 rounded focus:ring-2 focus:ring-purple-400" />
                  <span className="text-sm font-medium text-gray-700">Populaire</span>
                </label>
                <label className="flex items-center space-x-3">
                  <input type="checkbox" checked={!!formData.active} onChange={(e) => setFormData({ ...formData, active: e.target.checked })} className="w-5 h-5 text-purple-500 border-gray-300 rounded focus:ring-2 focus:ring-purple-400" />
                  <span className="text-sm font-medium text-gray-700">Active</span>
                </label>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Ordre</label>
                  <input type="number" value={formData.order_index ?? 0} onChange={(e) => setFormData({ ...formData, order_index: parseInt(e.target.value) || 0 })} className={inputCls} />
                </div>
              </div>
            </div>

            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-8 py-6 rounded-b-3xl flex justify-end space-x-4">
              <button onClick={() => setShowModal(false)} disabled={saving} className="px-6 py-3 bg-white hover:bg-gray-100 text-gray-700 rounded-xl border border-gray-300 transition-colors">
                Annuler
              </button>
              <button onClick={handleSave} disabled={saving} className="flex items-center space-x-2 px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-xl transition-colors disabled:opacity-50">
                <Save className="w-5 h-5" strokeWidth={2} />
                <span>{saving ? 'Enregistrement...' : 'Enregistrer'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AtelierPartageManagement;
