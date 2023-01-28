import { badRequest } from '@hapi/boom';
import { NextFunction, Request, Response } from 'express';
import formidable from 'formidable';

export function single(fieldName: string) {
  function multipartParser(req: Request, res: Response, next: NextFunction) {
    const form = formidable();

    form.parse(req, (err, field, files) => {
      if (!files[fieldName]) {
        next(badRequest(`${fieldName} 필드가 없습니다.`));
        return;
      }

      res.locals.files[fieldName] = files[fieldName];

      next();
    });
  }
  return multipartParser;
}
