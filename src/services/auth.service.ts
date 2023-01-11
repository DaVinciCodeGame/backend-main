import jwt from 'jsonwebtoken';
import env from '../config/env';

import AuthRepository from '../repositories/auth.repository';
import UserRepository from '../repositories/user.repository';

export default class AuthService {
  authRepository: AuthRepository;

  userRepository: UserRepository;

  constructor() {
    this.authRepository = new AuthRepository();
    this.userRepository = new UserRepository();
  }

  async authenticateWithKakao(code: string) {
    const kakaoAccessToken = await this.authRepository.getAccessTokenFromKakao(
      code
    );

    const { kakaoId, username, profileImageUrl } =
      await this.authRepository.getUserInfoFromKakao(kakaoAccessToken);

    const existUser = await this.userRepository.findByKakaoId(kakaoId);

    if (existUser)
      return jwt.sign({ userId: existUser.userId }, env.JWT_SECRET, {
        expiresIn: '1h',
      });

    const newUser = await this.userRepository.create({
      kakaoId,
      username,
      profileImageUrl,
    });

    return jwt.sign({ userId: newUser.userId }, env.JWT_SECRET, {
      expiresIn: '1h',
    });
  }
}
