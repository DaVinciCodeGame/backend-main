import jwt from 'jsonwebtoken';
import env from '../config/env';

import AuthRepository from '../repositories/auth.repository';
import UsersMySqlRepository from '../repositories/users.my-sql-repository';

export default class AuthService {
  authRepository: AuthRepository;

  userMySqlRepository: UsersMySqlRepository;

  constructor() {
    this.authRepository = new AuthRepository();
    this.userMySqlRepository = new UsersMySqlRepository();
  }

  async authenticateWithKakao(code: string, redirectUri: string) {
    const kakaoAccessToken = await this.authRepository.getAccessTokenFromKakao(
      code,
      redirectUri
    );

    const { kakaoId, username, profileImageUrl } =
      await this.authRepository.getUserInfoFromKakao(kakaoAccessToken);

    const existUser = await this.userMySqlRepository.findOneByKakaoId(kakaoId);

    if (existUser)
      return {
        isFirstTime: false,
        accessToken: jwt.sign({ userId: existUser.userId }, env.JWT_SECRET, {
          expiresIn: '1h',
        }),
      };

    const newUser = await this.userMySqlRepository.create({
      kakaoId,
      username,
      profileImageUrl,
    });

    return {
      isFirstTime: true,
      accessToken: jwt.sign({ userId: newUser.userId }, env.JWT_SECRET, {
        expiresIn: '1h',
      }),
    };
  }
}
