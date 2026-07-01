import type { Handler } from '@netlify/functions';
import { randomUUID } from 'node:crypto';
import { requireAuth } from '../../lib/server/auth';
import { uploadObject, deleteObject, R2_PUBLIC_URL } from '../../lib/server/r2';
import { json, preflight, noContent, errorResponse } from '../../lib/server/http';

const EXT_FROM_MIME: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
  'image/svg+xml': 'svg',
  'image/avif': 'avif',
};

export const handler: Handler = async (event) => {
  const pf = preflight(event.httpMethod);
  if (pf) return pf;

  try {
    requireAuth(event);

    if (event.httpMethod === 'POST') {
      if (!R2_PUBLIC_URL) {
        return json(503, {
          error:
            "Stockage d'images non configuré (R2_PUBLIC_URL manquant). Configurez le bucket R2 avant d'uploader.",
        });
      }
      // Body: { filename?, contentType, data } where data is base64 (no prefix).
      const { filename, contentType, data } = JSON.parse(event.body || '{}');
      if (!data || !contentType) {
        return json(400, { error: 'contentType et data (base64) requis' });
      }
      const buffer = Buffer.from(data, 'base64');
      const extFromName = filename?.includes('.')
        ? filename.split('.').pop()
        : undefined;
      const ext = extFromName || EXT_FROM_MIME[contentType] || 'bin';
      const key = `${randomUUID()}-${Date.now()}.${ext}`;
      const { key: storedKey, url } = await uploadObject(key, buffer, contentType);
      return json(200, { path: storedKey, url });
    }

    if (event.httpMethod === 'DELETE') {
      const q = event.queryStringParameters || {};
      const target = q.key || q.url;
      if (!target) return json(400, { error: 'Paramètre key ou url requis' });
      await deleteObject(target);
      return noContent();
    }

    return json(405, { error: 'Méthode non autorisée' });
  } catch (e) {
    return errorResponse(e);
  }
};
