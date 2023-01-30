import Joi from 'joi';

export const getMyInfoSchema = {
  input: {
    locals: Joi.object().keys({
      userId: Joi.number().required().description('유저 식별자'),
    }),
  },
  output: {
    body: Joi.object().keys({
      userId: Joi.number().required().description('유저 식별자'),
      username: Joi.string().required().description('유저명'),
      profileImageUrl: Joi.string().required().description('프로필 사진의 URL'),
      score: Joi.number().required().description('점수'),
      ranking: Joi.number().allow(null).required().description('순위'),
      prevRanking: Joi.number().allow(null).required().description('이전 순위'),
    }),
  },
};

export const getLeaderboardSchema = {
  output: {
    body: Joi.array().items(
      Joi.object().keys({
        userId: Joi.number().required().description('유저 식별자'),
        username: Joi.string().required().description('유저명'),
        profileImageUrl: Joi.string()
          .required()
          .description('프로필 사진의 URL'),
        score: Joi.number().required().description('점수'),
        ranking: Joi.number().allow(null).required().description('순위'),
        prevRanking: Joi.number()
          .allow(null)
          .required()
          .description('이전 순위'),
      })
    ),
  },
};

export const updateUsernameSchema = {
  input: {
    body: Joi.object().keys({
      username: Joi.string().min(1).description('사용자명'),
    }),
    locals: Joi.object().keys({
      userId: Joi.number().required().description('유저 식별자'),
    }),
    file: Joi.object<Express.Multer.File>(),
  },
};
