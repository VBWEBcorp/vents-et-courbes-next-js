// Crée / met à jour le compte admin dans MongoDB (auth JWT + bcrypt).
// Conserve les identifiants historiques par défaut.
//
//   node scripts/seed-admin.mjs
//
// Surcharge possible : ADMIN_EMAIL, ADMIN_PASSWORD
import 'dotenv/config';
import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';
import { randomUUID } from 'node:crypto';

const MONGO_URI = process.env.MONGODB_URI;
const email = (process.env.ADMIN_EMAIL || 'ventsetcourbes@gmail.com').toLowerCase();
const password = process.env.ADMIN_PASSWORD || 'Ventsetcourbes2230';

if (!MONGO_URI) {
  console.error('❌ MONGODB_URI manquant.');
  process.exit(1);
}

async function run() {
  const passwordHash = await bcrypt.hash(password, 10);
  const client = new MongoClient(MONGO_URI);
  await client.connect();
  const col = client.db().collection('admin_users');
  await col.createIndex({ email: 1 }, { unique: true });

  await col.updateOne(
    { email },
    {
      $set: { email, password_hash: passwordHash, role: 'admin' },
      $setOnInsert: { id: randomUUID(), created_at: new Date().toISOString() },
    },
    { upsert: true },
  );

  console.log(`✅ Admin prêt : ${email}`);
  await client.close();
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
