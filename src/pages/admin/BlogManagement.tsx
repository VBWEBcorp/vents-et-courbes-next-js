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
  Eye,
  EyeOff,
  User,
  Upload
} from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import {
  getAllArticles,
  createArticle,
  updateArticle,
  deleteArticle,
  getAllAuteurs,
  ArticleBlog,
  Auteur,
  uploadImage
} from '../../services/supabaseAdmin';

const BlogManagement = () => {
  const [articles, setArticles] = useState<ArticleBlog[]>([]);
  const [auteurs, setAuteurs] = useState<Auteur[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingArticle, setEditingArticle] = useState<ArticleBlog | null>(null);
  const [formData, setFormData] = useState<Partial<ArticleBlog>>({
    title: '',
    slug: '',
    published_date: new Date().toISOString().split('T')[0],
    author_id: '',
    image_url: '',
    excerpt: '',
    content: '',
    seo_title: '',
    seo_description: '',
    active: false,
    order_index: 0
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const [articlesRes, auteursRes] = await Promise.all([
      getAllArticles(true),
      getAllAuteurs()
    ]);

    if (articlesRes.data) setArticles(articlesRes.data);
    if (auteursRes.data) setAuteurs(auteursRes.data);

    if (articlesRes.error || auteursRes.error) {
      setError('Erreur lors du chargement des données');
    }
    setLoading(false);
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleAdd = () => {
    setEditingArticle(null);
    setFormData({
      title: '',
      slug: '',
      published_date: new Date().toISOString().split('T')[0],
      author_id: auteurs.length > 0 ? auteurs[0].id : '',
      image_url: '',
      excerpt: '',
      content: '',
      seo_title: '',
      seo_description: '',
      active: false,
      order_index: articles.length
    });
    setShowModal(true);
  };

  const handleEdit = (article: ArticleBlog) => {
    setEditingArticle(article);
    setFormData({
      title: article.title,
      slug: article.slug,
      published_date: article.published_date.split('T')[0],
      author_id: article.author_id,
      image_url: article.image_url,
      excerpt: article.excerpt,
      content: article.content,
      seo_title: article.seo_title,
      seo_description: article.seo_description,
      active: article.active,
      order_index: article.order_index
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    setError('');
    setSuccess('');
    setSaving(true);

    try {
      const dataToSave = {
        ...formData,
        slug: formData.slug || generateSlug(formData.title || ''),
        seo_title: formData.seo_title || formData.title,
        seo_description: formData.seo_description || formData.excerpt
      };

      console.log('💾 Données à sauvegarder:', {
        ...dataToSave,
        content: `[${dataToSave.content.length} caractères]`
      });
      console.log('🖼️ URL Image:', dataToSave.image_url);

      if (editingArticle) {
        const { data, error: updateError } = await updateArticle(editingArticle.id!, dataToSave);
        if (updateError) {
          console.error('❌ Erreur update:', updateError);
          throw updateError;
        }
        console.log('✅ Article mis à jour:', data);
        setSuccess('Article modifié avec succès');
      } else {
        const { data, error: createError } = await createArticle(dataToSave as any);
        if (createError) {
          console.error('❌ Erreur création:', createError);
          throw createError;
        }
        console.log('✅ Article créé:', data);
        setSuccess('Article créé avec succès');
      }

      setShowModal(false);
      await loadData();

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

    const { error: deleteError } = await deleteArticle(id);
    if (!deleteError) {
      setSuccess('Article supprimé avec succès');
      await loadData();
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
    setSuccess('');

    try {
      console.log('📤 Upload de l\'image:', file.name, `(${(file.size / 1024 / 1024).toFixed(2)} MB)`);

      const { data, error: uploadError } = await uploadImage(file, 'images');

      if (uploadError) {
        console.error('❌ Erreur upload:', uploadError);
        throw uploadError;
      }

      if (data?.url) {
        console.log('✅ Image uploadée avec succès:', data.url);
        setFormData({ ...formData, image_url: data.url });
        setSuccess(`Image "${file.name}" uploadée avec succès !`);
        setTimeout(() => setSuccess(''), 5000);
      }
    } catch (err: any) {
      console.error('❌ Erreur complète:', err);
      const errorMessage = err.message || err.error?.message || 'Erreur lors de l\'upload de l\'image';
      setError(errorMessage);
    } finally {
      setUploadingImage(false);
      e.target.value = '';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <AdminLayout title="Gestion du Blog" subtitle={`${articles.length} article(s)`}>
      <Helmet>
        <title>Gestion du Blog - Admin Vents et Courbes</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      {/* Actions */}
      <div className="mb-6 flex justify-end">
        <button
          onClick={handleAdd}
          className="flex items-center space-x-2 px-4 py-2 bg-slate-700 hover:bg-slate-800 text-white rounded-lg transition-colors"
        >
          <Plus className="w-5 h-5" strokeWidth={2} />
          <span className="font-medium">Nouvel article</span>
        </button>
      </div>
        {/* Notifications */}
        {success && (
          <div className="mb-6 bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-center space-x-3">
            <Check className="w-5 h-5 text-slate-600" strokeWidth={2} />
            <p className="text-slate-800">{success}</p>
          </div>
        )}

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 flex items-center space-x-3">
            <AlertCircle className="w-5 h-5 text-red-600" strokeWidth={2} />
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* Articles list */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-400"></div>
          </div>
        ) : articles.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center">
            <p className="text-gray-600 mb-4">Aucun article pour le moment</p>
            <button
              onClick={handleAdd}
              className="inline-flex items-center space-x-2 px-6 py-3 bg-slate-700 hover:bg-slate-800 text-white rounded-lg transition-colors"
            >
              <Plus className="w-5 h-5" strokeWidth={2} />
              <span>Créer le premier article</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {articles.map((article) => (
              <div
                key={article.id}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start space-x-6">
                  {/* Image */}
                  {article.image_url && (
                    <div className="flex-shrink-0">
                      <img
                        src={article.image_url}
                        alt={article.title}
                        className="w-32 h-32 object-cover rounded-xl"
                      />
                    </div>
                  )}

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {article.title}
                        </h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span>{formatDate(article.published_date)}</span>
                          {article.author && (
                            <>
                              <span>•</span>
                              <span className="flex items-center">
                                <User className="w-4 h-4 mr-1" strokeWidth={1.5} />
                                {article.author.name}
                              </span>
                            </>
                          )}
                          <span>•</span>
                          {article.active ? (
                            <span className="flex items-center text-slate-600">
                              <Eye className="w-4 h-4 mr-1" strokeWidth={1.5} />
                              Publié
                            </span>
                          ) : (
                            <span className="flex items-center text-gray-500">
                              <EyeOff className="w-4 h-4 mr-1" strokeWidth={1.5} />
                              Brouillon
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleEdit(article)}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <Edit className="w-5 h-5 text-gray-600" strokeWidth={1.5} />
                        </button>
                        <button
                          onClick={() => handleDelete(article.id!)}
                          className={`p-2 rounded-lg transition-colors ${
                            deleteConfirm === article.id
                              ? 'bg-red-100 hover:bg-red-200'
                              : 'hover:bg-gray-100'
                          }`}
                        >
                          <Trash2
                            className={`w-5 h-5 ${
                              deleteConfirm === article.id ? 'text-red-600' : 'text-gray-600'
                            }`}
                            strokeWidth={1.5}
                          />
                        </button>
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm line-clamp-2">
                      {article.excerpt}
                    </p>
                  </div>
                </div>
                {deleteConfirm === article.id && (
                  <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-red-800 text-sm mb-3">
                      Êtes-vous sûr de vouloir supprimer cet article ? Cette action est irréversible.
                    </p>
                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleDelete(article.id!)}
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-5xl w-full my-8">
            {/* Modal header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 rounded-t-3xl z-10">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-gray-900">
                  {editingArticle ? 'Modifier l\'article' : 'Nouvel article'}
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
            <div className="px-8 py-6 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
              {/* Messages d'erreur et de succès */}
              {error && (
                <div className="flex items-start space-x-3 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-red-800">Erreur</p>
                    <p className="text-sm text-red-700 mt-1">{error}</p>
                  </div>
                  <button
                    onClick={() => setError('')}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="w-5 h-5" strokeWidth={1.5} />
                  </button>
                </div>
              )}

              {success && (
                <div className="flex items-start space-x-3 p-4 bg-slate-50 border-l-4 border-slate-500 rounded-lg">
                  <Check className="w-5 h-5 text-slate-600 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-800">Succès</p>
                    <p className="text-sm text-green-700 mt-1">{success}</p>
                  </div>
                  <button
                    onClick={() => setSuccess('')}
                    className="text-slate-600 hover:text-slate-800"
                  >
                    <X className="w-5 h-5" strokeWidth={1.5} />
                  </button>
                </div>
              )}

              {/* Titre */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Titre de l'article *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => {
                    const title = e.target.value;
                    setFormData({
                      ...formData,
                      title,
                      slug: generateSlug(title)
                    });
                  }}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-slate-400 focus:border-transparent"
                  placeholder="Ex: Les 5 erreurs courantes en tournage débutant"
                />
              </div>

              {/* Slug */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Slug (URL) *
                </label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-slate-400 focus:border-transparent"
                  placeholder="erreurs-tournage-debutant"
                />
                <p className="text-xs text-gray-500 mt-1">
                  L'URL sera : /blog/{formData.slug || 'slug-de-l-article'}
                </p>
              </div>

              {/* Date et Auteur */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date de publication *
                  </label>
                  <input
                    type="date"
                    value={formData.published_date}
                    onChange={(e) => setFormData({ ...formData, published_date: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-slate-400 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Auteur *
                  </label>
                  <select
                    value={formData.author_id}
                    onChange={(e) => setFormData({ ...formData, author_id: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-slate-400 focus:border-transparent"
                  >
                    {auteurs.map((auteur) => (
                      <option key={auteur.id} value={auteur.id}>
                        {auteur.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Image URL or Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image principale *
                </label>
                <div className="space-y-4">
                  {/* Prévisualisation grande de l'image */}
                  {formData.image_url && (
                    <div className="relative w-full h-64 bg-gray-100 rounded-xl overflow-hidden border-2 border-gray-200">
                      <img
                        src={formData.image_url}
                        alt="Aperçu de l'image"
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23f3f4f6" width="100" height="100"/%3E%3Ctext fill="%239ca3af" font-family="sans-serif" font-size="14" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3EImage non valide%3C/text%3E%3C/svg%3E';
                        }}
                      />
                      <div className="absolute top-2 right-2 bg-slate-500 text-white px-3 py-1 rounded-lg text-xs font-medium shadow-lg">
                        ✓ Image chargée
                      </div>
                    </div>
                  )}

                  {/* Zone d'upload */}
                  <div className="space-y-3">
                    <label className="block">
                      <div className={`flex items-center justify-center px-6 py-8 border-2 border-dashed rounded-xl transition-all cursor-pointer ${
                        uploadingImage
                          ? 'border-slate-400 bg-slate-50'
                          : 'border-gray-300 hover:border-slate-400 hover:bg-slate-50'
                      }`}>
                        <div className="text-center">
                          <Upload className={`w-12 h-12 mx-auto mb-3 ${uploadingImage ? 'text-slate-600 animate-pulse' : 'text-gray-400'}`} strokeWidth={1.5} />
                          <p className="text-base font-medium text-gray-700 mb-1">
                            {uploadingImage ? 'Upload en cours...' : 'Cliquez pour uploader une image'}
                          </p>
                          <p className="text-sm text-gray-500">
                            JPG, PNG, WebP, GIF jusqu'à 10 MB
                          </p>
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          disabled={uploadingImage}
                          className="hidden"
                        />
                      </div>
                    </label>

                    {/* Ou coller une URL */}
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">ou coller une URL</span>
                      </div>
                    </div>

                    <input
                      type="url"
                      value={formData.image_url}
                      onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-slate-400 focus:border-transparent"
                      placeholder="https://exemple.com/image.jpg"
                    />
                  </div>
                </div>
              </div>

              {/* Extrait */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Extrait (résumé) *
                </label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  rows={2}
                  maxLength={300}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-slate-400 focus:border-transparent"
                  placeholder="Résumé court de l'article (max 300 caractères)"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {formData.excerpt?.length || 0} / 300 caractères
                </p>
              </div>

              {/* Contenu Markdown */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contenu de l'article (Markdown) *
                </label>
                <div className="mb-2 text-xs text-gray-600 bg-gray-50 p-3 rounded-lg">
                  <p className="font-semibold mb-1">Format Markdown :</p>
                  <ul className="space-y-1">
                    <li>• <code># Titre</code> pour un titre H1</li>
                    <li>• <code>## Sous-titre</code> pour un titre H2</li>
                    <li>• <code>**gras**</code> pour du texte en gras</li>
                    <li>• <code>- item</code> pour une liste à puces</li>
                  </ul>
                </div>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={15}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-slate-400 focus:border-transparent font-mono text-sm"
                  placeholder="# Titre de l'article&#10;&#10;Écrivez votre contenu ici...&#10;&#10;## Sous-titre&#10;&#10;Votre texte avec **gras** et *italique*."
                />
              </div>

              {/* SEO */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">SEO (optionnel)</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Titre SEO
                    </label>
                    <input
                      type="text"
                      value={formData.seo_title}
                      onChange={(e) => setFormData({ ...formData, seo_title: e.target.value })}
                      maxLength={60}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-slate-400 focus:border-transparent"
                      placeholder="Titre optimisé pour les moteurs de recherche"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {formData.seo_title?.length || 0} / 60 caractères
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description SEO
                    </label>
                    <textarea
                      value={formData.seo_description}
                      onChange={(e) => setFormData({ ...formData, seo_description: e.target.value })}
                      rows={2}
                      maxLength={160}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-slate-400 focus:border-transparent"
                      placeholder="Description pour les moteurs de recherche"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {formData.seo_description?.length || 0} / 160 caractères
                    </p>
                  </div>
                </div>
              </div>

              {/* Status */}
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="active"
                  checked={formData.active}
                  onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                  className="w-5 h-5 text-green-400 border-gray-300 rounded focus:ring-2 focus:ring-slate-400"
                />
                <label htmlFor="active" className="text-sm font-medium text-gray-700">
                  Publier l'article (visible sur le site)
                </label>
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
                  className="flex items-center space-x-2 px-6 py-3 bg-slate-700 hover:bg-slate-800 text-white rounded-xl transition-colors disabled:opacity-50"
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

export default BlogManagement;
