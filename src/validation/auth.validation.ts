import Joi from 'joi';
import {
  accessToken,
  accessTokenExp,
  authorizationCode,
  redirectUri,
  userId,
} from '../utils/schemas';

export const authenticateWithKakaoSchema = {
  input: {
    query: Joi.object()
      .keys({ code: authorizationCode, 'redirect-uri': redirectUri })
      .required(),
  },
  output: {
    cookie: Joi.object().keys({ accessToken }).required(),
  },
};

export const unregisterFromKakaoSchema = {
  input: {
    query: Joi.object()
      .keys({ code: authorizationCode, 'redirect-uri': redirectUri })
      .required(),
    locals: Joi.object().keys({ userId, accessTokenExp }).required(),
  },
};

export const checkTokenSchema = {
  input: {
    locals: Joi.object().keys({ userId, accessTokenExp }).required(),
  },
};
