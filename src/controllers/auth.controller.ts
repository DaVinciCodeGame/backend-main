import { RequestHandler } from 'express';
import AuthService from '../services/auth.service';

import {
  authenticateWithKakaoSchema,
  unregisterFromKakaoSchema,
} from '../validation/auth.validation';

export default class AuthController {
  authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  authenticateWithKakao: RequestHandler = async (req, res, next) => {
    try {
      const { code, 'redirect-uri': redirectUri } =
        await authenticateWithKakaoSchema.input.query.validateAsync(req.query);

      const { isFirstTime, accessToken } =
        await this.authService.authenticateWithKakao(code, redirectUri);

      await authenticateWithKakaoSchema.output.cookie.validateAsync({
        accessToken,
      });

      res
        .cookie('accessToken', accessToken, {
          httpOnly: true,
          secure: true,
          sameSite: 'none',
        })
        .status(isFirstTime ? 201 : 200)
        .json({ message: isFirstTime ? '가입 완료' : '로그인 완료' });
    } catch (err) {
      next(err);
    }
  };

  unregisterFromKakao: RequestHandler = async (req, res, next) => {
    try {
      const [{ userId }, { code, redirectUri }] = await Promise.all([
        unregisterFromKakaoSchema.input.locals.validateAsync(res.locals),
        unregisterFromKakaoSchema.input.query.validateAsync(req.query),
      ]);

      await this.authService.unregisterFromKakao(userId, code, redirectUri);

      res.status(204).send();
    } catch (err) {
      next(err);
    }
  };
}
