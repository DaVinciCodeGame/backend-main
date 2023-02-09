import { unauthorized } from '@hapi/boom';
import { RequestHandler } from 'express';
import mysqlDataSource from '../config/mysql';
import { User } from '../entity/User';
import cookieOptions from '../utils/cookie-options';
import {
  signAccessToken,
  verifyAccessToken,
  verifyRefreshToken,
} from '../utils/token';

const authorize: RequestHandler = async (req, res, next) => {
  const { accessToken, refreshToken } = req.cookies;

  try {
    try {
      if (typeof accessToken !== 'string') throw new Error(); // 액세스 토큰이 없거나 문자열 타입이 아닐 때 리프레시 토큰 검증으로 이동

      const { userId, exp } = verifyAccessToken(accessToken); // 액세스 토큰 검증, 오류 발생 시 리프레시 토큰 검증으로 이동

      if (typeof userId !== 'number' || !exp) throw new Error(); // 액세스 토큰의 내용이 유효하지 않으면 리프레시 토큰 검증으로 이동

      res.locals.userId = userId;
      res.locals.accessTokenExp = exp * 1000 - Date.now(); // JWT는 시간을 초 단위로 저장하기 때문에 1000을 곱해 밀리초로 변경

      next();
    } catch {
      // 액세스 토큰에 이상이 있을 때 리프레시 토큰을 검증하는 부분

      if (typeof refreshToken !== 'string')
        throw unauthorized('요청에 포함된 토큰이 유효하지 않습니다.'); // 리프레시 토큰이 없거나 문자열 타입이 아닐 때 401 응답

      let userId: number;

      // 리프레시 토큰 검증, 에러 발생 시 401 응답
      try {
        userId = verifyRefreshToken(refreshToken).userId;
      } catch (err) {
        throw unauthorized('요청에 포함된 토큰이 유효하지 않습니다.');
      }

      // 리프레시 토큰에 저장된 유저 ID로 유저 정보 검색
      const user = await mysqlDataSource
        .getRepository(User)
        .findOneBy({ userId });

      if (!user) throw unauthorized('요청에 포함된 토큰이 유효하지 않습니다.'); // 해당하는 유저 정보가 없으면 401 응답

      if (user.refreshToken !== refreshToken)
        throw unauthorized('요청에 포함된 토큰이 유효하지 않습니다.'); // 유저 정보에 저장된 리프레시 토큰과 일치하지 않으면 401 응답

      const newAccessToken = signAccessToken(userId);

      res.cookie('accessToken', newAccessToken, {
        ...cookieOptions,
        maxAge: 60 * 60 * 1000,
      });

      const { exp } = verifyAccessToken(newAccessToken);

      if (!exp) throw new Error('새 액세스 토큰 발급 중 오류 발생');

      res.locals.userId = userId;
      res.locals.accessTokenExp = exp * 1000 - Date.now();

      next();
    }
  } catch (err) {
    next(err);
  }
};

export default authorize;
