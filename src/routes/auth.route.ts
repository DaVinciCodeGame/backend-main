import { Router } from 'express';
import AuthController from '../controllers/auth.controller';
import authorize from '../middlewares/authorize';

const authController = new AuthController();
const authRouter = Router();

authRouter
  .get('/check', authorize, AuthController.check)
  .post('/logout', AuthController.logout)
  .post('/login/kakao', authController.login)
  .post('/unregister/kakao', authorize, authController.unregister);

export default authRouter;
