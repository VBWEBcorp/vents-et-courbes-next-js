// Diagnostic de connectivité : Mongo Atlas + lecture Supabase. Read-only.
import 'dotenv/config';
import { config } from 'dotenv';
import { MongoClient } from 'mongodb';
import { createClient } from '@supabase/supabase-js';

config({ path: '.env.local' });

async function main() {
  // --- MongoDB ---
  try {
    const client = new MongoClient(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 8000,
    });
    await client.connect();
    const db = client.db();
    const ping = await db.command({ ping: 1 });
    const cols = await db.listCollections().toArray();
    console.log('MONGO: OK  db=%s  ping=%o', db.databaseName, ping.ok);
    for (const c of cols) {
      const n = await db.collection(c.name).countDocuments();
      console.log(`  - ${c.name}: ${n} docs`);
    }
    if (!cols.length) console.log('  (aucune collection — base vide)');
    await client.close();
  } catch (e) {
    console.log('MONGO: ÉCHEC ->', e.message);
  }

  // --- Supabase (lecture) ---
  try {
    const supa = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY ||
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      { auth: { persistSession: false } },
    );
    for (const t of ['authors', 'stages', 'cours', 'blog_posts', 'pages']) {
      const { count, error } = await supa
        .from(t)
        .select('*', { count: 'exact', head: true });
      console.log(
        `SUPA ${t}: ${error ? 'ERREUR ' + error.message : count + ' lignes'}`,
      );
    }
  } catch (e) {
    console.log('SUPABASE: ÉCHEC ->', e.message);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
