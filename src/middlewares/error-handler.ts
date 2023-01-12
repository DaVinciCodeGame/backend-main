import { ErrorRequestHandler } from 'express';
import logger from '../config/logger';

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  logger.error(err.stack);

  if (err.response) {
    logger.error({
      data: err.response.data,
      status: err.response.status,
      headers: err.response.headers,
    });
  } else if (err.request) logger.error(err.request);

  if (err.isBoom)
    res.status(err.output.statusCode).json({ errorMessage: err.message });
  else if (err.isJoi) res.status(400).json({ errorMessage: err.message });
  else res.status(500).json({ errorMessage: '알 수 없는 오류' });
};

export default errorHandler;
