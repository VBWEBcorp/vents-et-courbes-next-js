import type { Handler } from '@netlify/functions';
import { json, preflight, errorResponse } from '../../lib/server/http';

// Proxifie les soumissions de formulaire vers FormSpree, en gardant
// l'endpoint côté serveur (variable FORMSPREE_ENDPOINT).
export const handler: Handler = async (event) => {
  const pf = preflight(event.httpMethod);
  if (pf) return pf;
  if (event.httpMethod !== 'POST') {
    return json(405, { error: 'Méthode non autorisée' });
  }

  const endpoint = process.env.FORMSPREE_ENDPOINT;
  if (!endpoint) {
    return json(500, { error: 'FORMSPREE_ENDPOINT non configuré' });
  }

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: event.body || '{}',
    });
    const data = await res.json().catch(() => ({}));
    return json(res.ok ? 200 : res.status, data);
  } catch (e) {
    return errorResponse(e);
  }
};
