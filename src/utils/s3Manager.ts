import env from '../config/env';
import s3 from '../config/s3';

export async function putObject(body: any, contentType: string) {
  const name = Date.now().toString();

  await s3.putObject({
    Bucket: env.AWS_S3_BUCKET_NAME,
    Key: `raw/${name}`,
    Body: body,
    ContentType: contentType,
    CacheControl: 'max-age=3,600',
  });

  return `https://cdn.davinci-code.online/${name}`;
}
