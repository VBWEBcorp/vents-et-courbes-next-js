'use client';
import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Save,
  AlertCircle,
  Check,
  Type,
  AlignLeft,
  MousePointer,
  Image as ImageIcon,
  Upload,
  Loader2,
  Plus,
  Trash2,
  Layers,
} from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import {
  getAllPages,
  updatePage,
  uploadImage,
  PageContent,
  PageFieldType,
} from '../../services/supabaseAdmin';

// Ordre + libellés des pages dans le sélecteur.
const SECTION_ORDER: { key: string; label: string }[] = [
  { key: 'home', label: 'Accueil' },
  { key: 'about', label: 'À propos' },
  { key: 'cours', label: 'Cours' },
  { key: 'stages', label: 'Stages' },
  { key: 'formation_pro', label: 'Formation Pro' },
  { key: 'contact', label: 'Contact' },
  { key: 'blog', label: 'Blog' },
  { key: 'global', label: 'Général' },
];

const sectionLabel = (key: string) =>
  SECTION_ORDER.find((s) => s.key === key)?.label || key;

// Déduit le type d'un bloc même s'il n'a pas encore été « seedé ».
const inferType = (p: PageContent): PageFieldType => {
  if (p.field_type) return p.field_type;
  if (Array.isArray(p.images)) return 'gallery';
  if (p.image_url !== undefined && p.image_url !== null) return 'image';
  if (p.button_text != null || p.button_link != null) return 'button';
  if (p.subtitle != null) return 'subtitle';
  if (p.title != null && p.content != null) return 'feature';
  if (p.title != null) return 'title';
  return 'paragraph';
};

type Draft = Record<string, Partial<PageContent>>;

