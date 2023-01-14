import multer from 'multer';

const multipartParser = ({ fileSize }: { fileSize: number }) =>
  multer({
    storage: multer.memoryStorage(),
    limits: {
      fileSize,
    },
  });

export default multipartParser;
