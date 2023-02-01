import Joi from 'joi';

const jwt = Joi.string().pattern(/^[\w-]{36}\.[\w-]+\.[\w-]{43}$/);

export const accessToken = jwt.required().description('액세스 토큰');

export const authorizationCode = Joi.string()
  .required()
  .description('인가 코드');

export const redirectUri = Joi.string()
  .required()
  .description('리다이렉트 URI');

export const userId = Joi.number().required().description('유저 식별자');

export const accessTokenExp = Joi.number()
  .required()
  .description('엑세스 토큰 남은 시간');
