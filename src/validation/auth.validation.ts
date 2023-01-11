import Joi from 'joi';

export const authenticateWithKakao = {
  input: {
    query: Joi.object()
      .keys({
        code: Joi.string().description('인가 코드'),
        error: Joi.string().description('에러 코드'),
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
