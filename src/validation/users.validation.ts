import Joi from 'joi';
import {
  accessTokenExp,
  profileImageUrl,
  userId,
  username,
  userPrevRanking,
  userRanking,
  userScore,
} from '../utils/schemas';

const userData = Joi.object().keys({
  userId,
  username,
  profileImageUrl,
  score: userScore,
  ranking: userRanking,
  prevRanking: userPrevRanking,
});

export const getMyInfoSchema = {
  input: {
    locals: Joi.object().keys({ userId, accessTokenExp }).required(),
  },
  output: {
    body: userData.required(),
  },
};

export const getLeaderboardSchema = {
  output: {
    body: Joi.array().items(userData).required(),
  },
};

export const updateUsernameSchema = {
  input: {
    body: Joi.object().keys({ username }).required(),
    locals: Joi.object().keys({ userId, accessTokenExp }).required(),
    file: Joi.object<Express.Multer.File>().required(),
  },
};
