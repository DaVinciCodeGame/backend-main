import { S3 } from '@aws-sdk/client-s3';
import env from './env';

const s3 = new S3({
  region: 'ap-northeast-2',
  credentials: {
    accessKeyId: env.AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_S3_SECRET_ACCESS_KEY,
  },
});

export default s3;
