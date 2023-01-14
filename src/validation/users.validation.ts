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

export const updateUsernameSchema = {
  input: {
    body: Joi.object().keys({
      username: Joi.string().min(1).description('사용자명'),
    }),
    locals: Joi.object().keys({
      userId: Joi.number().required().description('유저 식별자'),
      resizedImage: Joi.binary().description('프로필 사진'),
    }),
  },
};

export const unregisterSchema = {
  input: {
    locals: Joi.object().keys({
      userId: Joi.number().required().description('유저 식별자'),
    }),
  },
};
