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

export const username = Joi.string().required().description('유저명');

export const profileImageUrl = Joi.string()
  .required()
  .description('프로필 사진의 URL');

export const userScore = Joi.number().required().description('점수');

export const userRanking = Joi.number()
  .allow(null)
  .required()
  .description('순위');

export const userPrevRanking = Joi.number()
  .allow(null)
  .required()
  .description('이전 순위');

export const userData = Joi.object().keys({
  userId,
  username,
  profileImageUrl,
  score: userScore,
  ranking: userRanking,
  prevRanking: userPrevRanking,
});

export const accessTokenExp = Joi.number()
  .required()
  .description('엑세스 토큰 남은 시간');
