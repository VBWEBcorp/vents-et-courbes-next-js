import type { Handler } from '@netlify/functions';
import {
  collection,
  serialize,
  COLLECTIONS,
  SiteSettings,
} from '../../lib/server/models';
import { requireAuth } from '../../lib/server/auth';
import { json, preflight, errorResponse } from '../../lib/server/http';

const SITE_ID = 'site';

export const handler: Handler = async (event) => {
  const pf = preflight(event.httpMethod);
  if (pf) return pf;

  try {
    const col = await collection<SiteSettings>(COLLECTIONS.settings);

    switch (event.httpMethod) {
      case 'GET': {
        // Document unique de configuration du site.
        return json(200, serialize(await col.findOne({ id: SITE_ID })));
      }

      // PUT = upsert du document unique (création si absent).
      case 'PUT':
      case 'POST': {
        requireAuth(event);
        const body = JSON.parse(event.body || '{}');
        delete body._id;
        delete body.id;
        delete body.created_at;
        body.updated_at = new Date().toISOString();
        const updated = await col.findOneAndUpdate(
          { id: SITE_ID },
          { $set: body, $setOnInsert: { id: SITE_ID } },
          { returnDocument: 'after', upsert: true },
        );
        return json(200, serialize(updated));
      }

      default:
        return json(405, { error: 'Méthode non autorisée' });
    }
  } catch (e) {
    return errorResponse(e);
  }
};
