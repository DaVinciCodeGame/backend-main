import Joi from 'joi';

export const authenticateWithKakaoSchema = {
  input: {
    query: Joi.object()
      .keys({
        code: Joi.string().required().description('인가 코드'),
        'redirect-uri': Joi.string().required().description('리다이렉트 URI'),
      })
      .required(),
  },
  output: {
    cookie: Joi.object().keys({
      accessToken: Joi.string()
        .required()
        .pattern(/^[\w-]{36}\.[\w-]+\.[\w-]{43}$/)
        .description('액세스 토큰'),
    }),
  },
};

export const unregisterFromKakaoSchema = {
  input: {
    query: Joi.object()
      .keys({
        code: Joi.string().required().description('인가 코드'),
        'redirect-uri': Joi.string().required().description('리다이렉트 URI'),
      })
      .required(),
    locals: Joi.object().keys({
      userId: Joi.number().required().description('유저 식별자'),
    }),
  },
};
