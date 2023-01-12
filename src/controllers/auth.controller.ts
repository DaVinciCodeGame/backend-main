import { RequestHandler } from 'express';
import AuthService from '../services/auth.service';

import { authenticateWithKakao } from '../validation/auth.validation';

export default class AuthController {
  authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  authenticateWithKakao: RequestHandler = async (req, res, next) => {
    try {
      const { code } = await authenticateWithKakao.input.query.validateAsync(
        req.query
      );

      const { isFirstTime, accessToken } =
        await this.authService.authenticateWithKakao(code);

      await authenticateWithKakao.output.cookie.validateAsync({ accessToken });

      res
        .cookie('accessToken', accessToken, { httpOnly: true, secure: true })
        .status(isFirstTime ? 201 : 200)
        .json({ message: isFirstTime ? '가입 완료' : '로그인 완료' });
    } catch (err) {
      next(err);
    }
  };
}
