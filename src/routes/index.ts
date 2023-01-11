import { Router } from 'express';
import authRouter from './auth.route';

const router = Router();

router.use('/auth', authRouter).get('/', (req, res) => {
  res
    .links({ auth: `${req.protocol}://${req.hostname}/main/auth` })
    .status(200)
    .json('ok');
});

export default router;
