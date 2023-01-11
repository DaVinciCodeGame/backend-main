import { Router } from 'express';
import AuthController from '../controllers/auth.controller';

const authController = new AuthController();
const authRouter = Router();

authRouter.get('/kakao', AuthController.getAuthenticationFromKakao);
authRouter.get('/kakao/callback', authController.authenticateWithKakao);

export default authRouter;
