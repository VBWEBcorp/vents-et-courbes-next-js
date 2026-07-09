import { getPagesBySection } from './supabaseAdmin';

export interface PageEntry {
  title: string | null;
  subtitle: string | null;
  content: string | null;
  button_text: string | null;
  button_link: string | null;
  image_url: string | null;
  images: string[] | null;
  page_name: string;
}

export type SectionContent = Record<string, PageEntry>;

export const getPageContentBySection = async (
  section: string,
): Promise<SectionContent> => {
  const { data, error } = await getPagesBySection(section, false);

  if (error || !data) {
    console.error(`Error loading content for section ${section}:`, error);
    return {};
  }

  const content: SectionContent = {};
  data.forEach((page) => {
    const key = page.page_key.replace(`${section}_`, '');
    content[key] = {
      title: page.title ?? null,
      subtitle: page.subtitle ?? null,
      content: page.content ?? null,
      button_text: page.button_text ?? null,
      button_link: page.button_link ?? null,
      image_url: (page as { image_url?: string }).image_url ?? null,
      images: (page as { images?: string[] }).images ?? null,
      page_name: page.page_name,
    };
  });

  return content;
};

/** Valeur image d'un bloc, avec repli sur l'image d'origine si non éditée. */
export const img = (
  entry: PageEntry | undefined,
  fallback: string = '',
): string => entry?.image_url || fallback;

/** Liste d'images d'un bloc (galerie), avec repli sur les images d'origine. */
export const imgs = (
  entry: PageEntry | undefined,
  fallback: string[] = [],
): string[] => {
  const list = entry?.images;
  return Array.isArray(list) && list.length > 0 ? list : fallback;
};

export const t = (
  entry: PageEntry | undefined,
  field: 'title' | 'subtitle' | 'content' | 'button_text' | 'button_link',
  fallback: string = '',
): string => {
  if (!entry) return fallback;
  return entry[field] || fallback;
};