const PageManagement = () => {
  const [pages, setPages] = useState<PageContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSection, setSelectedSection] = useState<string>('home');
  const [draft, setDraft] = useState<Draft>({});
  const [saving, setSaving] = useState(false);
  const [uploadingId, setUploadingId] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    loadPages();
  }, []);

  const loadPages = async () => {
    setLoading(true);
    const { data, error } = await getAllPages(true);
    if (data) setPages(data);
    if (error) setError('Erreur lors du chargement des pages');
    setLoading(false);
  };

  // Sections réellement présentes, dans l'ordre défini.
  const sections = useMemo(() => {
    const present = new Set(pages.map((p) => p.section));
    const ordered = SECTION_ORDER.filter((s) => present.has(s.key));
    const extras = [...present]
      .filter((s) => !SECTION_ORDER.some((o) => o.key === s))
      .map((key) => ({ key, label: key }));
    return [...ordered, ...extras];
  }, [pages]);

  // S'assure qu'une section valide est sélectionnée.
  useEffect(() => {
    if (sections.length && !sections.some((s) => s.key === selectedSection)) {
      setSelectedSection(sections[0].key);
    }
  }, [sections, selectedSection]);

  const blocks = useMemo(
    () =>
      pages
        .filter((p) => p.section === selectedSection)
        .sort((a, b) => (a.order_index ?? 0) - (b.order_index ?? 0)),
    [pages, selectedSection],
  );

  const dirtyIds = Object.keys(draft).filter(
    (id) => draft[id] && Object.keys(draft[id]).length > 0,
  );
  const dirtyCount = dirtyIds.length;

  // Valeur courante d'un champ (brouillon prioritaire sur la valeur en base).
  const val = <K extends keyof PageContent>(
    block: PageContent,
    field: K,
  ): PageContent[K] => {
    const id = block.id!;
    if (draft[id] && field in draft[id]) return draft[id][field] as PageContent[K];
    return block[field];
  };

  const setField = (
    block: PageContent,
    field: keyof PageContent,
    value: unknown,
  ) => {
    const id = block.id!;
    setDraft((d) => ({ ...d, [id]: { ...d[id], [field]: value } }));
    setSuccess('');
  };

  const handleUpload = async (
    block: PageContent,
    file: File,
    onUrl: (url: string) => void,
  ) => {
    setError('');
    setUploadingId(block.id!);
    try {
      const { data, error } = await uploadImage(file);
      if (error || !data) throw new Error(error?.message || "Échec de l'upload");
      onUrl(data.url);
    } catch (e) {
      setError((e as Error).message || "Erreur lors de l'envoi de l'image");
    } finally {
      setUploadingId(null);
    }
  };

  const handleSave = async () => {
    setError('');
    setSuccess('');
    setSaving(true);
    try {
      for (const id of dirtyIds) {
        const { error } = await updatePage(id, draft[id]);
        if (error) throw new Error(error.message);
      }
      setDraft({});
      await loadPages();
      setSuccess('Modifications enregistrées ✓');
      setTimeout(() => setSuccess(''), 3500);
    } catch (e) {
      setError((e as Error).message || 'Une erreur est survenue');
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout
      title="Modifier les pages"
      subtitle="Choisissez une page, puis modifiez ses textes et ses images dans l'ordre"
    >
      {/* Sélecteur de page */}
      <div className="mb-6 flex flex-wrap gap-2">
        {sections.map((s) => (
          <button
            key={s.key}
            onClick={() => setSelectedSection(s.key)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedSection === s.key
                ? 'bg-primary-500 text-white shadow-sm'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-primary-300'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0" strokeWidth={2} />
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="w-8 h-8 text-primary-500 animate-spin" />
        </div>
      ) : blocks.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-gray-100">
          <p className="text-gray-600">
            Aucun contenu éditable pour cette page pour l'instant.
          </p>
        </div>
      ) : (
        <div className="max-w-3xl space-y-3 pb-28">
          <p className="text-sm text-gray-500 mb-2">
            Vous parcourez la page <strong>{sectionLabel(selectedSection)}</strong>{' '}
            de haut en bas. Les modifications s'appliquent au site après
            enregistrement.
          </p>
          {blocks.map((block, i) => {
            const prev = blocks[i - 1];
            const showGroup = block.group && block.group !== prev?.group;
            return (
              <React.Fragment key={block.id}>
                {showGroup && (
                  <div className="flex items-center gap-2 pt-6 pb-1">
                    <Layers className="w-4 h-4 text-primary-400" strokeWidth={2} />
                    <h3 className="text-sm font-semibold uppercase tracking-wide text-primary-500">
                      {block.group}
                    </h3>
                  </div>
                )}
                <BlockEditor
                  block={block}
                  type={inferType(block)}
                  val={val}
                  setField={setField}
                  uploading={uploadingId === block.id}
                  onUpload={handleUpload}
                />
              </React.Fragment>
            );
          })}
        </div>
      )}

      {/* Barre d'enregistrement flottante */}
      {(dirtyCount > 0 || success) && (
        <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-gray-200 bg-white/95 backdrop-blur px-6 py-4">
          <div className="max-w-3xl mx-auto flex items-center justify-between gap-4">
            {success ? (
              <span className="flex items-center gap-2 text-primary-600 font-medium">
                <Check className="w-5 h-5" strokeWidth={2} /> {success}
              </span>
            ) : (
              <span className="text-sm text-gray-600">
                {dirtyCount} modification{dirtyCount > 1 ? 's' : ''} non
                enregistrée{dirtyCount > 1 ? 's' : ''}
              </span>
            )}
            <div className="flex items-center gap-3">
              {dirtyCount > 0 && (
                <button
                  onClick={() => setDraft({})}
                  disabled={saving}
                  className="px-4 py-2.5 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors disabled:opacity-50"
                >
                  Annuler
                </button>
              )}
              <button
                onClick={handleSave}
                disabled={saving || dirtyCount === 0}
                className="flex items-center gap-2 px-6 py-2.5 bg-primary-500 hover:bg-primary-600 text-white rounded-xl font-medium transition-colors disabled:opacity-50"
              >
                {saving ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Save className="w-5 h-5" strokeWidth={2} />
                )}
                {saving ? 'Enregistrement…' : 'Enregistrer'}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

// ------------------------------------------------------------------------
// Éditeur d'un bloc — le contrôle dépend du type.
// ------------------------------------------------------------------------
interface BlockEditorProps {
  block: PageContent;
  type: PageFieldType;
  val: <K extends keyof PageContent>(b: PageContent, f: K) => PageContent[K];
  setField: (b: PageContent, f: keyof PageContent, v: unknown) => void;
  uploading: boolean;
  onUpload: (b: PageContent, file: File, onUrl: (url: string) => void) => void;
}

const typeIcon: Record<PageFieldType, React.ElementType> = {
  title: Type,
  subtitle: Type,
  paragraph: AlignLeft,
  button: MousePointer,
  feature: AlignLeft,
  image: ImageIcon,
  gallery: ImageIcon,
};

const BlockEditor: React.FC<BlockEditorProps> = ({
  block,
  type,
  val,
  setField,
  uploading,
  onUpload,
}) => {
  const Icon = typeIcon[type] || Type;

  const label = (
    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
      <Icon className="w-4 h-4 text-gray-400" strokeWidth={1.5} />
      <span>{block.page_name}</span>
    </label>
  );

  const inputCls =
    'w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-transparent outline-none';

  // Bloc non encore migré (pas de field_type) : on affiche TOUS les champs
  // présents, pour ne rien rendre inéditable.
  if (!block.field_type) {
    const has = (f: keyof PageContent) => block[f] !== undefined;
    return (
      <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm space-y-3">
        {label}
        {has('title') && (
          <div>
            <span className="block text-xs text-gray-500 mb-1">Titre</span>
            <input
              type="text"
              value={(val(block, 'title') as string) || ''}
              onChange={(e) => setField(block, 'title', e.target.value)}
              className={inputCls}
            />
          </div>
        )}
        {has('subtitle') && (
          <div>
            <span className="block text-xs text-gray-500 mb-1">Sous-titre</span>
            <input
              type="text"
              value={(val(block, 'subtitle') as string) || ''}
              onChange={(e) => setField(block, 'subtitle', e.target.value)}
              className={inputCls}
            />
          </div>
        )}
        {has('content') && (
          <div>
            <span className="block text-xs text-gray-500 mb-1">Texte</span>
            <textarea
              value={(val(block, 'content') as string) || ''}
              onChange={(e) => setField(block, 'content', e.target.value)}
              rows={3}
              className={inputCls}
            />
          </div>
        )}
        {(has('button_text') || has('button_link')) && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <span className="block text-xs text-gray-500 mb-1">Texte du bouton</span>
              <input
                type="text"
                value={(val(block, 'button_text') as string) || ''}
                onChange={(e) => setField(block, 'button_text', e.target.value)}
                className={inputCls}
              />
            </div>
            <div>
              <span className="block text-xs text-gray-500 mb-1">Lien du bouton</span>
              <input
                type="text"
                value={(val(block, 'button_link') as string) || ''}
                onChange={(e) => setField(block, 'button_link', e.target.value)}
                className={inputCls}
              />
            </div>
          </div>
        )}
        {has('image_url') && (
          <ImageField
            url={(val(block, 'image_url') as string) || ''}
            uploading={uploading}
            onPick={(file) =>
              onUpload(block, file, (url) => setField(block, 'image_url', url))
            }
          />
        )}
        {has('images') && (
          <GalleryField
            images={(val(block, 'images') as string[]) || []}
            uploading={uploading}
            onChange={(next) => setField(block, 'images', next)}
            onUpload={(file, cb) => onUpload(block, file, cb)}
          />
        )}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
      {label}

      {type === 'title' && (
        <input
          type="text"
          value={(val(block, 'title') as string) || ''}
          onChange={(e) => setField(block, 'title', e.target.value)}
          className={inputCls}
          placeholder="(vide)"
        />
      )}

      {type === 'subtitle' && (
        <input
          type="text"
          value={(val(block, 'subtitle') as string) || ''}
          onChange={(e) => setField(block, 'subtitle', e.target.value)}
          className={inputCls}
        />
      )}

      {type === 'paragraph' && (
        <textarea
          value={(val(block, 'content') as string) || ''}
          onChange={(e) => setField(block, 'content', e.target.value)}
          rows={4}
          className={inputCls}
          placeholder="(vide)"
        />
      )}

      {type === 'feature' && (
        <div className="space-y-2">
          <input
            type="text"
            value={(val(block, 'title') as string) || ''}
            onChange={(e) => setField(block, 'title', e.target.value)}
            className={inputCls}
            placeholder="Titre"
          />
          <input
            type="text"
            value={(val(block, 'content') as string) || ''}
            onChange={(e) => setField(block, 'content', e.target.value)}
            className={inputCls}
            placeholder="Description courte"
          />
        </div>
      )}

      {type === 'button' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <span className="block text-xs text-gray-500 mb-1">Texte</span>
            <input
              type="text"
              value={(val(block, 'button_text') as string) || ''}
              onChange={(e) => setField(block, 'button_text', e.target.value)}
              className={inputCls}
            />
          </div>
          <div>
            <span className="block text-xs text-gray-500 mb-1">
              Lien (ex : /contact)
            </span>
            <input
              type="text"
              value={(val(block, 'button_link') as string) || ''}
              onChange={(e) => setField(block, 'button_link', e.target.value)}
              className={inputCls}
            />
          </div>
        </div>
      )}

      {type === 'image' && (
        <ImageField
          url={(val(block, 'image_url') as string) || ''}
          uploading={uploading}
          onPick={(file) =>
            onUpload(block, file, (url) => setField(block, 'image_url', url))
          }
        />
      )}

      {type === 'gallery' && (
        <GalleryField
          images={(val(block, 'images') as string[]) || []}
          uploading={uploading}
          onChange={(next) => setField(block, 'images', next)}
          onUpload={(file, cb) => onUpload(block, file, cb)}
        />
      )}
    </div>
  );
};

// --- Champ image unique ---
const ImageField: React.FC<{
  url: string;
  uploading: boolean;
  onPick: (file: File) => void;
}> = ({ url, uploading, onPick }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div className="flex items-center gap-4">
      <div className="w-28 h-28 rounded-xl bg-stone-100 border border-gray-200 overflow-hidden shrink-0 flex items-center justify-center">
        {url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={url} alt="" className="w-full h-full object-cover" />
        ) : (
          <ImageIcon className="w-8 h-8 text-gray-300" />
        )}
      </div>
      <div>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) onPick(f);
            e.target.value = '';
          }}
        />
        <button
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="flex items-center gap-2 px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-gray-700 rounded-xl text-sm font-medium transition-colors disabled:opacity-50"
        >
          {uploading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Upload className="w-4 h-4" strokeWidth={1.5} />
          )}
          {uploading ? 'Envoi…' : "Remplacer l'image"}
        </button>
        <p className="text-xs text-gray-400 mt-2">JPG, PNG, WebP…</p>
      </div>
    </div>
  );
};

