import type { HandlerResponse } from '@netlify/functions';

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export function json(statusCode: number, data: unknown): HandlerResponse {
  return {
    statusCode,
    headers: { ...CORS, 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  };
}

export function noContent(): HandlerResponse {
  return { statusCode: 204, headers: CORS, body: '' };
}

/** Handle CORS preflight. Returns a response for OPTIONS, otherwise null. */
export function preflight(method: string): HandlerResponse | null {
  if (method === 'OPTIONS') {
    return { statusCode: 204, headers: CORS, body: '' };
  }
  return null;
}

/** Convert a thrown value (incl. requireAuth's {statusCode}) into a response. */
export function errorResponse(err: unknown): HandlerResponse {
  const e = err as { statusCode?: number; message?: string };
  const statusCode = e?.statusCode && e.statusCode >= 400 ? e.statusCode : 500;
  const message = e?.message || 'Erreur serveur';
  if (statusCode >= 500) {
    console.error('[function error]', err);
  }
  return json(statusCode, { error: message });
}
