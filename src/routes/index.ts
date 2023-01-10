import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res
    .links({ auth: `${req.protocol}://${req.hostname}/main/auth` })
    .status(200)
    .json('ok');
});

export default router;
