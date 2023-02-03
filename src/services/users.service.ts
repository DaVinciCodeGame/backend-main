import { badRequest } from '@hapi/boom';
import axios from 'axios';
import env from '../config/env';
import UsersRepository from '../repositories/users.repository';
import { putObject } from '../utils/s3Manager';

export default class UsersService {
  usersRepository: UsersRepository;

  constructor() {
    this.usersRepository = new UsersRepository();
  }

  async getUserInfo(userId: number) {
    const user = await this.usersRepository.findOneByUserId(userId);

    if (!user) throw badRequest('인증 정보에 해당하는 사용자가 없습니다.');

    return {
      userId: user.userId,
      username: user.username,
      profileImageUrl: user.profileImageUrl,
      score: user.score,
      ranking: user.ranking,
      prevRanking: user.prevRanking,
    };
  }

  async getLeaderboard() {
    const users = await this.usersRepository.findAll();

    const leaderboard = users.map(
      ({ userId, username, profileImageUrl, score, ranking, prevRanking }) => {
        return {
          userId,
          username,
          profileImageUrl,
          score,
          ranking,
          prevRanking,
        };
      }
    );

    return leaderboard;
  }

  async updateProfile(
    userId: number,
    username: string,
    image: Express.Multer.File
  ) {
    const user = await this.usersRepository.findOneByUserId(userId);

    if (!user) throw badRequest('인증 정보에 해당하는 사용자가 없습니다.');

    if (username) await this.usersRepository.updateUsername(user, username);
    if (image) {
      const imageUrl = await putObject(image.buffer, image.mimetype);

      await this.usersRepository.updateProfileImageUrl(user, imageUrl);
    }
  }
}
