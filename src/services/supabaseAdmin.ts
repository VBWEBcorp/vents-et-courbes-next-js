// ------------------------------------------------------------------
// Client API (remplace l'ancien SDK Supabase).
// Le site étant exporté en statique, toutes les données transitent par
// les Netlify Functions (/.netlify/functions/*, alias /api/*).
// Les noms d'exports et la forme { data, error } sont conservés à
// l'identique pour ne pas toucher aux composants consommateurs.
// ------------------------------------------------------------------

// Chemin canonique des Netlify Functions (fonctionne en local `netlify dev`
// ET en prod). L'alias /api/* existe aussi via netlify.toml mais n'est pas
// honoré par `netlify dev`, d'où l'usage direct ici.
const API_BASE = '/.netlify/functions';
const TOKEN_KEY = 'vc_admin_token';

// -------------------------------- Types ---------------------------------
export interface MonclubCreneau {
  date: string;
  start: string;
  end: string;
  places: number | null;
  label: string;
}

export interface MonclubSession {
  monclub_id: string;
  label: string;
  price: string;
  date_debut: string;
  date_fin: string;
  lieu?: string;
  creneaux: MonclubCreneau[];
}

export interface Stage {
  id?: string;
  title: string;
  duration: string;
  level: string;
  image_url: string;
  description: string;
  includes: string;
  price: string;
  additional_price?: string;
  additional_text: string;
  opco?: string;
  reservation_url?: string;
  reservation_slug: string;
  widget_id: string;
  has_cuisson: boolean;
  order_index: number;
  active: boolean;
  monclub_url?: string;
  monclub_ids?: string[];
  sessions?: MonclubSession[];
  cpf_link?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Cours {
  id?: string;
  title: string;
  duration: string;
  level: string;
  image_url: string;
  description: string;
  includes: string;
  price: string;
  additional_price?: string;
  additional_text: string;
  opco?: string;
  reservation_slug: string;
  widget_id: string;
  has_cuisson: boolean;
  order_index: number;
  active: boolean;
  monclub_url?: string;
  monclub_ids?: string[];
  sessions?: MonclubSession[];
  cpf_link?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Auteur {
  id?: string;
  name: string;
  bio?: string;
  image_url?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ArticleBlog {
  id?: string;
  title: string;
  slug: string;
  published_date: string;
  author_id?: string;
  author?: Auteur;
  image_url: string;
  excerpt: string;
  content: string;
  seo_title?: string;
  seo_description?: string;
  active: boolean;
  order_index: number;
  created_at?: string;
  updated_at?: string;
}

export type PageFieldType =
  | 'title'
  | 'subtitle'
  | 'paragraph'
  | 'button'
  | 'feature'
  | 'compound'
  | 'image'
  | 'gallery';

export interface PageContent {
  id?: string;
  page_key: string;
  page_name: string;
  section: string;
  group?: string;
  field_type?: PageFieldType;
  title?: string;
  subtitle?: string;
  content?: string;
  button_text?: string;
  button_link?: string;
  image_url?: string;
  images?: string[];
  order_index: number;
  active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface SiteSettings {
  id?: string;
  business_name: string;
  address: string;
  postal_code: string;
  city: string;
  country: string;
  phone: string;
  phone_display: string;
  email: string;
  hours: Record<string, string[]>;
  hours_note: string;
  rating_value?: string;
  rating_count?: string;
  updated_at?: string;
}

export interface AtelierFormuleDoc {
  id?: string;
  slug: string;
  name: string;
  title: string;
  subtitle: string;
  price: string;
  engagement_bonus: string;
  bonus_value: string;
  monclub_url?: string;
  monclub_id?: string;
  description: string;
  includes: string;
  seo_title: string;
  seo_description: string;
  popular: boolean;
  order_index: number;
  active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface ApiError {
  message: string;
}

interface Result<T> {
  data: T | null;
  error: ApiError | null;
}

// ------------------------------ Token ----------------------------------
function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return window.localStorage.getItem(TOKEN_KEY);
}

function setToken(token: string | null) {
  if (typeof window === 'undefined') return;
  if (token) window.localStorage.setItem(TOKEN_KEY, token);
  else window.localStorage.removeItem(TOKEN_KEY);
}

// ---------------------------- Fetch helper -----------------------------
async function api<T = any>(
  path: string,
  options: RequestInit = {},
): Promise<Result<T>> {
  try {
    const headers: Record<string, string> = {
      ...(options.headers as Record<string, string>),
    };
    if (options.body) headers['Content-Type'] = 'application/json';
    const token = getToken();
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const res = await fetch(`${API_BASE}${path}`, { ...options, headers });

    if (res.status === 204) return { data: null, error: null };

    const payload = await res.json().catch(() => null);
    if (!res.ok) {
      return {
        data: null,
        error: { message: payload?.error || `Erreur ${res.status}` },
      };
    }
    return { data: payload as T, error: null };
  } catch (e) {
    return { data: null, error: { message: (e as Error).message } };
  }
}

function qs(params: Record<string, string | boolean | undefined>): string {
  const entries = Object.entries(params).filter(
    ([, v]) => v !== undefined && v !== false,
  );
  if (!entries.length) return '';
  return (
    '?' +
    entries.map(([k, v]) => `${k}=${encodeURIComponent(String(v))}`).join('&')
  );
}

// ------------------------------ Auth -----------------------------------
export const signInAdmin = async (email: string, password: string) => {
  const { data, error } = await api<{ token: string; user: any }>('/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  if (error || !data) {
    return { data: { user: null }, error: error || { message: 'Échec' } };
  }
  setToken(data.token);
  return { data: { user: data.user }, error: null };
};

export const signOutAdmin = async () => {
  setToken(null);
  return { error: null };
};

export const getCurrentUser = async () => {
  if (!getToken()) return { user: null, error: null };
  const { data, error } = await api<{ user: any }>('/me');
  if (error || !data) {
    if (error) setToken(null); // token invalide/expiré → nettoyage
    return { user: null, error };
  }
  return { user: data.user, error: null };
};

// ------------------------------ Stages ---------------------------------
export const getAllStages = (includeInactive = false) =>
  api<Stage[]>(`/stages${qs({ includeInactive })}`);

export const getStageById = (id: string) =>
  api<Stage>(`/stages${qs({ id })}`);

export const getStageBySlug = (slug: string) =>
  api<Stage>(`/stages${qs({ slug })}`);

export const createStage = (
  stage: Omit<Stage, 'id' | 'created_at' | 'updated_at'>,
) => api<Stage>('/stages', { method: 'POST', body: JSON.stringify(stage) });

export const updateStage = (id: string, stage: Partial<Stage>) =>
  api<Stage>(`/stages${qs({ id })}`, {
    method: 'PUT',
    body: JSON.stringify(stage),
  });

export const deleteStage = (id: string) =>
  api(`/stages${qs({ id })}`, { method: 'DELETE' });

// ------------------------------ Cours ----------------------------------
export const getAllCours = (includeInactive = false) =>
  api<Cours[]>(`/cours${qs({ includeInactive })}`);

export const getCoursById = (id: string) => api<Cours>(`/cours${qs({ id })}`);

export const getCoursBySlug = (slug: string) =>
  api<Cours>(`/cours${qs({ slug })}`);

export const createCours = (
  cours: Omit<Cours, 'id' | 'created_at' | 'updated_at'>,
) => api<Cours>('/cours', { method: 'POST', body: JSON.stringify(cours) });

export const updateCours = (id: string, cours: Partial<Cours>) =>
  api<Cours>(`/cours${qs({ id })}`, {
    method: 'PUT',
    body: JSON.stringify(cours),
  });

export const deleteCours = (id: string) =>
  api(`/cours${qs({ id })}`, { method: 'DELETE' });

// ------------------------------ Authors --------------------------------
export const getAllAuteurs = () => api<Auteur[]>('/authors');

export const getAuteurById = (id: string) =>
  api<Auteur>(`/authors${qs({ id })}`);

export const createAuteur = (
  auteur: Omit<Auteur, 'id' | 'created_at' | 'updated_at'>,
) => api<Auteur>('/authors', { method: 'POST', body: JSON.stringify(auteur) });

export const updateAuteur = (id: string, auteur: Partial<Auteur>) =>
  api<Auteur>(`/authors${qs({ id })}`, {
    method: 'PUT',
    body: JSON.stringify(auteur),
  });

export const deleteAuteur = (id: string) =>
  api(`/authors${qs({ id })}`, { method: 'DELETE' });

// ------------------------------ Blog -----------------------------------
export const getAllArticles = (includeUnpublished = false) =>
  api<ArticleBlog[]>(`/blog${qs({ includeUnpublished })}`);

export const getArticleBySlug = (slug: string) =>
  api<ArticleBlog>(`/blog${qs({ slug })}`);

export const getArticleById = (id: string) =>
  api<ArticleBlog>(`/blog${qs({ id })}`);

export const createArticle = (
  article: Omit<ArticleBlog, 'id' | 'created_at' | 'updated_at' | 'author'>,
) => api<ArticleBlog>('/blog', { method: 'POST', body: JSON.stringify(article) });

export const updateArticle = (
  id: string,
  article: Partial<Omit<ArticleBlog, 'author'>>,
) =>
  api<ArticleBlog>(`/blog${qs({ id })}`, {
    method: 'PUT',
    body: JSON.stringify(article),
  });

export const deleteArticle = (id: string) =>
  api(`/blog${qs({ id })}`, { method: 'DELETE' });

// ------------------------------ Storage (R2) ---------------------------
function fileToBase64(
  file: File,
): Promise<{ data: string; contentType: string }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string; // data:<mime>;base64,XXXX
      resolve({ data: result.split(',')[1], contentType: file.type });
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// bucket param conservé pour compat de signature (ignoré : un seul bucket R2)
export const uploadImage = async (file: File, _bucket = 'images') => {
  try {
    const { data: base64, contentType } = await fileToBase64(file);
    const { data, error } = await api<{ path: string; url: string }>('/upload', {
      method: 'POST',
      body: JSON.stringify({
        filename: file.name,
        contentType,
        data: base64,
      }),
    });
    if (error || !data) return { data: null, error: error || { message: 'Échec upload' } };
    return { data: { path: data.path, url: data.url }, error: null };
  } catch (e) {
    return { data: null, error: { message: (e as Error).message } };
  }
};

export const deleteImage = (path: string, _bucket = 'images') =>
  api(`/upload${qs({ key: path })}`, { method: 'DELETE' });

// ------------------------------ Pages ----------------------------------
export const getAllPages = (includeInactive = false) =>
  api<PageContent[]>(`/pages${qs({ includeInactive })}`);

export const getPageByKey = (pageKey: string) =>
  api<PageContent>(`/pages${qs({ key: pageKey })}`);

export const getPagesBySection = (section: string, includeInactive = false) =>
  api<PageContent[]>(`/pages${qs({ section, includeInactive })}`);

export const createPage = (
  page: Omit<PageContent, 'id' | 'created_at' | 'updated_at'>,
) => api<PageContent>('/pages', { method: 'POST', body: JSON.stringify(page) });

export const updatePage = (id: string, page: Partial<PageContent>) =>
  api<PageContent>(`/pages${qs({ id })}`, {
    method: 'PUT',
    body: JSON.stringify(page),
  });

export const deletePage = (id: string) =>
  api(`/pages${qs({ id })}`, { method: 'DELETE' });

// ------------------------------ Settings -------------------------------
export const getSiteSettings = () => api<SiteSettings | null>('/settings');

export const updateSiteSettings = (settings: Partial<SiteSettings>) =>
  api<SiteSettings>('/settings', {
    method: 'PUT',
    body: JSON.stringify(settings),
  });

// -------------------------- Atelier formules ---------------------------
export const getAllAtelierFormules = (includeInactive = false) =>
  api<AtelierFormuleDoc[]>(`/atelier-formules${qs({ includeInactive })}`);

export const getAtelierFormuleBySlugApi = (slug: string) =>
  api<AtelierFormuleDoc>(`/atelier-formules${qs({ slug })}`);

export const createAtelierFormule = (
  formule: Omit<AtelierFormuleDoc, 'id' | 'created_at' | 'updated_at'>,
) =>
  api<AtelierFormuleDoc>('/atelier-formules', {
    method: 'POST',
    body: JSON.stringify(formule),
  });

export const updateAtelierFormule = (
  id: string,
  formule: Partial<AtelierFormuleDoc>,
) =>
  api<AtelierFormuleDoc>(`/atelier-formules${qs({ id })}`, {
    method: 'PUT',
    body: JSON.stringify(formule),
  });

export const deleteAtelierFormule = (id: string) =>
  api(`/atelier-formules${qs({ id })}`, { method: 'DELETE' });
