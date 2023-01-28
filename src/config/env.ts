import 'dotenv/config';
import Joi from 'joi';

function validate() {
  const { value, error } = Joi.object<{
    [key: string]: string;
  }>()
    .keys({
      PORT: Joi.string(),
      NODE_ENV: Joi.string(),
      MYSQL_URL: Joi.string(),
      KAKAO_REST_API_KEY: Joi.string(),
      JWT_SECRET: Joi.string(),
      AWS_S3_ACCESS_KEY_ID: Joi.string(),
      AWS_S3_SECRET_ACCESS_KEY: Joi.string(),
    })
    .unknown()
    .validate(process.env);

  if (error) throw error;

  return value;
}

const env = validate();

export default env;
