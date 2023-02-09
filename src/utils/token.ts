import { unauthorized } from '@hapi/boom';
import jwt from 'jsonwebtoken';
import env from '../config/env';

export function signAccessToken(userId: number) {
  return jwt.sign({ userId }, env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
}

export function signRefreshToken(userId: number) {
  return jwt.sign({ userId }, env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
}

export function verifyAccessToken(token: string) {
  const payload = jwt.verify(token, env.ACCESS_TOKEN_SECRET);

  if (typeof payload === 'string') {
    throw unauthorized('토큰이 유효하지 않습니다.');
  }

  return payload;
}

export function verifyRefreshToken(token: string) {
  const payload = jwt.verify(token, env.REFRESH_TOKEN_SECRET);

  if (typeof payload === 'string') {
    throw unauthorized('토큰이 유효하지 않습니다.');
  }

  return payload;
}
