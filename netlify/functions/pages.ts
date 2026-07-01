import type { Handler } from '@netlify/functions';
import { randomUUID } from 'node:crypto';
import {
  collection,
  serialize,
  serializeMany,
  COLLECTIONS,
  PageContent,
} from '../../lib/server/models';
import { requireAuth } from '../../lib/server/auth';
import { json, preflight, noContent, errorResponse } from '../../lib/server/http';

export const handler: Handler = async (event) => {
  const pf = preflight(event.httpMethod);
  if (pf) return pf;

  const q = event.queryStringParameters || {};
  try {
    const col = await collection<PageContent>(COLLECTIONS.pages);
    const includeInactive = q.includeInactive === 'true';

    switch (event.httpMethod) {
      case 'GET': {
        if (q.key) {
          return json(200, serialize(await col.findOne({ page_key: q.key })));
        }
        if (q.section) {
          const filter: Record<string, unknown> = { section: q.section };
          if (!includeInactive) filter.active = true;
          const docs = await col
            .find(filter)
            .sort({ order_index: 1 })
            .toArray();
          return json(200, serializeMany(docs));
        }
        const filter = includeInactive ? {} : { active: true };
        const docs = await col
          .find(filter)
          .sort({ section: 1, order_index: 1 })
          .toArray();
        return json(200, serializeMany(docs));
      }

      case 'POST': {
        requireAuth(event);
        const body = JSON.parse(event.body || '{}');
        delete body._id;
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
