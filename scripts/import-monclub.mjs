// Import du catalogue MonClub (export CSV) -> MongoDB.
//  - Regroupe les lignes par "ID Formule" (chaque formule = 1 offre datée + ses créneaux)
//  - Écrit une collection lossless `monclub_formules`
//  - Enrichit les stages/cours du site (prix, sessions, lien MonClub) via un mapping
//  - Crée les nouveaux stages présents dans l'export (2j / 3j de modelage)
//
//   node scripts/import-monclub.mjs [chemin_csv]
import 'dotenv/config';
import { MongoClient } from 'mongodb';
import { readFileSync } from 'fs';

const CSV = process.argv[2] || 'formules_2026-07-01T11_45_45.112Z.csv';
const MONGO_URI = process.env.MONGODB_URI;
const MONCLUB_URL = 'https://ventsetcourbes.monclub.app';

if (!MONGO_URI) { console.error('❌ MONGODB_URI manquant'); process.exit(1); }

// ---------- CSV parser (délimiteur ; , champs entre guillemets) ----------
function parseCSV(text) {
  text = text.replace(/^﻿/, '');
  const rows = [];
  let row = [], cur = '', q = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (q) {
      if (ch === '"') { if (text[i + 1] === '"') { cur += '"'; i++; } else q = false; }
      else cur += ch;
    } else {
      if (ch === '"') q = true;
      else if (ch === ';') { row.push(cur); cur = ''; }
      else if (ch === '\n') { row.push(cur); rows.push(row); row = []; cur = ''; }
      else if (ch === '\r') { /* ignore */ }
      else cur += ch;
    }
  }
  if (cur !== '' || row.length) { row.push(cur); rows.push(row); }
  return rows;
}

const norm = (s) => (s || '').toLowerCase()
  .normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/\s+/g, ' ').trim();

function toISO(d) { // "dd/mm/yyyy" -> "yyyy-mm-dd"
  const m = (d || '').match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  return m ? `${m[3]}-${m[2]}-${m[1]}` : (d || '');
}
const toHm = (h) => (h || '').replace(/H/i, ':'); // "09H30" -> "09:30"

// ---------- Mapping formule MonClub -> page du site ----------
const MAP = [
  { slug: 'stage-tournage-ceramique', kind: 'stages', test: n => n.startsWith('4 jours de tournage') },
  { slug: 'stage-tournage-3-jours', kind: 'stages', test: n => n.startsWith('3 jours de tournage') },
  { slug: 'tournage-modelage-initiation', kind: 'stages', test: n => n.includes('initiation tournage & modelage') },
  { slug: 'recherche-email', kind: 'stages', test: n => n.includes("recherche et comprehension d'email") },
  { slug: 'volumes-engobes-maria-bosch', kind: 'stages', test: n => n.includes('luberon') },
  { slug: 'engobes-vitrifie-maria-bosch', kind: 'stages', test: n => n.includes('engobes vitrifies') && !n.includes('luberon') },
  { slug: 'impressions-ceramique', kind: 'stages', test: n => n.includes("impression d'images") },
  { slug: 'initiation-emaillage', kind: 'stages', test: n => n.includes('initiation emaillage') },
  { slug: 'duo-bols-au-tour', kind: 'stages', test: n => n.includes('duo de bols') },
  // nouveaux stages (absents du site aujourd'hui)
  { slug: '2-jours-modelage', kind: 'stages', isNew: true, newTitle: '2 jours de modelage + émaillage', test: n => n.startsWith('2 jours de modelage') },
  { slug: '3-jours-modelage', kind: 'stages', isNew: true, newTitle: '3 jours de modelage', test: n => n.startsWith('3 jours de modelage') },
  // cours
  { slug: 'tournage-annuel', kind: 'cours', test: n => n.includes('tournage annuel') },
  { slug: 'tournage-trimestriel', kind: 'cours', test: n => n.includes('tournage trimestriel') },
  { slug: 'tournage-single', kind: 'cours', test: n => n.includes("essai de tournage") },
  { slug: 'modelage-annuel', kind: 'cours', test: n => n.includes('modelage annuel') && n.includes('3 heures') },
  { slug: 'modelage-trimestriel', kind: 'cours', test: n => n.includes('modelage trimestriel') && n.includes('3 heures') },
  { slug: 'modelage-single', kind: 'cours', test: n => n.includes("essai de modelage") },
];
const DEFAULT_IMG = 'https://i.ibb.co/7w4BNrH/VC-image-galerie01.jpg';

