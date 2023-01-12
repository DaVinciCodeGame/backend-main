import jwt from 'jsonwebtoken';
import env from '../config/env';

import AuthRepository from '../repositories/auth.repository';
import UsersRepository from '../repositories/users.repository';

export default class AuthService {
  authRepository: AuthRepository;

  userRepository: UsersRepository;

  constructor() {
    this.authRepository = new AuthRepository();
    this.userRepository = new UsersRepository();
  }

  async authenticateWithKakao(code: string) {
    const kakaoAccessToken = await this.authRepository.getAccessTokenFromKakao(
      code
    );

    const { kakaoId, username, profileImageUrl } =
      await this.authRepository.getUserInfoFromKakao(kakaoAccessToken);

    const existUser = await this.userRepository.findOneByKakaoId(kakaoId);

    if (existUser)
      return {
        isFirstTime: false,
        accessToken: jwt.sign({ userId: existUser.userId }, env.JWT_SECRET, {
          expiresIn: '1h',
        }),
      };

    const newUser = await this.userRepository.create({
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
