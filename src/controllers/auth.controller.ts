import { CookieOptions, RequestHandler } from 'express';
import AuthService from '../services/auth.service';
import {
  loginValidator,
  unregisterValidator,
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
          domain: '.davinci-code.online',
          path: '/',
        })
        .status(204)
        .send();
    } catch (err) {
      next(err);
    }
  };

  static check: RequestHandler = async (req, res, next) => {
    try {
      const { userId, accessTokenExp } =
        await checkTokenValidator.resLocals.validateAsync(res.locals);

      res.status(200).json({ userId, accessTokenExp });
    } catch (err) {
      next(err);
    }
  };

  static verify: RequestHandler = async (req, res, next) => {
    try {
      const { authorization } = req.headers;

      await AuthService.verify(authorization);

      res.status(204).send();
    } catch (err) {
      next(err);
    }
  };

  login: RequestHandler = async (req, res, next) => {
    try {
      const { code, 'redirect-uri': redirectUri } =
        await loginValidator.reqQuery.validateAsync(req.query);

      const { isFirstTime, accessToken, refreshToken } =
        await this.authService.authenticateWithKakao(code, redirectUri);

      await loginValidator.resCookie.validateAsync({ accessToken });

      const cookieOptions: CookieOptions = {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        domain: '.davinci-code.online',
      };

      res
        .cookie('accessToken', accessToken, {
          ...cookieOptions,
          maxAge: 60 * 60 * 1000,
        })
        .cookie('refreshToken', refreshToken, {
          ...cookieOptions,
          maxAge: 7 * 24 * 60 * 60 * 1000,
        })
        .status(isFirstTime ? 201 : 200)
        .json({ message: isFirstTime ? '가입 완료' : '로그인 완료' });
    } catch (err) {
      next(err);
    }
  };

  unregister: RequestHandler = async (req, res, next) => {
    try {
      const [{ userId }, { code, redirectUri }] = await Promise.all([
        unregisterValidator.resLocals.validateAsync(res.locals),
        unregisterValidator.reqQuery.validateAsync(req.query),
      ]);

      await this.authService.unregisterFromKakao(userId, code, redirectUri);

      res
        .clearCookie('accessToken', {
          httpOnly: true,
          secure: true,
          sameSite: 'none',
          domain: '.davinci-code.online',
          path: '/',
        })
        .status(204)
        .send();
    } catch (err) {
      next(err);
    }
  };
}
