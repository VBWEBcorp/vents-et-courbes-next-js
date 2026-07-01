import { MongoClient, Db } from 'mongodb';

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error('MONGODB_URI is not set');
}

// Cache the connection across warm serverless invocations (Netlify Functions
// reuse the same container, so we must not open a new pool on every call).
interface Cache {
  client: MongoClient;
  db: Db;
}

const globalForMongo = globalThis as unknown as { __mongo?: Promise<Cache> };

async function connect(): Promise<Cache> {
  const client = new MongoClient(uri as string, {
    maxPoolSize: 10,
  });
  await client.connect();
  // The database name is taken from the URI path (…/vents-et-courbes).
  const db = client.db();
  return { client, db };
}

export async function getDb(): Promise<Db> {
  if (!globalForMongo.__mongo) {
    globalForMongo.__mongo = connect();
  }
  return (await globalForMongo.__mongo).db;
}
