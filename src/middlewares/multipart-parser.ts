import { badRequest } from '@hapi/boom';
import { NextFunction, Request, Response } from 'express';
import formidable from 'formidable';

export function single(fieldName: string) {
  function multipartParser(req: Request, res: Response, next: NextFunction) {
    try {
      const form = formidable();

      form.parse(req, (err, field, files) => {
        if (err) throw err;
        if (!files[fieldName])
          throw badRequest(`${fieldName} 필드가 없습니다.`);

        res.locals.files[fieldName] = files[fieldName];

        next();
      });
    } catch (err) {
      next(err);
    }
  }
  return multipartParser;
}
