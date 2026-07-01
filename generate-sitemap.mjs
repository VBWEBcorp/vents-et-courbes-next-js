import { MongoClient } from 'mongodb';
import { writeFileSync } from 'fs';
import 'dotenv/config';

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

  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  const db = client.db();

  const articles = await db
    .collection('blog_posts')
    .find({ active: true }, { projection: { slug: 1, updated_at: 1, published_date: 1 } })
    .sort({ published_date: -1 })
    .toArray();

  const stages = await db
    .collection('stages')
    .find({ active: true }, { projection: { reservation_slug: 1, updated_at: 1 } })
    .toArray();

  const cours = await db
    .collection('cours')
    .find({ active: true }, { projection: { reservation_slug: 1, updated_at: 1 } })
    .toArray();

  await client.close();

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
