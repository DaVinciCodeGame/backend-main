import { Router } from 'express';
import authorize from '../middlewares/authorize';
import AuthController from '../controllers/auth.controller';

const authController = new AuthController();
const authRouter = Router();

authRouter
  .get('/check', authorize, AuthController.check)
  .post('/logout', authorize, authController.logout)
  .post('/login/kakao', authController.login)
  .post('/unregister/kakao', authorize, authController.unregister);

export default authRouter;
