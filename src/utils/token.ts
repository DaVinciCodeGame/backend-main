import jwt from 'jsonwebtoken';
import env from '../config/env';

export function signAccessToken(userId: number) {
  return jwt.sign({ userId }, env.JWT_SECRET, { expiresIn: '1h' });
}

export function signRefreshToken(userId: number) {
  return jwt.sign({ userId }, env.JWT_SECRET, { expiresIn: '7d' });
}

export function verify(token: string) {
  return jwt.verify(token, env.JWT_SECRET);
}
