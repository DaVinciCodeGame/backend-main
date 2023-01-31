import { Router } from 'express';
import authRouter from './auth.route';
import roomsRouter from './rooms.route';
import usersRouter from './users.route';

const router = Router();

router
  .get('/', (req, res) => {
    res.status(200).json('ok');
  })
  .use('/auth', authRouter)
  .use('/users', usersRouter)
  .use('/rooms', roomsRouter);

export default router;
