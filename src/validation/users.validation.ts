import Joi from 'joi';
import { accessTokenExp, userData, userId, username } from '../utils/schemas';

export const getMyInfoValidator = {
  resLocals: Joi.object().keys({ userId, accessTokenExp }).required()
    .validateAsync,
  resBody: userData.required().validateAsync,
};

export const getLeaderboardValidator = {
  resBody: Joi.array().items(userData).required().validateAsync,
};

export const updateUsernameValidator = {
  reqBody: Joi.object().keys({ username }).required().validateAsync,
  resLocals: Joi.object().keys({ userId, accessTokenExp }).required()
    .validateAsync,
  reqFile: Joi.object<Express.Multer.File>().required().validateAsync,
};
