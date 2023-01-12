import env from '../config/env';
import AjaxRepository from '../libs/ajax-repository';

type KakaoUserInfo = {
  id: number;
  kakao_account: {
    profile: {
      nickname: string;
      thumbnail_image_url: string;
    };
  };
};

export default class AuthRepository extends AjaxRepository {
  async getAccessTokenFromKakao(code: string) {
    const {
      data: { access_token: accessToken },
    } = await this.post('https://kauth.kakao.com/oauth/token', null, {
      params: {
        grant_type: 'authorization_code',
        client_id: env.KAKAO_REST_API_KEY,
        redirect_uri: env.KAKAO_REDIRECT_URI,
        code,
      },
    });

    return accessToken;
  }

  async getUserInfoFromKakao(accessToken: string) {
    const {
      data: {
        id: kakaoId,
        kakao_account: {
          profile: { nickname: username, thumbnail_image_url: profileImageUrl },
        },
      },
    }: { data: KakaoUserInfo } = await this.get(
      'https://kapi.kakao.com/v2/user/me',
      {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: { secure_resource: true, property_keys: [] },
      }
    );

    return { kakaoId, username, profileImageUrl };
  }
}