async function run() {
  const rows = parseCSV(readFileSync(CSV, 'utf8'));
  const H = rows[0];
  const col = (name) => H.indexOf(name);
  const ci = {
    id: col('ID Formule'), nom: col('Nom'), type: col('Type'),
    prix: col('Prix affiché'), desc: col('Description'), notes: col('Notes'),
    saison: col('Saison'), lieu: col('Adresse'), activite: col('Activités'),
    dateDebut: col('Date de début'), dateFin: col('Date de fin'),
    cDate: col('Date de début du créneau'), cH: col('Heure'), cHf: col('Heure de fin'),
    cPlaces: col('Nb places adhérent'), cNom: col('Nom du créneau'),
  };

  // Regroupe par formule
  const formules = new Map();
  for (let i = 1; i < rows.length; i++) {
    const r = rows[i];
    if (!r || !r[ci.id]) continue;
    const id = r[ci.id];
    if (!formules.has(id)) {
      formules.set(id, {
        id, nom: r[ci.nom], type: r[ci.type], prix: r[ci.prix],
        description: r[ci.desc], notes: r[ci.notes], saison: r[ci.saison],
        lieu: r[ci.lieu], activite: r[ci.activite],
        date_debut: toISO(r[ci.dateDebut]), date_fin: toISO(r[ci.dateFin]),
        creneaux: [],
      });
    }
    const f = formules.get(id);
    if (r[ci.cDate]) {
      f.creneaux.push({
        date: toISO(r[ci.cDate]), start: toHm(r[ci.cH]), end: toHm(r[ci.cHf]),
        places: Number(r[ci.cPlaces]) || null, label: r[ci.cNom],
      });
    }
  }
  const all = [...formules.values()];
  all.forEach(f => f.creneaux.sort((a, b) => (a.date + a.start).localeCompare(b.date + b.start)));
  console.log(`Formules MonClub: ${all.length} (${rows.length - 1} lignes de créneaux)`);

  const client = new MongoClient(MONGO_URI);
  await client.connect();
  const db = client.db();

  // 1) collection lossless
  const mc = db.collection('monclub_formules');
  await mc.createIndex({ id: 1 }, { unique: true });
  for (const f of all) await mc.updateOne({ id: f.id }, { $set: f }, { upsert: true });
  console.log(`✅ monclub_formules: ${all.length} upserts`);

  // 2) mapping -> pages du site
  const bySlug = new Map();       // slug -> { entry, formules:[] }
  const unmatched = [];
  for (const f of all) {
    const n = norm(f.nom);
    const entry = MAP.find(m => m.test(n));
    if (!entry) { unmatched.push(f.nom); continue; }
    if (!bySlug.has(entry.slug)) bySlug.set(entry.slug, { entry, formules: [] });
    bySlug.get(entry.slug).formules.push(f);
  }

  // Construit les "sessions" (1 par formule datée) pour affichage sur le site
  const buildSessions = (fs) => fs
    .map(f => ({
      monclub_id: f.id,
      label: f.nom,
      price: f.prix,
      date_debut: f.date_debut || (f.creneaux[0] && f.creneaux[0].date) || '',
      date_fin: f.date_fin,
      lieu: f.lieu,
      creneaux: f.creneaux,
    }))
    .sort((a, b) => (a.date_debut || '').localeCompare(b.date_debut || ''));

  let updated = 0, created = 0;
  for (const [slug, { entry, formules: fs }] of bySlug) {
    const sessions = buildSessions(fs);
    const price = `${fs[0].prix}€`;
    const monclub_ids = fs.map(f => f.id);
    const col2 = db.collection(entry.kind);

    if (entry.isNew) {
      const existing = await col2.findOne({ reservation_slug: slug });
      const first = fs[0];
      const lastOrder = (await col2.find({}).sort({ order_index: -1 }).limit(1).toArray())[0];
      const doc = {
        id: existing?.id || (await import('node:crypto')).randomUUID(),
        title: entry.newTitle,
        duration: entry.newTitle.match(/^\d+ jours?/)?.[0] || '',
        level: 'Tout niveau',
        image_url: existing?.image_url || DEFAULT_IMG,
        description: (first.description || '').replace(/&nbsp;/g, ' ').trim(),
        includes: (first.notes || '').replace(/&nbsp;/g, ' ').trim().slice(0, 300),
        price,
        additional_text: 'Prix Net de TVA',
        reservation_slug: slug,
        widget_id: '',
        has_cuisson: false,
        order_index: existing?.order_index ?? ((lastOrder?.order_index ?? 0) + 1),
        active: true,
        monclub_url: MONCLUB_URL,
        monclub_ids,
        sessions,
        updated_at: new Date().toISOString(),
      };
      await col2.updateOne({ reservation_slug: slug }, { $set: doc, $setOnInsert: { created_at: new Date().toISOString() } }, { upsert: true });
      created++;
      console.log(`🆕 ${entry.kind}/${slug} — ${fs.length} session(s), prix ${price}`);
    } else {
      const res = await col2.updateOne(
        { reservation_slug: slug },
        { $set: { price, monclub_url: MONCLUB_URL, monclub_ids, sessions, updated_at: new Date().toISOString() } },
      );
      if (res.matchedCount) { updated++; console.log(`✅ ${entry.kind}/${slug} — ${fs.length} session(s), prix ${price}`); }
      else console.log(`⚠️  ${entry.kind}/${slug} introuvable en base (mapping à vérifier)`);
    }
  }

  console.log(`\n${updated} mis à jour, ${created} créés.`);
  if (unmatched.length) {
    console.log(`\nNon mappées (${unmatched.length}) — normal pour adhésion / atelier partagé / variantes :`);
    [...new Set(unmatched)].forEach(n => console.log('  · ' + n));
  }
  await client.close();
}

run().catch(e => { console.error(e); process.exit(1); });
