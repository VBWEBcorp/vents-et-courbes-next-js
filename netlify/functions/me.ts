import type { Handler } from '@netlify/functions';
import { requireAuth } from '../../lib/server/auth';
import { json, preflight, errorResponse } from '../../lib/server/http';

// Returns the current admin from the Bearer token (used by ProtectedRoute).
export const handler: Handler = async (event) => {
  const pf = preflight(event.httpMethod);
  if (pf) return pf;
  try {
    const payload = requireAuth(event);
    return json(200, {
      user: { id: payload.sub, email: payload.email, role: payload.role },
    });
  } catch (e) {
    return errorResponse(e);
  }
};
