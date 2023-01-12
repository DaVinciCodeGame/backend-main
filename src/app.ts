import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import env from './config/env';
import logger from './config/logger';
import errorHandler from './middlewares/error-handler';
import morgan from './middlewares/morgan';
import router from './routes';

class App {
  private readonly app;

  constructor() {
    this.app = express();
    this.setMiddlewares();
  }

  private setMiddlewares() {
    this.app.use(cors({ credentials: true, origin: env.FRONT_END_URI })); // TODO: 프론트앤드 서버 배포 후 해당 도메인에 연결하도록 설정
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(cookieParser());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(morgan());
    this.app.use('/main', router);
    this.app.use(errorHandler);
  }

  listen(port: number) {
    this.app.listen(port, () => {
      logger.info(`${port} 포트에서 대기 중`);
    });
  }
}

export default App;
