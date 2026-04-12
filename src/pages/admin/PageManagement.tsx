import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { CreditCard as Edit, X, Save, AlertCircle, Check, FileText, Type, AlignLeft, Link as LinkIcon, MousePointer } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import {
  getAllPages,
  updatePage,
  PageContent
} from '../../services/supabaseAdmin';

const sectionLabels: Record<string, string> = {
  home: 'Accueil',
  about: 'A propos',
  cours: 'Cours',
  stages: 'Stages',
  formation_pro: 'Formation Pro',
  contact: 'Contact',
  blog: 'Blog'
};

const sectionDescriptions: Record<string, string> = {
  home: 'Page d\'accueil du site : bandeau principal, atouts, a propos, galerie, blog',
  about: 'Page A propos : presentation de l\'atelier, equipe, valeurs',
  cours: 'Page Cours : bandeau, financements, lien Qualiopi',
  stages: 'Page Stages : bandeau, carte cadeau, decouvrir, financements',
  formation_pro: 'Page Formation Pro : bandeau, intro, CAP, financements, guides',
  contact: 'Page Contact : bandeau, informations, formulaire, plan',
  blog: 'Page Blog : bandeau et description'
};

const fieldLabels: Record<string, { label: string; icon: React.ElementType }> = {
  title: { label: 'Titre', icon: Type },
  subtitle: { label: 'Sous-titre', icon: Type },
  content: { label: 'Contenu / Description', icon: AlignLeft },
  button_text: { label: 'Texte du bouton', icon: MousePointer },
  button_link: { label: 'Lien du bouton', icon: LinkIcon }
};

