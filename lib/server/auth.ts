import jwt from 'jsonwebtoken';
import type { HandlerEvent } from '@netlify/functions';

const secret = process.env.JWT_SECRET;

if (!secret) {
  throw new Error('JWT_SECRET is not set');
}

export interface AdminTokenPayload {
  sub: string; // admin user id
  email: string;
  role: string;
}

export function signToken(payload: AdminTokenPayload): string {
  return jwt.sign(payload, secret as string, { expiresIn: '7d' });
}

export function verifyToken(token: string): AdminTokenPayload {
  return jwt.verify(token, secret as string) as AdminTokenPayload;
}

function getBearer(event: HandlerEvent): string | null {
  const header =
    event.headers?.authorization || event.headers?.Authorization || '';
  if (!header.toLowerCase().startsWith('bearer ')) return null;
  return header.slice(7).trim() || null;
}

/**
 * Verify the request carries a valid admin JWT.
 * Throws { statusCode: 401 } when missing/invalid — callers convert this to a
 * 401 response.
 */
export function requireAuth(event: HandlerEvent): AdminTokenPayload {
  const token = getBearer(event);
  if (!token) {
    throw { statusCode: 401, message: 'Non authentifié' };
  }
  try {
    return verifyToken(token);
  } catch {
    throw { statusCode: 401, message: 'Session invalide ou expirée' };
  }
}
