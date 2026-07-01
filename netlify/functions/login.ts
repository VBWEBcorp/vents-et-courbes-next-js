import type { Handler } from '@netlify/functions';
import bcrypt from 'bcryptjs';
import { collection, COLLECTIONS, AdminUser } from '../../lib/server/models';
import { signToken } from '../../lib/server/auth';
import { json, preflight, errorResponse } from '../../lib/server/http';

export const handler: Handler = async (event) => {
  const pf = preflight(event.httpMethod);
  if (pf) return pf;
  if (event.httpMethod !== 'POST') {
    return json(405, { error: 'Méthode non autorisée' });
  }
  try {
    const { email, password } = JSON.parse(event.body || '{}');
    if (!email || !password) {
      return json(400, { error: 'Email et mot de passe requis' });
    }
    const col = await collection<AdminUser>(COLLECTIONS.adminUsers);
    const user = await col.findOne({ email: String(email).toLowerCase() });
    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      return json(401, { error: 'Email ou mot de passe incorrect' });
    }
    const token = signToken({ sub: user.id, email: user.email, role: user.role });
    return json(200, {
      token,
      user: { id: user.id, email: user.email, role: user.role },
    });
  } catch (e) {
    return errorResponse(e);
  }
};
