import Joi from 'joi';
import { accessTokenExp, userData, userId, username } from '../utils/schemas';

export const readValidator = {
  resLocals: Joi.object().keys({ userId, accessTokenExp }).required(),
  resBody: userData.required(),
};

export const readManyValidator = {
  resBody: Joi.array().items(userData).required(),
};

export const updateValidator = {
  reqBody: Joi.object().keys({ username }).required(),
  resLocals: Joi.object().keys({ userId, accessTokenExp }).required(),
  reqFile: Joi.object<Express.Multer.File>().required(),
};
