import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST_DIR = resolve(__dirname, 'dist');

const envPath = resolve(__dirname, '.env');
const env = { ...process.env };
if (existsSync(envPath)) {
  const envContent = readFileSync(envPath, 'utf-8');
  envContent.split('\n').forEach(line => {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) env[match[1].trim()] = match[2].trim();
  });
}

const SUPABASE_URL = env.VITE_SUPABASE_URL;
const SUPABASE_KEY = env.VITE_SUPABASE_ANON_KEY;
const BASE_URL = 'https://ventsetcourbes.org';

function esc(text) {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

async function supabaseFetch(path) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
    }
  });
  if (!res.ok) {
    console.warn(`  Warning: Failed to fetch ${path}: ${res.status}`);
    return [];
  }
  return res.json();
}

const NAV = `<header><nav aria-label="Navigation principale">
<a href="/">Accueil</a>
<a href="/cours">Cours de ceramique</a>
<a href="/stages">Stages ceramique</a>
<a href="/formation-pro">Formation professionnelle</a>
<a href="/a-propos">A propos</a>
<a href="/contact">Contact</a>
<a href="/blog">Blog</a>
</nav></header>`;

const FOOTER = `<footer>
<p>Atelier Vents et Courbes - Centre de formation ceramique certifie Qualiopi</p>
<p>33 Rue Danton, 93310 Le Pre-Saint-Gervais</p>
<p>Tel: <a href="tel:+33680893927">06 80 89 39 27</a> - Email: <a href="mailto:contact@ventsetcourbes.org">contact@ventsetcourbes.org</a></p>
<nav aria-label="Liens du site">
<a href="/">Accueil</a>
<a href="/cours">Cours ceramique</a>
<a href="/stages">Stages ceramique</a>
<a href="/formation-pro">Formation professionnelle CAP</a>
<a href="/a-propos">A propos</a>
<a href="/contact">Contact</a>
<a href="/blog">Blog</a>
</nav>
</footer>`;

function buildPage(template, { title, description, canonical, ogTitle, ogDescription, content }) {
  let html = template;

  html = html.replace(/<title>[^<]*<\/title>/, `<title>${esc(title)}</title>`);

  html = html.replace(
    /<meta name="description" content="[^"]*">/,
    `<meta name="description" content="${esc(description)}">`
  );

  html = html.replace(
    /<link rel="canonical" href="[^"]*">/,
    `<link rel="canonical" href="${canonical}">`
  );

  html = html.replace(
    /<meta property="og:title" content="[^"]*">/,
    `<meta property="og:title" content="${esc(ogTitle || title)}">`
  );
  html = html.replace(
    /<meta property="og:description" content="[^"]*">/,
    `<meta property="og:description" content="${esc(ogDescription || description)}">`
  );
  html = html.replace(
    /<meta property="og:url" content="[^"]*">/,
    `<meta property="og:url" content="${canonical}">`
  );

  html = html.replace(
    /<meta name="twitter:title" content="[^"]*">/,
    `<meta name="twitter:title" content="${esc(ogTitle || title)}">`
  );
  html = html.replace(
    /<meta name="twitter:description" content="[^"]*">/,
    `<meta name="twitter:description" content="${esc(ogDescription || description)}">`
  );
  html = html.replace(
    /<meta name="twitter:url" content="[^"]*">/,
    `<meta name="twitter:url" content="${canonical}">`
  );

  html = html.replace(
    '<div id="root"></div>',
    `<div id="root"><div style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap">${content}</div></div>`
  );

  return html;
}

function savePage(route, html) {
  const dir = route === '/' ? DIST_DIR : resolve(DIST_DIR, route.slice(1));
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
  writeFileSync(resolve(dir, 'index.html'), html);
  console.log(`  OK: ${route}`);
}

