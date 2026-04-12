import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types
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

// Authentication
export const signInAdmin = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};

export const signOutAdmin = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser();
  return { user, error };
};

// STAGES
export const getAllStages = async (includeInactive = false) => {
  let query = supabase
    .from('stages')
    .select('*')
    .order('order_index', { ascending: true });

  if (!includeInactive) {
    query = query.eq('active', true);
  }

  const { data, error } = await query;
  return { data, error };
};

export const getStageById = async (id: string) => {
  const { data, error } = await supabase
    .from('stages')
    .select('*')
    .eq('id', id)
    .single();
  return { data, error };
};

export const getStageBySlug = async (slug: string) => {
  const { data, error } = await supabase
    .from('stages')
    .select('*')
    .eq('reservation_slug', slug)
    .maybeSingle();
  return { data, error };
};

export const createStage = async (stage: Omit<Stage, 'id' | 'created_at' | 'updated_at'>) => {
  const { data, error } = await supabase
    .from('stages')
    .insert([stage])
    .select()
    .single();
  return { data, error };
};

export const updateStage = async (id: string, stage: Partial<Stage>) => {
  const { data, error } = await supabase
    .from('stages')
    .update(stage)
    .eq('id', id)
    .select()
    .single();
  return { data, error };
};

export const deleteStage = async (id: string) => {
  const { error } = await supabase
    .from('stages')
    .delete()
    .eq('id', id);
  return { error };
};

// COURS
export const getAllCours = async (includeInactive = false) => {
  let query = supabase
    .from('cours')
    .select('*')
    .order('order_index', { ascending: true });

  if (!includeInactive) {
    query = query.eq('active', true);
  }

  const { data, error } = await query;
  return { data, error };
};

export const getCoursById = async (id: string) => {
  const { data, error } = await supabase
    .from('cours')
    .select('*')
    .eq('id', id)
    .single();
  return { data, error };
};

export const getCoursBySlug = async (slug: string) => {
  const { data, error } = await supabase
    .from('cours')
    .select('*')
    .eq('reservation_slug', slug)
    .maybeSingle();
  return { data, error };
};

export const createCours = async (cours: Omit<Cours, 'id' | 'created_at' | 'updated_at'>) => {
  const { data, error } = await supabase
    .from('cours')
    .insert([cours])
    .select()
    .single();
  return { data, error };
};

export const updateCours = async (id: string, cours: Partial<Cours>) => {
  const { data, error } = await supabase
    .from('cours')
    .update(cours)
    .eq('id', id)
    .select()
    .single();
  return { data, error };
};

export const deleteCours = async (id: string) => {
  const { error } = await supabase
    .from('cours')
    .delete()
    .eq('id', id);
  return { error };
};

// AUTHORS
export const getAllAuteurs = async () => {
  const { data, error } = await supabase
    .from('authors')
    .select('*')
    .order('name', { ascending: true });
  return { data, error };
};

export const getAuteurById = async (id: string) => {
  const { data, error } = await supabase
    .from('authors')
    .select('*')
    .eq('id', id)
    .maybeSingle();
  return { data, error };
};

export const createAuteur = async (auteur: Omit<Auteur, 'id' | 'created_at' | 'updated_at'>) => {
  const { data, error } = await supabase
    .from('authors')
    .insert([auteur])
    .select()
    .single();
  return { data, error };
};

export const updateAuteur = async (id: string, auteur: Partial<Auteur>) => {
  const { data, error } = await supabase
    .from('authors')
    .update(auteur)
    .eq('id', id)
    .select()
    .single();
  return { data, error };
};

export const deleteAuteur = async (id: string) => {
  const { error } = await supabase
    .from('authors')
    .delete()
    .eq('id', id);
  return { error };
};

// BLOG POSTS
export const getAllArticles = async (includeUnpublished = false) => {
  let query = supabase
    .from('blog_posts')
    .select(`
      *,
      author:authors(*)
    `)
    .order('published_date', { ascending: false });

  if (!includeUnpublished) {
    query = query.eq('active', true);
  }

  const { data, error } = await query;
  return { data, error };
};

export const getArticleBySlug = async (slug: string) => {
  const { data, error } = await supabase
    .from('blog_posts')
    .select(`
      *,
      author:authors(*)
    `)
    .eq('slug', slug)
    .eq('active', true)
    .maybeSingle();
  return { data, error };
};

export const getArticleById = async (id: string) => {
  const { data, error } = await supabase
    .from('blog_posts')
    .select(`
      *,
      author:authors(*)
    `)
    .eq('id', id)
    .maybeSingle();
  return { data, error };
};

export const createArticle = async (article: Omit<ArticleBlog, 'id' | 'created_at' | 'updated_at' | 'author'>) => {
  const { data, error } = await supabase
    .from('blog_posts')
    .insert([article])
    .select()
    .single();
  return { data, error };
};

export const updateArticle = async (id: string, article: Partial<Omit<ArticleBlog, 'author'>>) => {
  const { data, error } = await supabase
    .from('blog_posts')
    .update(article)
    .eq('id', id)
    .select()
    .single();
  return { data, error };
};

export const deleteArticle = async (id: string) => {
  const { error } = await supabase
    .from('blog_posts')
    .delete()
    .eq('id', id);
  return { error };
};

// STORAGE - Upload d'images
export const uploadImage = async (file: File, bucket: string = 'images') => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
  const filePath = `${fileName}`;

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(filePath, file);

  if (error) {
    return { data: null, error };
  }

  const { data: { publicUrl } } = supabase.storage
    .from(bucket)
    .getPublicUrl(filePath);

  return { data: { path: filePath, url: publicUrl }, error: null };
};

export const deleteImage = async (path: string, bucket: string = 'images') => {
  const { error } = await supabase.storage
    .from(bucket)
    .remove([path]);
  return { error };
};

// PAGES MANAGEMENT
export interface PageContent {
  id?: string;
  page_key: string;
  page_name: string;
  section: string;
  title?: string;
  subtitle?: string;
  content?: string;
  button_text?: string;
  button_link?: string;
  order_index: number;
  active: boolean;
  created_at?: string;
  updated_at?: string;
}

export const getAllPages = async (includeInactive = false) => {
  let query = supabase
    .from('pages')
    .select('*')
    .order('section', { ascending: true })
    .order('order_index', { ascending: true });

  if (!includeInactive) {
    query = query.eq('active', true);
  }

  const { data, error } = await query;
  return { data, error };
};

export const getPageByKey = async (pageKey: string) => {
  const { data, error } = await supabase
    .from('pages')
    .select('*')
    .eq('page_key', pageKey)
    .maybeSingle();
  return { data, error };
};

export const getPagesBySection = async (section: string, includeInactive = false) => {
  let query = supabase
    .from('pages')
    .select('*')
    .eq('section', section)
    .order('order_index', { ascending: true });

  if (!includeInactive) {
    query = query.eq('active', true);
  }

  const { data, error } = await query;
  return { data, error };
};

export const createPage = async (page: Omit<PageContent, 'id' | 'created_at' | 'updated_at'>) => {
  const { data, error } = await supabase
    .from('pages')
    .insert([page])
    .select()
    .single();
  return { data, error };
};

export const updatePage = async (id: string, page: Partial<PageContent>) => {
  const { data, error } = await supabase
    .from('pages')
    .update({ ...page, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
  return { data, error };
};

export const deletePage = async (id: string) => {
  const { error } = await supabase
    .from('pages')
    .delete()
    .eq('id', id);
  return { error };
};
