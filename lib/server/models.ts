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
} as const;

// ------------------------------------------------------------------
// Document types — string `id` (kept from the Supabase export so blog
// author references stay valid). Mongo's own `_id` is never exposed.
// ------------------------------------------------------------------
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

export interface PageContent {
  id: string;
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

export interface AdminUser {
  id: string;
  email: string;
  password_hash: string;
  role: string;
  created_at?: string;
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
