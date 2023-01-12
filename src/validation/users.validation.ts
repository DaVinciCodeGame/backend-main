import Joi from 'joi';

export const getMyInfoSchema = {
  input: {
    locals: Joi.object().keys({
      userId: Joi.number().required().description('유저 식별자'),
    }),
  },
  output: {
    body: Joi.object().keys({
      userId: Joi.number(),
      username: Joi.string(),
      profileImageUrl: Joi.string(),
      score: Joi.number(),
      ranking: Joi.number(),
      change: Joi.number(),
      rank: Joi.number(),
    }),
  },
};
