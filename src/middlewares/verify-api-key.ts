import { badRequest, unauthorized } from '@hapi/boom';
import { RequestHandler } from 'express';
import env from '../config/env';

const verifyApiKey: RequestHandler = async (req, res, next) => {
  const { 'api-key': key } = req.query;

  try {
    if (!key) throw badRequest('API 키가 없습니다.');

    if (key !== env.API_KEY)
      throw unauthorized('해당 API 키는 유효하지 않습니다.');

    next();
  } catch (err) {
    next(err);
  }
};
