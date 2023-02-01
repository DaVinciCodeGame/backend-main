import Joi from 'joi';
import {
  accessToken,
  accessTokenExp,
  authorizationCode,
  redirectUri,
  userId,
} from '../utils/schemas';

export const authenticateWithKakaoValidator = {
  reqQuery: Joi.object()
    .keys({ code: authorizationCode, 'redirect-uri': redirectUri })
    .required().validateAsync,
  resCookie: Joi.object().keys({ accessToken }).required().validateAsync,
};

export const unregisterFromKakaoValidator = {
  reqQuery: Joi.object()
    .keys({ code: authorizationCode, 'redirect-uri': redirectUri })
    .required().validateAsync,
  resLocals: Joi.object().keys({ userId, accessTokenExp }).required()
    .validateAsync,
};

export const checkTokenValidator = {
  resLocals: Joi.object().keys({ userId, accessTokenExp }).required()
    .validateAsync,
};
