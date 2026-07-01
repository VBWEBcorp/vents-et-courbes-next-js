// Copie les images hébergées sur Supabase Storage vers Cloudflare R2,
// puis réécrit les champs image_url correspondants dans MongoDB.
// (Les images externes — i.ibb.co, etc. — sont laissées telles quelles.)
//
//   node scripts/copy-storage-to-r2.mjs
//
// Prérequis : bucket R2 créé + accès public activé, et R2_PUBLIC_URL renseigné.
import 'dotenv/config';
import { config } from 'dotenv';
import { MongoClient } from 'mongodb';
import { randomUUID } from 'node:crypto';
import {
  S3Client,
  PutObjectCommand,
} from '@aws-sdk/client-s3';

config({ path: '.env.local' }); // pour NEXT_PUBLIC_SUPABASE_URL (hôte des images)

const MONGO_URI = process.env.MONGODB_URI;
const {
  R2_ACCOUNT_ID,
  R2_ACCESS_KEY_ID,
  R2_SECRET_ACCESS_KEY,
  R2_BUCKET_NAME,
  R2_PREFIX = '',
  R2_PUBLIC_URL = '',
} = process.env;

// Host des images Supabase Storage (dérivé de l'URL du projet).
const SUPA_HOST = (process.env.NEXT_PUBLIC_SUPABASE_URL || '').replace(
  /^https?:\/\//,
  '',
);

if (!MONGO_URI || !R2_ACCOUNT_ID || !R2_BUCKET_NAME) {
  console.error('❌ MONGODB_URI / identifiants R2 manquants.');
  process.exit(1);
}
if (!R2_PUBLIC_URL) {
  console.error(
    '❌ R2_PUBLIC_URL vide. Active l’accès public du bucket R2 et renseigne ' +
      'R2_PUBLIC_URL dans .env avant de lancer ce script.',
  );
  process.exit(1);
}

const s3 = new S3Client({
  region: 'auto',
  endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: R2_ACCESS_KEY_ID,
    secretAccessKey: R2_SECRET_ACCESS_KEY,
  },
});

const publicBase = R2_PUBLIC_URL.replace(/\/$/, '');
const COLLECTIONS = ['stages', 'cours', 'authors', 'blog_posts'];

function needsMigration(url) {
  return typeof url === 'string' && SUPA_HOST && url.includes(SUPA_HOST);
}

async function uploadFromUrl(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`fetch ${url} -> ${res.status}`);
  const contentType = res.headers.get('content-type') || 'image/jpeg';
  const buffer = Buffer.from(await res.arrayBuffer());
  const ext = (url.split('.').pop() || 'jpg').split(/[?#]/)[0].slice(0, 5);
  const key = `${R2_PREFIX ? R2_PREFIX + '/' : ''}${randomUUID()}-${Date.now()}.${ext}`;
  await s3.send(
    new PutObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: key,
      Body: buffer,
      ContentType: contentType,
    }),
  );
  return `${publicBase}/${key}`;
}

async function run() {
  const client = new MongoClient(MONGO_URI);
  await client.connect();
  const db = client.db();
  let migrated = 0;

  for (const name of COLLECTIONS) {
    const col = db.collection(name);
    const docs = await col.find({}).toArray();
    for (const doc of docs) {
      if (!needsMigration(doc.image_url)) continue;
      try {
        const newUrl = await uploadFromUrl(doc.image_url);
        await col.updateOne({ id: doc.id }, { $set: { image_url: newUrl } });
        migrated++;
        console.log(`✅ ${name}/${doc.id} -> ${newUrl}`);
      } catch (e) {
        console.error(`❌ ${name}/${doc.id}: ${e.message}`);
      }
    }
  }

  console.log(`🎉 ${migrated} image(s) migrée(s) vers R2.`);
  await client.close();
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
