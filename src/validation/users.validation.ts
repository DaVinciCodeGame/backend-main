import Joi from 'joi';
import { accessTokenExp, userData, userId, username } from '../utils/schemas';

export const readValidator = {
  resLocals: Joi.object().keys({ userId, accessTokenExp }).required()
    .validateAsync,
  resBody: userData.required().validateAsync,
};

export const readManyValidator = {
  resBody: Joi.array().items(userData).required().validateAsync,
};

export const updateValidator = {
  reqBody: Joi.object().keys({ username }).required().validateAsync,
  resLocals: Joi.object().keys({ userId, accessTokenExp }).required()
    .validateAsync,
  reqFile: Joi.object<Express.Multer.File>().required().validateAsync,
};