// --- Champ galerie (liste d'images) ---
const GalleryField: React.FC<{
  images: string[];
  uploading: boolean;
  onChange: (next: string[]) => void;
  onUpload: (file: File, cb: (url: string) => void) => void;
}> = ({ images, uploading, onChange, onUpload }) => {
  const addRef = useRef<HTMLInputElement>(null);
  const replaceRef = useRef<HTMLInputElement>(null);
  const [replaceIndex, setReplaceIndex] = useState<number | null>(null);

  return (
    <div>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
        {images.map((src, i) => (
          <div
            key={i}
            className="relative group aspect-square rounded-xl overflow-hidden bg-stone-100 border border-gray-200"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <button
                onClick={() => {
                  setReplaceIndex(i);
                  replaceRef.current?.click();
                }}
                title="Remplacer"
                className="p-2 bg-white rounded-lg text-gray-700 hover:bg-gray-100"
              >
                <Upload className="w-4 h-4" strokeWidth={1.5} />
              </button>
              <button
                onClick={() => onChange(images.filter((_, j) => j !== i))}
                title="Supprimer"
                className="p-2 bg-white rounded-lg text-red-600 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4" strokeWidth={1.5} />
              </button>
            </div>
          </div>
        ))}

        <button
          onClick={() => addRef.current?.click()}
          disabled={uploading}
          className="aspect-square rounded-xl border-2 border-dashed border-gray-300 hover:border-primary-400 flex flex-col items-center justify-center text-gray-400 hover:text-primary-500 transition-colors disabled:opacity-50"
        >
          {uploading ? (
            <Loader2 className="w-6 h-6 animate-spin" />
          ) : (
            <>
              <Plus className="w-6 h-6" />
              <span className="text-xs mt-1">Ajouter</span>
            </>
          )}
        </button>
      </div>

      <input
        ref={addRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) onUpload(f, (url) => onChange([...images, url]));
          e.target.value = '';
        }}
      />
      <input
        ref={replaceRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f && replaceIndex !== null) {
            const idx = replaceIndex;
            onUpload(f, (url) =>
              onChange(images.map((s, j) => (j === idx ? url : s))),
            );
          }
          setReplaceIndex(null);
          e.target.value = '';
        }}
      />
    </div>
  );
};

export default PageManagement;
