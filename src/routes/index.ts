import { Router } from 'express';
import authRouter from './auth.route';
import userRouter from './users.route';

const router = Router();

router
  .get('/', (req, res) => {
    res.status(200).json('ok');
  })
  .use('/auth', authRouter)
  .use('/users', userRouter);

export default router;
