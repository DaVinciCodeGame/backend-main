import Joi from 'joi';
import { accessTokenExp, userData, userId, username } from '../utils/schemas';

export const getMyInfoValidator = {
  resLocals: Joi.object().keys({ userId, accessTokenExp }).required(),
  resBody: userData.required(),
};

export const getLeaderboardValidator = {
  resBody: Joi.array().items(userData).required(),
};

export const updateUsernameValidator = {
  reqBody: Joi.object().keys({ username }).required(),
  resLocals: Joi.object().keys({ userId, accessTokenExp }).required(),
  reqFile: Joi.object<Express.Multer.File>().required(),
};
