import 'dotenv/config';
import Joi from 'joi';

type Env = {
  PORT: string;
  NODE_ENV: string;
  MONGO_URL: string;
  KAKAO_REST_API_KEY: string;
  JWT_SECRET: string;
  AWS_S3_ACCESS_KEY_ID: string;
  AWS_S3_SECRET_ACCESS_KEY: string;
};

const { value: env, error } = Joi.object<Env>()
  .keys({
    PORT: Joi.string(),
    NODE_ENV: Joi.string(),
    MONGO_URL: Joi.string(),
    KAKAO_REST_API_KEY: Joi.string(),
    JWT_SECRET: Joi.string(),
    AWS_S3_ACCESS_KEY_ID: Joi.string(),
    AWS_S3_SECRET_ACCESS_KEY: Joi.string(),
  })
  .unknown()
  .validate(process.env);

if (error) throw error;

export default env as Env;
