import Joi from 'joi';
import {
  accessToken,
  accessTokenExp,
  authorizationCode,
  redirectUri,
  userId,
} from '../utils/schemas';

export const loginValidator = {
  reqQuery: Joi.object()
    .keys({ code: authorizationCode, 'redirect-uri': redirectUri })
    .required(),
  resCookie: Joi.object().keys({ accessToken }).required(),
};

export const unregisterValidator = {
  reqQuery: Joi.object()
    .keys({ code: authorizationCode, 'redirect-uri': redirectUri })
    .required(),
  resLocals: Joi.object().keys({ userId, accessTokenExp }).required(),
};

export const checkTokenValidator = {
  resLocals: Joi.object().keys({ userId, accessTokenExp }).required(),
};
