import { unauthorized } from '@hapi/boom';
import jwt from 'jsonwebtoken';
import env from '../config/env';

export function signAccessToken(userId: number) {
  return jwt.sign({ userId }, env.JWT_SECRET, { expiresIn: '1h' });
}

export function signRefreshToken(userId: number) {
  return jwt.sign({ userId }, env.JWT_SECRET, { expiresIn: '7d' });
}

export function verify(token: string) {
  const payload = jwt.verify(token, env.JWT_SECRET);

  if (typeof payload === 'string') {
    throw unauthorized('토큰이 유효하지 않습니다.');
  }

  return payload;
}
