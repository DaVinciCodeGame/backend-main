import axios from 'axios';
import jwt from 'jsonwebtoken';
import env from '../config/env';

import AuthRepository from '../repositories/auth.repository';
import UsersRepository from '../repositories/users.repository';
import UsersS3Repository from '../repositories/users.s3-repository';

export default class AuthService {
  authRepository: AuthRepository;

  usersMySqlRepository: UsersRepository;

  usersS3Repository: UsersS3Repository;

  constructor() {
    this.authRepository = new AuthRepository();
    this.usersMySqlRepository = new UsersRepository();
    this.usersS3Repository = new UsersS3Repository();
  }

  async authenticateWithKakao(code: string, redirectUri: string) {
    const kakaoAccessToken = await this.authRepository.getAccessTokenFromKakao(
      code,
      redirectUri
    );

    const { kakaoId, username, profileImageUrl } =
      await this.authRepository.getUserInfoFromKakao(kakaoAccessToken);

    const existUser = await this.usersMySqlRepository.findOneByKakaoId(kakaoId);

    if (existUser)
      return {
        isFirstTime: false,
        accessToken: jwt.sign({ userId: existUser.userId }, env.JWT_SECRET, {
          expiresIn: '1h',
        }),
      };

    const newUser = await this.usersMySqlRepository.create({
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
