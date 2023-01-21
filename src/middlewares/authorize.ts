import { badRequest } from '@hapi/boom';
import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import env from '../config/env';

const authorize: RequestHandler = async (req, res, next) => {
  const { accessToken } = req.cookies;

  try {
    if (!accessToken)
      throw badRequest('인증 정보가 유효하지 않습니다.', '쿠키 없음');

    let payload;

    try {
      payload = jwt.verify(accessToken, env.JWT_SECRET);
    } catch (err) {
      throw badRequest('인증 정보가 유효하지 않습니다.', '유효하지 않은 토큰');
    }

    if (typeof payload === 'string' || typeof payload.userId !== 'string')
      throw badRequest(
        '인증 정보가 유효하지 않습니다.',
        '내용이 유효하지 않음'
      );

    res.locals.userId = payload.userId;

    next();
  } catch (err) {
    next(err);
  }
};

export default authorize;
