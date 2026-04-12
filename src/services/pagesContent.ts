import { supabase } from './supabaseAdmin';

export interface PageEntry {
  title: string | null;
  subtitle: string | null;
  content: string | null;
  button_text: string | null;
  button_link: string | null;
  page_name: string;
}

export type SectionContent = Record<string, PageEntry>;

export const getPageContentBySection = async (section: string): Promise<SectionContent> => {
  const { data, error } = await supabase
    .from('pages')
    .select('*')
    .eq('section', section)
    .eq('active', true)
    .order('order_index', { ascending: true });

  if (error || !data) {
    console.error(`Error loading content for section ${section}:`, error);
    return {};
  }

  const content: SectionContent = {};
  data.forEach(page => {
    const key = page.page_key.replace(`${section}_`, '');
    content[key] = {
      title: page.title,
      subtitle: page.subtitle,
      content: page.content,
      button_text: page.button_text,
      button_link: page.button_link,
      page_name: page.page_name
    };
  });

  return content;
};

export const t = (entry: PageEntry | undefined, field: 'title' | 'subtitle' | 'content' | 'button_text' | 'button_link', fallback: string = ''): string => {
  if (!entry) return fallback;
  return entry[field] || fallback;
};