async function prerender() {
  console.log('Prerendering static HTML pages...\n');

  if (!existsSync(resolve(DIST_DIR, 'index.html'))) {
    console.error('Error: dist/index.html not found. Run vite build first.');
    process.exit(1);
  }

  const template = readFileSync(resolve(DIST_DIR, 'index.html'), 'utf-8');

  const [pagesData, coursData, stagesData, blogData] = await Promise.all([
    supabaseFetch('pages?active=eq.true&order=order_index'),
    supabaseFetch('cours?active=eq.true&order=order_index&select=title,description,price,duration,level'),
    supabaseFetch('stages?active=eq.true&order=order_index&select=title,description,price,duration,level'),
    supabaseFetch('blog_posts?active=eq.true&order=published_date.desc&select=slug,title,excerpt,seo_title,seo_description,content,published_date,author_id,author:authors(name)'),
  ]);

  const sections = {};
  pagesData.forEach(p => {
    if (!sections[p.section]) sections[p.section] = [];
    sections[p.section].push(p);
  });

  const sectionContent = (section) => {
    const items = sections[section] || [];
    let html = '';
    items.forEach(item => {
      if (item.title) html += `<h2>${esc(item.title)}</h2>\n`;
      if (item.subtitle) html += `<p><strong>${esc(item.subtitle)}</strong></p>\n`;
      if (item.content) html += `<p>${esc(item.content)}</p>\n`;
    });
    return html;
  };

  // === HOME ===
  savePage('/', buildPage(template, {
    title: 'Ceramique Le Pre-Saint-Gervais - Atelier Vents et Courbes Paris | Cours Tournage Modelage',
    description: 'Ceramique au Pre-Saint-Gervais : Atelier Vents et Courbes, centre de formation certifie Qualiopi. Cours de tournage, modelage ceramique, stages intensifs et formations professionnelles CAP. 4,9\u2605 (938 avis) - 33 Rue Danton, Paris.',
    canonical: `${BASE_URL}/`,
    content: `${NAV}<main>
<h1>Atelier Vents et Courbes - Ceramique au Pre-Saint-Gervais</h1>
${sectionContent('home')}
<section><h2>Nos cours de ceramique</h2>
<p>Decouvrez nos <a href="/cours">cours de tournage et modelage</a> pour tous niveaux.</p></section>
<section><h2>Stages intensifs</h2>
<p>Participez a nos <a href="/stages">stages de ceramique</a> le week-end ou en semaine.</p></section>
<section><h2>Formation professionnelle</h2>
<p>Preparez votre <a href="/formation-pro">CAP ceramique</a> avec notre centre certifie Qualiopi.</p></section>
<section><h2>Blog</h2>
<p>Retrouvez nos <a href="/blog">articles et actualites</a> sur la ceramique.</p></section>
</main>${FOOTER}`,
  }));

  // === COURS ===
  let coursHtml = '';
  coursData.forEach(c => {
    coursHtml += `<article><h3>${esc(c.title)}</h3>
<p>${esc(c.description)}</p>
<p>Duree: ${esc(c.duration)} | Niveau: ${esc(c.level)} | Prix: ${esc(c.price)}</p></article>\n`;
  });
  savePage('/cours', buildPage(template, {
    title: 'Loisirs Ceramique Paris - Tournage Modelage Le Pre-Saint-Gervais | Atelier Vents et Courbes',
    description: 'Loisirs ceramique au Pre-Saint-Gervais : tournage, modelage pour tous niveaux. Formation trimestrielle, annuelle, cours d\'essai. Centre certifie Qualiopi. Reservation en ligne disponible.',
    canonical: `${BASE_URL}/cours`,
    content: `${NAV}<main>
<h1>Cours de ceramique - Tournage et Modelage</h1>
${sectionContent('cours')}
<section><h2>Nos formules de cours</h2>
${coursHtml}</section>
<p><a href="/stages">Decouvrir nos stages</a> | <a href="/formation-pro">Formation professionnelle</a> | <a href="/contact">Nous contacter</a></p>
</main>${FOOTER}`,
  }));

  // === STAGES ===
  let stagesHtml = '';
  stagesData.forEach(s => {
    stagesHtml += `<article><h3>${esc(s.title)}</h3>
<p>${esc(s.description)}</p>
<p>Duree: ${esc(s.duration)} | Niveau: ${esc(s.level)} | Prix: ${esc(s.price)}</p></article>\n`;
  });
  savePage('/stages', buildPage(template, {
    title: 'Stages Ceramique Paris - Intensifs Tournage Modelage | Le Pre-Saint-Gervais',
    description: 'Stages intensifs ceramique au Pre-Saint-Gervais : tournage, modelage, emaillage. Weekends et semaines completes. Carte cadeau disponible. Atelier Vents et Courbes Paris.',
    canonical: `${BASE_URL}/stages`,
    content: `${NAV}<main>
<h1>Stages de ceramique intensifs - Tournage et Modelage</h1>
${sectionContent('stages')}
<section><h2>Nos stages</h2>
${stagesHtml}</section>
<p><a href="/cours">Decouvrir nos cours</a> | <a href="/formation-pro">Formation professionnelle</a> | <a href="/contact">Nous contacter</a></p>
</main>${FOOTER}`,
  }));

  // === FORMATION PRO ===
  savePage('/formation-pro', buildPage(template, {
    title: 'Formation Professionnelle Ceramique CAP - Centre Certifie Qualiopi Le Pre-Saint-Gervais',
    description: 'Formation professionnelle CAP ceramique certifiee Qualiopi au Pre-Saint-Gervais. CAP Tournage, formation Createur ceramique. Financement CPF, OPCO. 571h de formation professionnalisante.',
    canonical: `${BASE_URL}/formation-pro`,
    content: `${NAV}<main>
<h1>Formation professionnelle ceramique - CAP Tournage</h1>
${sectionContent('formation_pro')}
<section>
<h2>Centre de formation certifie Qualiopi</h2>
<p>Vents et Courbes est un organisme de formation certifie Qualiopi. Nos formations professionnelles sont eligibles aux financements OPCO, CPF, Transition Pro.</p>
<h2>Formation CAP Tournage en ceramique</h2>
<p>Preparez le CAP Tournage en ceramique avec un accompagnement personnalise. 571h de formation professionnalisante.</p>
</section>
<p><a href="/cours">Decouvrir nos cours</a> | <a href="/stages">Nos stages</a> | <a href="/contact">Demander un devis</a></p>
</main>${FOOTER}`,
  }));

  // === ATELIER PARTAGE ===
  savePage('/atelier-partage', buildPage(template, {
    title: 'Atelier Partage Ceramique Paris - Residence Ceramique | Le Pre-Saint-Gervais',
    description: 'Atelier partage ceramique au Pre-Saint-Gervais : espace de 100 m2, 8 tours, emaillage compris. 3 formules de 100 a 300 EUR/mois. Acces libre 7j/7. Vents et Courbes.',
    canonical: `${BASE_URL}/atelier-partage`,
    content: `${NAV}<main>
<h1>Atelier Partage Ceramique - Residence Ceramique</h1>
<section>
<h2>Un espace de creation equipe</h2>
<p>Profitez de notre atelier equipe de 100 m2 pour creer en toute liberte avec nos 3 formules : Illimite (300 EUR/mois), 32 heures (200 EUR/mois), 16 heures (100 EUR/mois).</p>
<p>L'espace comprend : 8 tours, espaces de stockage, table de petrissage, petit outillage, emaillage compris.</p>
<h2>Nos Formules</h2>
<p>Tout Illimite : 300 EUR/mois - Avec engagement 10-12 mois : 1 stage de tournage de 18h offert (valeur 340 EUR).</p>
<p>32 Heures par mois : 200 EUR/mois - Avec engagement 10-12 mois : 4 cours de modelage ou tournage offerts (valeur 220 EUR).</p>
<p>16 Heures par mois : 100 EUR/mois - Avec engagement 10-12 mois : 1 stage de modelage ou pose d'email (valeur 165 EUR).</p>
<h2>Horaires</h2>
<p>Lundi : 07h-23h | Mardi : 07h-13h et 17h-23h | Mercredi : 13h-19h | Jeudi : 07h-19h | Vendredi : 07h-23h | Samedi : 13h-23h | Dimanche : 07h-23h</p>
<h2>Tarifs cuisson</h2>
<p>2 cuissons biscuit + email perso : 12 EUR/kg | 2 cuissons biscuit + email atelier : 15 EUR/kg | 1 cuisson biscuit : 9 EUR/kg | Four entier : 110-125 EUR</p>
</section>
<p><a href="/cours">Nos cours</a> | <a href="/stages">Nos stages</a> | <a href="/contact">Nous contacter</a></p>
</main>${FOOTER}`,
  }));

  // === A PROPOS ===
  savePage('/a-propos', buildPage(template, {
    title: 'A Propos Ceramique Paris - Histoire Atelier Vents et Courbes Le Pre-Saint-Gervais',
    description: 'A propos de l\'Atelier Vents et Courbes : histoire, equipe et savoir-faire ceramique au Pre-Saint-Gervais depuis 2015. Centre de formation certifie Qualiopi avec Philippe Paumier et son equipe d\'experts.',
    canonical: `${BASE_URL}/a-propos`,
    content: `${NAV}<main>
<h1>Notre histoire - Atelier Vents et Courbes</h1>
${sectionContent('about')}
<section>
<h2>Un atelier de ceramique aux portes de Paris</h2>
<p>Fonde en 2015 par Philippe Paumier, Vents et Courbes est un espace de creation dedie a la ceramique situe au Pre-Saint-Gervais.</p>
<p>L'atelier offre un espace de 100 m2 dedie a la creation : salle de tournage, salle de modelage et de decoration, espace de cuisson.</p>
</section>
<p><a href="/cours">Nos cours</a> | <a href="/stages">Nos stages</a> | <a href="/formation-pro">Formation pro</a> | <a href="/contact">Contact</a></p>
</main>${FOOTER}`,
  }));

  // === CONTACT ===
  savePage('/contact', buildPage(template, {
    title: 'Contact Atelier Ceramique - Vents et Courbes Le Pre-Saint-Gervais | 06 80 89 39 27',
    description: 'Contactez l\'Atelier Vents et Courbes ceramique au Pre-Saint-Gervais. 33 Rue Danton, 93310. Tel: 06 80 89 39 27. Email: contact@ventsetcourbes.org. Formulaire de contact et plan d\'acces.',
    canonical: `${BASE_URL}/contact`,
    content: `${NAV}<main>
<h1>Contactez l'Atelier Vents et Courbes</h1>
${sectionContent('contact')}
<section>
<h2>Nos coordonnees</h2>
<p><strong>Adresse :</strong> 33 Rue Danton, 93310 Le Pre-Saint-Gervais</p>
<p><strong>Telephone :</strong> <a href="tel:+33680893927">06 80 89 39 27</a></p>
<p><strong>Email :</strong> <a href="mailto:contact@ventsetcourbes.org">contact@ventsetcourbes.org</a></p>
<h2>Acces</h2>
<p>Metro lignes 5 et 11, Tram T3, Bus 48/61/170</p>
</section>
<p><a href="/">Retour a l'accueil</a> | <a href="/cours">Nos cours</a> | <a href="/stages">Nos stages</a></p>
</main>${FOOTER}`,
  }));

  // === BLOG INDEX ===
  let blogListHtml = '';
  blogData.forEach(post => {
    const authorName = post.author?.name || 'Atelier Vents et Courbes';
    blogListHtml += `<article>
<h2><a href="/blog/${esc(post.slug)}">${esc(post.title)}</a></h2>
<p>${esc(post.excerpt)}</p>
<p>Par ${esc(authorName)} - ${post.published_date}</p>
</article>\n`;
  });
  savePage('/blog', buildPage(template, {
    title: 'Blog Ceramique Paris - Actualites Atelier Vents et Courbes Le Pre-Saint-Gervais',
    description: 'Blog ceramique de l\'Atelier Vents et Courbes au Pre-Saint-Gervais : actualites, conseils tournage, techniques modelage, nouveautes formation ceramique Paris.',
    canonical: `${BASE_URL}/blog`,
    content: `${NAV}<main>
<h1>Blog ceramique - Actualites et conseils</h1>
${sectionContent('blog')}
<section>
${blogListHtml || '<p>Aucun article pour le moment.</p>'}
</section>
<p><a href="/">Retour a l'accueil</a></p>
</main>${FOOTER}`,
  }));

  // === BLOG POSTS ===
  for (const post of blogData) {
    const authorName = post.author?.name || 'Atelier Vents et Courbes';
    const seoTitle = post.seo_title || `Ceramique ${post.title} - Blog Atelier Vents et Courbes Le Pre-Saint-Gervais`;
    const seoDesc = post.seo_description || `Ceramique : ${post.excerpt} - Article du blog de l'Atelier Vents et Courbes au Pre-Saint-Gervais.`;

    const contentParagraphs = (post.content || '')
      .split('\n')
      .filter(p => p.trim())
      .map(p => `<p>${esc(p)}</p>`)
      .join('\n');

    savePage(`/blog/${post.slug}`, buildPage(template, {
      title: seoTitle,
      description: seoDesc,
      canonical: `${BASE_URL}/blog/${post.slug}`,
      content: `${NAV}<main>
<nav aria-label="Fil d'ariane"><a href="/">Accueil</a> &gt; <a href="/blog">Blog</a> &gt; ${esc(post.title)}</nav>
<article>
<h1>${esc(post.title)}</h1>
<p><strong>${esc(post.excerpt)}</strong></p>
<p>Par ${esc(authorName)} - Publie le ${post.published_date}</p>
<div>${contentParagraphs}</div>
</article>
<p><a href="/blog">Retour aux articles</a> | <a href="/">Accueil</a></p>
</main>${FOOTER}`,
    }));
  }

  const totalPages = 8 + blogData.length;
  console.log(`\nPrerender complete: ${totalPages} pages generated.`);
}

prerender().catch(err => {
  console.error('Prerender failed:', err);
  process.exit(1);
});
