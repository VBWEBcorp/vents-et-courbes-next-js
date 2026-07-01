// Migration des données Supabase (PostgreSQL) -> MongoDB.
// Lecture depuis Supabase, upsert par `id` dans Mongo (idempotent).
//
//   node scripts/migrate-from-supabase.mjs
//
// Variables lues :
//   NEXT_PUBLIC_SUPABASE_URL           (.env.local)
//   SUPABASE_SERVICE_ROLE_KEY          (recommandé — récupère AUSSI les lignes
//                                        inactives/brouillons ; sinon la clé anon
//                                        ne verra que les lignes publiques)
//   NEXT_PUBLIC_SUPABASE_ANON_KEY      (fallback)
//   MONGODB_URI                        (.env)
import 'dotenv/config';
import { config } from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import { MongoClient } from 'mongodb';

config({ path: '.env.local' }); // charge les variables Supabase en plus de .env

const SUPA_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPA_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const MONGO_URI = process.env.MONGODB_URI;

if (!SUPA_URL || !SUPA_KEY) {
  console.error('❌ Variables Supabase manquantes (URL / clé).');
  process.exit(1);
}
if (!MONGO_URI) {
  console.error('❌ MONGODB_URI manquant.');
  process.exit(1);
}
if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.warn(
    '⚠️  Clé service role absente : seules les lignes visibles par la clé anon ' +
      '(généralement active=true) seront migrées.',
  );
}

const TABLES = ['authors', 'stages', 'cours', 'blog_posts', 'pages'];

async function run() {
  const supabase = createClient(SUPA_URL, SUPA_KEY, {
    auth: { persistSession: false },
  });
  const mongo = new MongoClient(MONGO_URI);
  await mongo.connect();
  const db = mongo.db();

  for (const table of TABLES) {
    const { data, error } = await supabase.from(table).select('*');
    if (error) {
      console.error(`❌ ${table}: ${error.message}`);
      continue;
    }
    const col = db.collection(table);
    let count = 0;
    for (const row of data) {
      await col.updateOne({ id: row.id }, { $set: row }, { upsert: true });
      count++;
    }
    console.log(`✅ ${table}: ${count} documents migrés`);
  }

  // Index (idempotents)
  await db.collection('stages').createIndex({ id: 1 }, { unique: true });
  await db.collection('stages').createIndex({ reservation_slug: 1 });
  await db.collection('cours').createIndex({ id: 1 }, { unique: true });
  await db.collection('cours').createIndex({ reservation_slug: 1 });
  await db.collection('authors').createIndex({ id: 1 }, { unique: true });
  await db.collection('blog_posts').createIndex({ id: 1 }, { unique: true });
  await db.collection('blog_posts').createIndex({ slug: 1 });
  await db.collection('pages').createIndex({ id: 1 }, { unique: true });
  await db.collection('pages').createIndex({ page_key: 1 });
  await db.collection('pages').createIndex({ section: 1 });

  console.log('✅ Index créés.');
  await mongo.close();
  console.log('🎉 Migration terminée.');
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
