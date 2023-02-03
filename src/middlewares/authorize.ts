import { badRequest } from '@hapi/boom';
import { RequestHandler } from 'express';
import jwt, { TokenExpiredError } from 'jsonwebtoken';
import env from '../config/env';
import UsersRepository from '../repositories/users.repository';

const authorize: RequestHandler = async (req, res, next) => {
  const { accessToken, refreshToken } = req.cookies;

  try {
    if (!accessToken)
      throw badRequest('인증 정보가 유효하지 않습니다.', '쿠키 없음');

    let payload: string | jwt.JwtPayload | null;

    try {
      payload = jwt.verify(accessToken, env.JWT_SECRET);
    } catch (err) {
      if (!(err instanceof TokenExpiredError)) {
        throw badRequest('인증 정보가 유효하지 않습니다.', '엑세스 토큰');
      }

      payload = jwt.decode(accessToken);

      if (
        !payload ||
        typeof payload === 'string' ||
        typeof payload.userId !== 'number'
      ) {
        throw badRequest('인증 정보가 유효하지 않습니다.', '페이로드');
      }

      const usersRepository = new UsersRepository();
      const user = await usersRepository.findOneByUserId(payload.userId);

      if (!user) {
        throw badRequest('인증 정보가 유효하지 않습니다.', '유저 정보 없음');
      }

      if (user.refreshToken !== refreshToken) {
        throw badRequest('인증 정보가 유효하지 않습니다.', '리프레시 토큰');
      }

      const newAccessToken = jwt.sign(
        { userId: payload.userId },
        env.JWT_SECRET,
        { expiresIn: '1s' }
      );

      res.cookie('accessToken', newAccessToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        domain: '.davinci-code.online',
        maxAge: 60 * 60 * 1000,
      });

      payload = jwt.verify(accessToken, env.JWT_SECRET);
    }

    if (
      typeof payload === 'string' ||
      typeof payload.userId !== 'number' ||
      !payload.exp
    )
      throw badRequest('인증 정보가 유효하지 않습니다.', '페이로드');

    res.locals.userId = payload.userId;
    res.locals.accessTokenExp = payload.exp * 1000 - Date.now();

    next();
  } catch (err) {
    next(err);
  }
};

export default authorize;
