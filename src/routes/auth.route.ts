import { Router } from 'express';
import AuthController from '../controllers/auth.controller';

const authController = new AuthController();
const authRouter = Router();

authRouter
  .get('/check', authorize, AuthController.check)
  .get('/verify', AuthController.verify)
  .post('/logout', authorize, authController.logout)
  .post('/login/kakao', authController.login)
  .post('/unregister/kakao', authController.unregister);

export default authRouter;
