import type { Handler } from '@netlify/functions';
import { randomUUID } from 'node:crypto';
import { collection, serialize, serializeMany } from './models';
import { requireAuth } from './auth';
import { json, preflight, noContent, errorResponse } from './http';

export interface ResourceConfig {
  /** Mongo collection name. */
  name: string;
  /** Sort applied to list queries. */
  sort: Record<string, 1 | -1>;
  /** Field usable via GET ?slug=… (e.g. reservation_slug, slug). */
  slugField?: string;
  /** Apply { active: true } on list/slug reads unless the bypass param is set. */
  activeFilter?: boolean;
  /** Query param that disables the active filter (e.g. includeInactive). */
  inactiveParam?: string;
}

/**
 * Generic REST handler for a simple document collection.
 *   GET    /fn            → list (?<inactiveParam>=true to include inactive)
 *   GET    /fn?id=…       → single by id
 *   GET    /fn?slug=…     → single by slugField
 *   POST   /fn            → create (auth)
 *   PUT    /fn?id=…       → update (auth)
 *   DELETE /fn?id=…       → delete (auth)
 */
export function resourceHandler(cfg: ResourceConfig): Handler {
  return async (event) => {
    const pf = preflight(event.httpMethod);
    if (pf) return pf;

    const q = event.queryStringParameters || {};
    try {
      const col = await collection(cfg.name);

      switch (event.httpMethod) {
        case 'GET': {
          if (q.id) {
            return json(200, serialize(await col.findOne({ id: q.id })));
          }
          if (cfg.slugField && q.slug) {
            const filter: Record<string, unknown> = { [cfg.slugField]: q.slug };
            if (cfg.activeFilter) filter.active = true;
            return json(200, serialize(await col.findOne(filter)));
          }
          const includeInactive = cfg.inactiveParam
            ? q[cfg.inactiveParam] === 'true'
            : false;
          const filter =
            cfg.activeFilter && !includeInactive ? { active: true } : {};
          const docs = await col.find(filter).sort(cfg.sort).toArray();
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
}
