import 'dotenv/config';
import Joi from 'joi';

function validate() {
  const { value, error } = Joi.object<{
    PORT: string;
    NODE_ENV: string;
    MYSQL_URL: string;
    KAKAO_REST_API_KEY: string;
    JWT_SECRET: string;
    AWS_S3_ACCESS_KEY_ID: string;
    AWS_S3_SECRET_ACCESS_KEY: string;
    AWS_S3_BUCKET_NAME: string;
  }>()
    .keys({
      PORT: Joi.string().required(),
      NODE_ENV: Joi.string().required(),
      MYSQL_URL: Joi.string().required(),
      KAKAO_REST_API_KEY: Joi.string().required(),
      JWT_SECRET: Joi.string().required(),
      AWS_S3_ACCESS_KEY_ID: Joi.string().required(),
      AWS_S3_SECRET_ACCESS_KEY: Joi.string().required(),
      AWS_S3_BUCKET_NAME: Joi.string().required(),
    })
    .unknown()
    .validate(process.env);

  if (error) throw error;

  return value;
}

const env = validate();

export default env;
