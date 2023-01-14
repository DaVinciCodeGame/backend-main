import { RequestHandler } from 'express';
import sharp from 'sharp';

const imageResizer = (size: number) => {
  const middleware: RequestHandler = async (req, res, next) => {
    try {
      if (req.file) {
        res.locals.resizedImage = await sharp(req.file?.buffer)
          .resize(size, size)
          .jpeg({ mozjpeg: true })
          .toBuffer();
      }
      next();
    } catch (err) {
      next(err);
    }
  };
  return middleware;
};

export default imageResizer;
