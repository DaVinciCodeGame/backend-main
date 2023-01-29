import env from '../config/env';
import s3 from '../config/s3';

export async function putObject(body: any, contentType: string) {
  const key = `raw/${Date.now()}`;

  await s3.putObject({
    Bucket: env.AWS_S3_BUCKET_NAME,
    Key: key,
    Body: body,
    ContentType: contentType,
  });

  return `https://cdn.davinci-code.online/${key}`;
}
