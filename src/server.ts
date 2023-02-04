import mysqlDataSource from './config/mysql';
import App from './app';
import logger from './config/logger';
import env from './config/env';
import './config/leaderboard-scheduler';

mysqlDataSource
  .initialize()
  .then(() => {
    logger.info('MySQL 연결 완료');
    const app = new App();
    app.listen(Number(env.PORT));
  })
  .catch((err: any) => {
    if (err instanceof Error) {
      logger.error(err.message);
    }
  });
