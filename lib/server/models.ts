import { getDb } from './mongo';
import type { Collection, Document } from 'mongodb';

// ------------------------------------------------------------------
// Collections (mirror the former Supabase tables 1:1)
// ------------------------------------------------------------------
export const COLLECTIONS = {
  stages: 'stages',
  cours: 'cours',
  authors: 'authors',
  blogPosts: 'blog_posts',
  pages: 'pages',
  adminUsers: 'admin_users',
  settings: 'settings',
  atelierFormules: 'atelier_formules',
} as const;

// ------------------------------------------------------------------
// Document types — string `id` (kept from the Supabase export so blog
// author references stay valid). Mongo's own `_id` is never exposed.
// ------------------------------------------------------------------
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
  id: string;
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
  id: string;
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
  id: string;
  name: string;
  bio?: string;
  image_url?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ArticleBlog {
  id: string;
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

// Type de bloc éditable dans l'éditeur de pages. Détermine le contrôle
// affiché ET le champ qui porte la valeur.
export type PageFieldType =
  | 'title' // -> title
  | 'subtitle' // -> subtitle
  | 'paragraph' // -> content (multi-ligne)
  | 'button' // -> button_text (+ button_link si présent)
  | 'feature' // -> title + content (carte : titre + court texte)
  | 'compound' // -> tous les champs texte présents (titre + paragraphe + bouton)
  | 'image' // -> image_url
  | 'gallery'; // -> images[]

export interface PageContent {
  id: string;
  page_key: string;
  page_name: string;
  section: string;
  group?: string; // sous-section dans la page (ex: "Bannière", "Galerie")
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

export interface AdminUser {
  id: string;
  email: string;
  password_hash: string;
  role: string;
  created_at?: string;
}

// Paramètres généraux du site (coordonnées, horaires, footer). Document
// unique identifié par id = 'site'.
export interface SiteSettings {
  id: string;
  business_name: string;
  address: string;
  postal_code: string;
  city: string;
  country: string;
  phone: string; // format lien tel: ex "+33 6 80 89 39 27"
  phone_display: string; // format affiché ex "06 80 89 39 27"
  email: string;
  hours: Record<string, string[]>; // { lundi: ["14h – 17h", "19h – 22h"], ... }
  hours_note: string;
  rating_value?: string;
  rating_count?: string;
  updated_at?: string;
}

// Formule d'atelier partagé (résidence céramique). Éditable via l'admin.
export interface AtelierFormule {
  id: string;
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

export async function collection<T extends Document = Document>(
  name: string,
): Promise<Collection<T>> {
  const db = await getDb();
  return db.collection<T>(name);
}

// Strip Mongo's internal `_id` before sending a document to the client.
export function serialize<T extends { _id?: unknown }>(doc: T | null): Omit<T, '_id'> | null {
  if (!doc) return null;
  const { _id, ...rest } = doc as Record<string, unknown>;
  return rest as Omit<T, '_id'>;
}

export function serializeMany<T extends { _id?: unknown }>(docs: T[]): Omit<T, '_id'>[] {
  return docs.map((d) => serialize(d)!);
}
