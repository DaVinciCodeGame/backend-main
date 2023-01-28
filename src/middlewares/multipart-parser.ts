import multer, { memoryStorage } from 'multer';

type Options = {
  field: string;
  fileSize?: number;
};

export function single({ field, fileSize }: Options) {
  const multipartParser = multer({
    storage: memoryStorage(),
    limits: { fileSize },
  }).single(field);

  return multipartParser;
}
