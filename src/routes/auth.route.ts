import { Router } from 'express';
import AuthController from '../controllers/auth.controller';
import authorize from '../middlewares/authorize';

const authController = new AuthController();
const authRouter = Router();

authRouter
  .post('/kakao', authController.authenticateWithKakao)
  .delete('/kakao', authorize, authController.unregisterFromKakao);

export default authRouter;
