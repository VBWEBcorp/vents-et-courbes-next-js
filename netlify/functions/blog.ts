import type { Handler } from '@netlify/functions';
import { randomUUID } from 'node:crypto';
import {
  collection,
  serialize,
  COLLECTIONS,
  ArticleBlog,
  Auteur,
} from '../../lib/server/models';
import { requireAuth } from '../../lib/server/auth';
import { json, preflight, noContent, errorResponse } from '../../lib/server/http';

async function attachAuthors(
  posts: ArticleBlog[],
): Promise<Omit<ArticleBlog, '_id'>[]> {
  const ids = [...new Set(posts.map((p) => p.author_id).filter(Boolean))] as string[];
  const map = new Map<string, Auteur>();
  if (ids.length) {
    const authorsCol = await collection<Auteur>(COLLECTIONS.authors);
    const authors = await authorsCol.find({ id: { $in: ids } }).toArray();
    authors.forEach((a) => map.set(a.id, serialize(a) as Auteur));
  }
  return posts.map((p) => {
    const clean = serialize(p) as ArticleBlog;
    clean.author = p.author_id ? map.get(p.author_id) : undefined;
    return clean;
  });
}

export const handler: Handler = async (event) => {
  const pf = preflight(event.httpMethod);
  if (pf) return pf;

  const q = event.queryStringParameters || {};
  try {
    const col = await collection<ArticleBlog>(COLLECTIONS.blogPosts);

    switch (event.httpMethod) {
      case 'GET': {
        if (q.id) {
          const doc = await col.findOne({ id: q.id });
          if (!doc) return json(200, null);
          const [withAuthor] = await attachAuthors([doc]);
          return json(200, withAuthor);
        }
        if (q.slug) {
          const doc = await col.findOne({ slug: q.slug, active: true });
          if (!doc) return json(200, null);
          const [withAuthor] = await attachAuthors([doc]);
          return json(200, withAuthor);
        }
        const filter = q.includeUnpublished === 'true' ? {} : { active: true };
        const docs = await col
          .find(filter)
          .sort({ published_date: -1 })
          .toArray();
        return json(200, await attachAuthors(docs));
      }

      case 'POST': {
        requireAuth(event);
        const body = JSON.parse(event.body || '{}');
        delete body._id;
        delete body.author; // computed on read
        const now = new Date().toISOString();
        const doc = {
          ...body,
          id: body.id || randomUUID(),
          created_at: now,
          updated_at: now,
        };
        await col.insertOne(doc);
        return json(201, serialize(doc));
      }

      case 'PUT': {
        requireAuth(event);
        if (!q.id) return json(400, { error: 'Paramètre id requis' });
        const body = JSON.parse(event.body || '{}');
        delete body.id;
        delete body._id;
        delete body.author;
        delete body.created_at;
        body.updated_at = new Date().toISOString();
        const updated = await col.findOneAndUpdate(
          { id: q.id },
          { $set: body },
          { returnDocument: 'after' },
        );
        if (!updated) return json(404, { error: 'Introuvable' });
        return json(200, serialize(updated));
      }

      case 'DELETE': {
        requireAuth(event);
        if (!q.id) return json(400, { error: 'Paramètre id requis' });
        await col.deleteOne({ id: q.id });
        return noContent();
      }

      default:
        return json(405, { error: 'Méthode non autorisée' });
    }
  } catch (e) {
    return errorResponse(e);
  }
};
