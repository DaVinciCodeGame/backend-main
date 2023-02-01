import { Router } from 'express';
import authorize from '../middlewares/authorize';
import authRouter from './auth.route';
import gameResultRouter from './game-result.route';
import usersRouter from './users.route';

const router = Router();

router
  .get('/', (req, res) => {
    res.status(200).json('ok');
  })
  .use('/auth', authorize, authRouter)
  .use('/users', authorize, usersRouter)
  .use('/game', gameResultRouter);

export default router;
