import { Router } from 'express';
import authRouter from './auth.route';
import privateRouter from './private.route';
import usersRouter from './users.route';

const router = Router();

router
  .get('/', (req, res) => {
    res.status(200).json('ok');
  })
  .use('/auth', authRouter)
  .use('/users', usersRouter)
  .use('/p', privateRouter);

export default router;
