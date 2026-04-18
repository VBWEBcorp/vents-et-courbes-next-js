import { createClient } from '@supabase/supabase-js';
import { writeFileSync } from 'fs';
import 'dotenv/config';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);
const baseUrl = 'https://ventsetcourbes.org';
const today = new Date().toISOString().split('T')[0];

async function generate() {
  // Pages statiques
  const staticPages = [
    { loc: '/', priority: '1.0', freq: 'daily' },
    { loc: '/cours', priority: '0.9', freq: 'weekly' },
    { loc: '/stages', priority: '0.9', freq: 'weekly' },
    { loc: '/formation-pro', priority: '0.9', freq: 'weekly' },
    { loc: '/atelier-partage', priority: '0.8', freq: 'monthly' },
    { loc: '/atelier-partage/residence-illimitee', priority: '0.7', freq: 'monthly' },
    { loc: '/atelier-partage/residence-32-heures', priority: '0.7', freq: 'monthly' },
    { loc: '/atelier-partage/residence-16-heures', priority: '0.7', freq: 'monthly' },
    { loc: '/a-propos', priority: '0.7', freq: 'monthly' },
    { loc: '/contact', priority: '0.7', freq: 'monthly' },
    { loc: '/blog', priority: '0.8', freq: 'weekly' },
  ];

  // Articles de blog
  const { data: articles } = await supabase
    .from('blog_posts')
    .select('slug, updated_at, published_date')
    .eq('active', true)
    .order('published_date', { ascending: false });

  // Stages
  const { data: stages } = await supabase
    .from('stages')
    .select('reservation_slug, updated_at')
    .eq('active', true);

  // Cours
  const { data: cours } = await supabase
    .from('cours')
    .select('reservation_slug, updated_at')
    .eq('active', true);

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

  // Pages statiques
  for (const page of staticPages) {
    xml += `  <url>
    <loc>${baseUrl}${page.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.freq}</changefreq>
    <priority>${page.priority}</priority>
  </url>
`;
  }

  // Articles de blog
  for (const article of (articles || [])) {
    const lastmod = (article.updated_at || article.published_date || today).split('T')[0];
    xml += `  <url>
    <loc>${baseUrl}/blog/${article.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
`;
  }

  // Réservations stages
  for (const stage of (stages || [])) {
    const lastmod = (stage.updated_at || today).split('T')[0];
    xml += `  <url>
    <loc>${baseUrl}/reservation/${stage.reservation_slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
`;
  }

  // Réservations cours
  for (const c of (cours || [])) {
    const lastmod = (c.updated_at || today).split('T')[0];
    xml += `  <url>
    <loc>${baseUrl}/reservation/${c.reservation_slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
`;
  }

  xml += `</urlset>`;

  writeFileSync('public/sitemap.xml', xml);
  console.log(`Sitemap generated with ${staticPages.length + (articles?.length || 0) + (stages?.length || 0) + (cours?.length || 0)} URLs`);
}

generate().catch(console.error);
