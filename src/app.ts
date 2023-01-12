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
    this.app.use(
      cors({
        credentials: true,
        origin: [env.FRONT_END_URI, 'http://localhost:3000'], // NOTE: 프론트 배포 후 localhost 지울 것
      })
    );
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
