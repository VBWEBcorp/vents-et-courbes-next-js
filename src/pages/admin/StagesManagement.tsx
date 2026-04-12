import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Plus,
  Edit,
  Trash2,
  X,
  Save,
  AlertCircle,
  Check,
  Upload
} from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import {
  getAllStages,
  createStage,
  updateStage,
  deleteStage,
  Stage,
  uploadImage
} from '../../services/supabaseAdmin';

const StagesManagement = () => {
  const [stages, setStages] = useState<Stage[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingStage, setEditingStage] = useState<Stage | null>(null);
  const [formData, setFormData] = useState<Partial<Stage>>({
    title: '',
    duration: '',
    level: 'Tous niveaux',
    image_url: '',
    description: '',
    includes: '',
    price: '',
    additional_price: '',
    additional_text: 'Prix Net de TVA',
    opco: '',
    reservation_slug: '',
    widget_id: '',
    has_cuisson: false,
    order_index: 0,
    active: true
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    loadStages();
  }, []);

  const loadStages = async () => {
    setLoading(true);
    const { data, error } = await getAllStages(true);
    if (data) {
      setStages(data);
    }
    if (error) {
      setError('Erreur lors du chargement des stages');
    }
    setLoading(false);
  };

  const handleAdd = () => {
    setEditingStage(null);
    setFormData({
      title: '',
      duration: '',
      level: 'Tous niveaux',
      image_url: '',
      description: '',
      includes: '',
      price: '',
      additional_price: '',
      additional_text: 'Prix Net de TVA',
      opco: '',
      reservation_slug: '',
      widget_id: '',
      has_cuisson: false,
      order_index: stages.length,
      active: true
    });
    setShowModal(true);
  };

  const handleEdit = (stage: Stage) => {
    setEditingStage(stage);
    setFormData(stage);
    setShowModal(true);
  };

  const handleSave = async () => {
    setError('');
    setSuccess('');
    setSaving(true);

    try {
      if (editingStage) {
        const { data, error: updateError } = await updateStage(editingStage.id!, formData);
        if (updateError) throw updateError;
        setSuccess('Stage modifié avec succès');
      } else {
        const { data, error: createError } = await createStage(formData as Omit<Stage, 'id' | 'created_at' | 'updated_at'>);
        if (createError) throw createError;
        setSuccess('Stage créé avec succès');
      }

      setShowModal(false);
      await loadStages();

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

    const { error: deleteError } = await deleteStage(id);
    if (!deleteError) {
      setSuccess('Stage supprimé avec succès');
      await loadStages();
      setTimeout(() => setSuccess(''), 3000);
    } else {
      setError('Erreur lors de la suppression');
    }
    setDeleteConfirm(null);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    setError('');

    try {
      console.log('📤 Upload de l\'image en cours...', file.name);
      const { data, error: uploadError } = await uploadImage(file, 'images');

      if (uploadError) {
        console.error('❌ Erreur upload:', uploadError);
        throw uploadError;
      }

      if (data?.url) {
        console.log('✅ Image uploadée avec succès:', data.url);
        setFormData({ ...formData, image_url: data.url });
        setSuccess('Image uploadée avec succès');
        setTimeout(() => setSuccess(''), 3000);

        e.target.value = '';
      }
    } catch (err: any) {
      console.error('❌ Erreur:', err);
      setError(err.message || 'Erreur lors de l\'upload de l\'image');
    } finally {
      setUploadingImage(false);
    }
  };

  return (
    <AdminLayout title="Gestion des Stages" subtitle={`${stages.length} stage(s)`}>
      <Helmet>
        <title>Gestion des Stages - Admin Vents et Courbes</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      {/* Actions */}
      <div className="mb-6 flex justify-end">
        <button
          onClick={handleAdd}
          className="flex items-center space-x-2 px-4 py-2 bg-green-400 hover:bg-green-500 text-white rounded-lg transition-colors"
        >
          <Plus className="w-5 h-5" strokeWidth={2} />
          <span className="font-medium">Ajouter un stage</span>
        </button>
      </div>
        {/* Notifications */}
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

        {/* Stages list */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-400"></div>
          </div>
        ) : stages.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center">
            <p className="text-gray-600 mb-4">Aucun stage pour le moment</p>
            <button
              onClick={handleAdd}
              className="inline-flex items-center space-x-2 px-6 py-3 bg-green-400 hover:bg-green-500 text-white rounded-lg transition-colors"
            >
              <Plus className="w-5 h-5" strokeWidth={2} />
              <span>Créer le premier stage</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {stages.map((stage) => (
              <div
                key={stage.id}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start space-x-6">
                  {/* Image */}
                  <div className="flex-shrink-0">
                    <img
                      src={stage.image_url}
                      alt={stage.title}
                      className="w-32 h-32 object-cover rounded-xl"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {stage.title}
                        </h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span>{stage.duration}</span>
                          <span>•</span>
                          <span>{stage.level}</span>
                          <span>•</span>
                          <span className="font-semibold text-green-600">{stage.price}</span>
                          {stage.has_cuisson && (
                            <>
                              <span>•</span>
                              <span className="text-green-600">✨ Cuisson comprise</span>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {!stage.active && (
                          <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                            Inactif
                          </span>
                        )}
                        <button
                          onClick={() => handleEdit(stage)}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <Edit className="w-5 h-5 text-gray-600" strokeWidth={1.5} />
                        </button>
                        <button
                          onClick={() => handleDelete(stage.id!)}
                          className={`p-2 rounded-lg transition-colors ${
                            deleteConfirm === stage.id
                              ? 'bg-red-100 hover:bg-red-200'
                              : 'hover:bg-gray-100'
                          }`}
                        >
                          <Trash2
                            className={`w-5 h-5 ${
                              deleteConfirm === stage.id ? 'text-red-600' : 'text-gray-600'
                            }`}
                            strokeWidth={1.5}
                          />
                        </button>
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm line-clamp-2 mb-2">
                      {stage.description}
                    </p>
                    <p className="text-gray-600 text-sm italic line-clamp-1">
                      {stage.includes}
                    </p>
                  </div>
                </div>
                {deleteConfirm === stage.id && (
                  <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-red-800 text-sm mb-3">
                      Êtes-vous sûr de vouloir supprimer ce stage ? Cette action est irréversible.
                    </p>
                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleDelete(stage.id!)}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded-lg transition-colors"
                      >
                        Confirmer la suppression
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(null)}
                        className="px-4 py-2 bg-white hover:bg-gray-100 text-gray-700 text-sm rounded-lg border border-gray-300 transition-colors"
                      >
                        Annuler
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 rounded-t-3xl">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-gray-900">
                  {editingStage ? 'Modifier le stage' : 'Ajouter un stage'}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-gray-600" strokeWidth={1.5} />
                </button>
              </div>
            </div>

            {/* Modal content */}
            <div className="px-8 py-6 space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Titre du stage *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-400 focus:border-transparent"
                  placeholder="Ex: 4 jours de tournage"
                />
              </div>

              {/* Duration and Level */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Durée *
                  </label>
                  <input
                    type="text"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-400 focus:border-transparent"
                    placeholder="Ex: 25 heures"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Niveau *
                  </label>
                  <select
                    value={formData.level}
                    onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-400 focus:border-transparent"
                  >
                    <option value="Tous niveaux">Tous niveaux</option>
                    <option value="Débutant">Débutant</option>
                    <option value="Initiation">Initiation</option>
                    <option value="Intermédiaire">Intermédiaire</option>
                    <option value="Avancé">Avancé</option>
                  </select>
                </div>
              </div>

              {/* Image URL or Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image du stage *
                </label>
                <div className="space-y-4">
                  {/* Preview de l'image */}
                  {formData.image_url && (
                    <div className="relative">
                      <img
                        src={formData.image_url}
                        alt="Preview"
                        className="w-64 h-64 object-cover rounded-xl border-2 border-green-400"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "https://i.ibb.co/7w4BNrH/VC-image-galerie01.jpg";
                        }}
                      />
                      <div className="absolute top-2 right-2 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center">
                        <Check className="w-3 h-3 mr-1" />
                        Image chargée
                      </div>
                    </div>
                  )}

                  {/* URL Input */}
                  <input
                    type="url"
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-400 focus:border-transparent"
                    placeholder="https://... ou uploadez une image ci-dessous"
                  />

                  {/* Upload Button */}
                  <label className="block">
                    <div className={`flex items-center justify-center px-4 py-3 border-2 border-dashed rounded-xl transition-colors cursor-pointer ${
                      uploadingImage
                        ? 'border-green-300 bg-green-50'
                        : 'border-gray-300 hover:border-green-400'
                    }`}>
                      <Upload className="w-5 h-5 text-gray-400 mr-2" strokeWidth={1.5} />
                      <span className="text-sm text-gray-600">
                        {uploadingImage ? 'Upload en cours...' : 'Cliquez pour uploader une image'}
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        disabled={uploadingImage}
                        className="hidden"
                      />
                    </div>
                  </label>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-400 focus:border-transparent"
                  placeholder="Description du stage..."
                />
              </div>

              {/* Includes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ce qui est inclus *
                </label>
                <textarea
                  value={formData.includes}
                  onChange={(e) => setFormData({ ...formData, includes: e.target.value })}
                  rows={2}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-400 focus:border-transparent"
                  placeholder="Détails de ce qui est inclus dans le stage..."
                />
              </div>

              {/* Price */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Prix *
                  </label>
                  <input
                    type="text"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-400 focus:border-transparent"
                    placeholder="Ex: 470€"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Prix additionnel (optionnel)
                  </label>
                  <input
                    type="text"
                    value={formData.additional_price || ''}
                    onChange={(e) => setFormData({ ...formData, additional_price: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-400 focus:border-transparent"
                    placeholder="Ex: +20€"
                  />
                </div>
              </div>

              {/* Additional Text */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Texte additionnel du prix *
                </label>
                <input
                  type="text"
                  value={formData.additional_text}
                  onChange={(e) => setFormData({ ...formData, additional_text: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-400 focus:border-transparent"
                  placeholder="Ex: Prix Net de TVA"
                />
              </div>

              {/* OPCO */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Information OPCO (optionnel)
                </label>
                <input
                  type="text"
                  value={formData.opco || ''}
                  onChange={(e) => setFormData({ ...formData, opco: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-400 focus:border-transparent"
                  placeholder="Ex: Possibilité de prise en charge par un organisme OPCO"
                />
              </div>

              {/* Reservation Slug & Widget ID */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Slug de réservation *
                  </label>
                  <input
                    type="text"
                    value={formData.reservation_slug}
                    onChange={(e) => setFormData({ ...formData, reservation_slug: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-400 focus:border-transparent"
                    placeholder="Ex: stage-tournage-ceramique"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    L'URL sera: /reservation/[slug]
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Widget ID Regiondo *
                  </label>
                  <input
                    type="text"
                    value={formData.widget_id}
                    onChange={(e) => setFormData({ ...formData, widget_id: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-400 focus:border-transparent"
                    placeholder="Ex: def0899d-1433-4bf7-8d47-b3049e431631"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Trouvez-le dans le code du widget Regiondo
                  </p>
                </div>
              </div>

              {/* Toggles */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="has_cuisson"
                    checked={formData.has_cuisson}
                    onChange={(e) => setFormData({ ...formData, has_cuisson: e.target.checked })}
                    className="w-5 h-5 text-green-400 border-gray-300 rounded focus:ring-2 focus:ring-green-400"
                  />
                  <label htmlFor="has_cuisson" className="text-sm font-medium text-gray-700">
                    Cuisson comprise
                  </label>
                </div>
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="active"
                    checked={formData.active}
                    onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                    className="w-5 h-5 text-green-400 border-gray-300 rounded focus:ring-2 focus:ring-green-400"
                  />
                  <label htmlFor="active" className="text-sm font-medium text-gray-700">
                    Stage actif
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ordre
                  </label>
                  <input
                    type="number"
                    value={formData.order_index}
                    onChange={(e) => setFormData({ ...formData, order_index: parseInt(e.target.value) })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-400 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Modal footer */}
            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-8 py-6 rounded-b-3xl">
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-6 py-3 bg-white hover:bg-gray-100 text-gray-700 rounded-xl border border-gray-300 transition-colors"
                  disabled={saving}
                >
                  Annuler
                </button>
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
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default StagesManagement;