const PageManagement = () => {
  const [pages, setPages] = useState<PageContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingPage, setEditingPage] = useState<PageContent | null>(null);
  const [formData, setFormData] = useState<Partial<PageContent>>({});
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [selectedSection, setSelectedSection] = useState<string>('all');

  const sections = [
    { value: 'all', label: 'Toutes les sections' },
    ...Object.entries(sectionLabels).map(([value, label]) => ({ value, label }))
  ];

  useEffect(() => {
    loadPages();
  }, []);

  const loadPages = async () => {
    setLoading(true);
    const { data, error } = await getAllPages(true);
    if (data) {
      setPages(data);
    }
    if (error) {
      setError('Erreur lors du chargement des pages');
    }
    setLoading(false);
  };

  const handleEdit = (page: PageContent) => {
    setEditingPage(page);
    setFormData(page);
    setShowModal(true);
    setError('');
    setSuccess('');
  };

  const handleSave = async () => {
    if (!editingPage) return;

    setError('');
    setSuccess('');
    setSaving(true);

    try {
      const { error: updateError } = await updatePage(editingPage.id!, formData);
      if (updateError) throw updateError;
      setSuccess('Contenu modifie avec succes');
      setShowModal(false);
      await loadPages();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue');
    } finally {
      setSaving(false);
    }
  };

  const filteredPages = selectedSection === 'all'
    ? pages
    : pages.filter(p => p.section === selectedSection);

  const groupedPages = filteredPages.reduce((acc, page) => {
    if (!acc[page.section]) {
      acc[page.section] = [];
    }
    acc[page.section].push(page);
    return acc;
  }, {} as Record<string, PageContent[]>);

  const getFilledFields = (page: PageContent) => {
    const fields: string[] = [];
    if (page.title) fields.push('Titre');
    if (page.subtitle) fields.push('Sous-titre');
    if (page.content) fields.push('Contenu');
    if (page.button_text) fields.push('Bouton');
    return fields;
  };

  return (
    <AdminLayout title="Gestion des Contenus" subtitle={`${pages.length} contenu(s) modifiables`}>
      <Helmet>
        <title>Gestion des Contenus - Admin Vents et Courbes</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="mb-6">
        <p className="text-gray-600 text-sm mb-4">
          Modifiez ici tous les textes visibles sur le site. Les modifications sont instantanees.
        </p>
        <div className="flex items-center space-x-4">
          <label className="text-sm font-medium text-gray-700">Filtrer par page :</label>
          <select
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          >
            {sections.map(s => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>
      </div>

      {success && (
        <div className="mb-6 bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-center space-x-3">
          <Check className="w-5 h-5 text-blue-600" strokeWidth={2} />
          <p className="text-blue-800">{success}</p>
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
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : filteredPages.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center">
          <p className="text-gray-600">Aucun contenu pour cette section</p>
        </div>
      ) : (
        <div className="space-y-8">
          {Object.entries(groupedPages).map(([section, sectionPages]) => (
            <div key={section} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="mb-6">
                <div className="flex items-center space-x-3 mb-2">
                  <FileText className="w-5 h-5 text-blue-500" strokeWidth={1.5} />
                  <h2 className="text-lg font-semibold text-gray-900">
                    {sectionLabels[section] || section}
                  </h2>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                    {sectionPages.length} element{sectionPages.length > 1 ? 's' : ''}
                  </span>
                </div>
                {sectionDescriptions[section] && (
                  <p className="text-sm text-gray-500 ml-8">
                    {sectionDescriptions[section]}
                  </p>
                )}
              </div>
              <div className="space-y-3">
                {sectionPages.map((page) => {
                  const filledFields = getFilledFields(page);
                  return (
                    <div
                      key={page.id}
                      className="border border-gray-200 rounded-xl p-4 hover:shadow-md hover:border-blue-200 transition-all cursor-pointer group"
                      onClick={() => handleEdit(page)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-3 mb-1">
                            <h3 className="text-base font-medium text-gray-900">
                              {page.page_name}
                            </h3>
                          </div>
                          {filledFields.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mt-2">
                              {filledFields.map(field => (
                                <span
                                  key={field}
                                  className="inline-flex items-center text-xs bg-gray-50 text-gray-600 px-2 py-0.5 rounded"
                                >
                                  {field}
                                </span>
                              ))}
                            </div>
                          )}
                          {page.title && (
                            <p className="text-sm text-gray-600 mt-2 truncate">
                              {page.title}
                            </p>
                          )}
                          {!page.title && page.content && (
                            <p className="text-sm text-gray-500 mt-2 truncate">
                              {page.content}
                            </p>
                          )}
                        </div>
                        <button
                          onClick={(e) => { e.stopPropagation(); handleEdit(page); }}
                          className="ml-4 p-2 opacity-0 group-hover:opacity-100 bg-blue-50 rounded-lg transition-all"
                        >
                          <Edit className="w-4 h-4 text-blue-600" strokeWidth={1.5} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && editingPage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 rounded-t-3xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900">
                    Modifier le contenu
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    {sectionLabels[editingPage.section] || editingPage.section} &rarr; {editingPage.page_name}
                  </p>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-gray-600" strokeWidth={1.5} />
                </button>
              </div>
            </div>

            <div className="px-8 py-6 space-y-6">
              {editingPage.title !== undefined && editingPage.title !== null && (
                <div>
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                    <Type className="w-4 h-4" strokeWidth={1.5} />
                    <span>Titre</span>
                  </label>
                  <input
                    type="text"
                    value={formData.title || ''}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    placeholder="Titre principal"
                  />
                </div>
              )}

              {editingPage.subtitle !== undefined && editingPage.subtitle !== null && (
                <div>
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                    <Type className="w-4 h-4" strokeWidth={1.5} />
                    <span>Sous-titre</span>
                  </label>
                  <input
                    type="text"
                    value={formData.subtitle || ''}
                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    placeholder="Sous-titre"
                  />
                </div>
              )}

              {editingPage.content !== undefined && editingPage.content !== null && (
                <div>
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                    <AlignLeft className="w-4 h-4" strokeWidth={1.5} />
                    <span>Contenu / Description</span>
                  </label>
                  <textarea
                    value={formData.content || ''}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    placeholder="Contenu principal..."
                  />
                </div>
              )}

              {(editingPage.button_text !== undefined && editingPage.button_text !== null ||
                editingPage.button_link !== undefined && editingPage.button_link !== null) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {editingPage.button_text !== undefined && editingPage.button_text !== null && (
                    <div>
                      <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                        <MousePointer className="w-4 h-4" strokeWidth={1.5} />
                        <span>Texte du bouton</span>
                      </label>
                      <input
                        type="text"
                        value={formData.button_text || ''}
                        onChange={(e) => setFormData({ ...formData, button_text: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                        placeholder="ex: En savoir plus"
                      />
                    </div>
                  )}
                  {editingPage.button_link !== undefined && editingPage.button_link !== null && (
                    <div>
                      <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                        <LinkIcon className="w-4 h-4" strokeWidth={1.5} />
                        <span>Lien du bouton</span>
                      </label>
                      <input
                        type="text"
                        value={formData.button_link || ''}
                        onChange={(e) => setFormData({ ...formData, button_link: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                        placeholder="ex: /contact"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>

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
                  className="flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors disabled:opacity-50"
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

export default PageManagement;
