// Seed / met à jour le contenu éditable des pages (collection `pages`).
//
//   node scripts/seed-page-content.mjs
//
// NON DESTRUCTIF : la STRUCTURE de chaque bloc (libellé, groupe, type, ordre)
// est toujours synchronisée ($set), mais les VALEURS (textes, images) ne sont
// écrites qu'à la création du bloc ($setOnInsert). Une valeur déjà modifiée
// par le client dans l'admin n'est donc JAMAIS écrasée par un re-seed.
import 'dotenv/config';
import { MongoClient } from 'mongodb';
import { randomUUID } from 'node:crypto';
import { PAGE_MANIFEST } from './page-content-manifest.mjs';

const MONGO_URI = process.env.MONGODB_URI;
if (!MONGO_URI) {
  console.error('❌ MONGODB_URI manquant.');
  process.exit(1);
}

// Champs "valeur" — écrits seulement à l'insertion pour ne pas écraser les
// modifications faites par le client.
const VALUE_FIELDS = [
  'title',
  'subtitle',
  'content',
  'button_text',
  'button_link',
  'image_url',
  'images',
];

async function run() {
  const client = new MongoClient(MONGO_URI);
  await client.connect();
  const col = client.db().collection('pages');

  let inserted = 0;
  let updated = 0;

  for (const page of PAGE_MANIFEST) {
    let order = 0;
    for (const block of page.blocks) {
      const orderIndex = order++;

      // Structure : toujours synchronisée.
      const structural = {
        page_name: block.label,
        section: page.section,
        group: block.group,
        field_type: block.type,
        order_index: orderIndex,
        active: true,
        updated_at: new Date().toISOString(),
      };

      // Valeurs par défaut : seulement à la création.
      const values = {};
      for (const f of VALUE_FIELDS) {
        if (block[f] !== undefined) values[f] = block[f];
      }

      const res = await col.updateOne(
        { page_key: block.key },
        {
          $set: structural,
          $setOnInsert: {
            id: randomUUID(),
            page_key: block.key,
            created_at: new Date().toISOString(),
            ...values,
          },
        },
        { upsert: true },
      );

      if (res.upsertedCount) inserted++;
      else updated++;
    }
  }

  console.log(
    `✅ Contenu de pages synchronisé : ${inserted} bloc(s) créé(s), ${updated} bloc(s) mis à jour (structure).`,
  );
  await client.close();
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
