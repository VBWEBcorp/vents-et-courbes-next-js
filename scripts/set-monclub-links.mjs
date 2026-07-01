// Branche chaque stage/cours sur le lien d'inscription MonClub de SON activité.
// MonClub expose un lien public par activité : https://<club>.monclub.app/app/<activiteId>
// (pas de lien par formule/date — c'est la granularité max côté MonClub).
import 'dotenv/config';
import { MongoClient } from 'mongodb';

const BASE = 'https://ventsetcourbes.monclub.app/app/';

// activité (nom MonClub, trim) -> ID de l'activité (club)
const ACTIVITE_ID = {
  'Stage de tournage': '6a282b216f8580f2eee435be',
  'Stage de modelage': '6a2c0241dac780ee695f97fd',
  'Initiation tournage & Modelage': '6a2c269f7d981953bf692d26',
  'Duo de bols au tour': '6a2c24386d9b32677b1cb2e8',
  'INITIATION EMAILLAGE': '6a2154baac946d6b85dfd0fa',
  'STAGE ENGOBES VITRIFIES': '6a087f9a6727b1b2050ad198',
  "Stage recherche et compréhension d'émail": '6a294db467fff4f5607c75e0',
  "STAGE IMPRESSION D'IMAGES SUR CERAMIQUE": '6a05cbf17128b7ce7718bbf5',
  'COURS HEBDO TOURNAGE': '6a01ce77dffab3082f0bb66e',
  'COURS HEBDO MODELAGE': '6a01cfd8a3ab1968ca989ebc',
};

const MONGO_URI = process.env.MONGODB_URI;
if (!MONGO_URI) { console.error('❌ MONGODB_URI manquant'); process.exit(1); }

async function run() {
  const c = new MongoClient(MONGO_URI);
  await c.connect();
  const d = c.db();
  const forms = await d.collection('monclub_formules').find({}).toArray();
  const byId = Object.fromEntries(forms.map(f => [f.id, f]));

  let ok = 0, skipped = [];
  for (const name of ['stages', 'cours']) {
    const docs = await d.collection(name).find({}).toArray();
    for (const x of docs) {
      const acts = [...new Set((x.monclub_ids || [])
        .map(id => byId[id]?.activite?.trim())
        .filter(Boolean))];
      const activiteId = acts.map(a => ACTIVITE_ID[a]).find(Boolean);
      if (!activiteId) { skipped.push(x.title); continue; }
      const url = BASE + activiteId;
      await d.collection(name).updateOne(
        { id: x.id },
        { $set: { monclub_url: url, updated_at: new Date().toISOString() } },
      );
      ok++;
      console.log(`✅ ${x.title}  ->  ${url}  (${acts[0]})`);
    }
  }
  console.log(`\n${ok} pages branchées.`);
  if (skipped.length) console.log('Sans activité (lien global conservé) :', skipped.join(', '));
  await c.close();
}
run().catch(e => { console.error(e); process.exit(1); });
