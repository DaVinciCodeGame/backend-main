import dataSource from './config/typeorm';
import App from './app';
import logger from './config/logger';
import env from './config/env';

dataSource
  .initialize()
  .then(() => {
    logger.info('데이터베이스 연결 완료');
    const app = new App();
    app.listen(Number(env.PORT));
  })
  .catch((err: any) => {
    logger.error(err.message);
  });
