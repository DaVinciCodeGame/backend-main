import { badRequest } from '@hapi/boom';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import env from '../config/env';
import UsersRepository from '../repositories/users.repository';
import { putObject } from '../utils/s3Manager';

type KakaoUserInfo = {
  id: number;
  kakao_account: {
    profile: {
      nickname: string;
      thumbnail_image_url: string;
    };
  };
};

export default class AuthService {
  usersRepository: UsersRepository;

  constructor() {
    this.usersRepository = new UsersRepository();
  }

  async authenticateWithKakao(code: string, redirectUri: string) {
    const {
      data: { access_token: accessToken },
    } = await axios.post('https://kauth.kakao.com/oauth/token', null, {
      params: {
        grant_type: 'authorization_code',
        client_id: env.KAKAO_REST_API_KEY,
        redirect_uri: redirectUri,
        code,
      },
    });

    const {
      data: {
        id: kakaoId,
        kakao_account: {
          profile: {
            nickname: username,
            thumbnail_image_url: kakaoProfileImageUrl,
          },
        },
      },
    }: { data: KakaoUserInfo } = await axios.get(
      'https://kapi.kakao.com/v2/user/me',
      {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: { secure_resource: true, property_keys: [] },
      }
    );

    const existUser = await this.usersRepository.findOneByKakaoId(kakaoId);

    if (existUser)
      return {
        isFirstTime: false,
        accessToken: jwt.sign({ userId: existUser.userId }, env.JWT_SECRET, {
          expiresIn: '1h',
        }),
      };

    const {
      data,
      headers: { 'content-type': contentType },
    } = await axios.get(kakaoProfileImageUrl, { responseType: 'arraybuffer' });

    if (!data || !contentType)
      throw badRequest('카카오 계정의 정보가 잘못됐습니다.');

    const image = Buffer.from(data);

    const profileImageUrl = await putObject(image, contentType);

    const newUser = await this.usersRepository.create({
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
