import { RequestHandler } from 'express';
import AuthService from '../services/auth.service';

import {
  authenticateWithKakaoValidator,
  unregisterFromKakaoValidator,
  checkTokenValidator,
} from '../validation/auth.validation';

export default class AuthController {
  authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  static logout: RequestHandler = async (req, res, next) => {
    try {
      res
        .clearCookie('accessToken', {
          httpOnly: true,
          secure: true,
          sameSite: 'none',
        })
        .status(204)
        .send();
    } catch (err) {
      next(err);
    }
  };

  static check: RequestHandler = async (req, res, next) => {
    try {
      const { userId, accessTokenExp } = await checkTokenValidator.resLocals(
        res.locals
      );

      res.status(200).json({ userId, accessTokenExp });
    } catch (err) {
      next(err);
    }
  };

  authenticateWithKakao: RequestHandler = async (req, res, next) => {
    try {
      const { code, 'redirect-uri': redirectUri } =
        await authenticateWithKakaoValidator.reqQuery(req.query);

      const { isFirstTime, accessToken } =
        await this.authService.authenticateWithKakao(code, redirectUri);

      await authenticateWithKakaoValidator.resCookie({ accessToken });

      res
        .cookie('accessToken', accessToken)
        .status(isFirstTime ? 201 : 200)
        .json({ message: isFirstTime ? '가입 완료' : '로그인 완료' });
    } catch (err) {
      next(err);
    }
  };

  unregisterFromKakao: RequestHandler = async (req, res, next) => {
    try {
      const [{ userId }, { code, redirectUri }] = await Promise.all([
        unregisterFromKakaoValidator.resLocals(res.locals),
        unregisterFromKakaoValidator.reqQuery(req.query),
      ]);

      await this.authService.unregisterFromKakao(userId, code, redirectUri);

      res
        .clearCookie('accessToken', {
          httpOnly: true,
          secure: true,
          sameSite: 'none',
        })
        .status(204)
        .send();
    } catch (err) {
      next(err);
    }
  };
}
