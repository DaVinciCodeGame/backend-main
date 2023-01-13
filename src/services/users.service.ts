import { badRequest } from '@hapi/boom';

import UsersRepository from '../repositories/users.repository';

export default class UsersService {
  usersRepository: UsersRepository;

  constructor() {
    this.usersRepository = new UsersRepository();
  }

  async getMyInfo(userId: number) {
    const user = await this.usersRepository.findOneByUserId(userId);

    if (!user) throw badRequest('인증 정보에 해당하는 사용자가 없습니다.');

    return {
      userId: user.userId,
      username: user.username,
      profileImageUrl: user.profileImageUrl,
      score: user.score,
      ranking: 0,
      change: 0,
      rank: 0,
    };
  }

  async getLeaderboard() {
    const users = await this.usersRepository.find();

    const leaderboard = users.map(({ username, profileImageUrl, score }) => {
      return {
        username,
        profileImageUrl,
        score,
        ranking: 0,
        change: 0,
        rank: 0,
      };
    });

    return leaderboard;
  }

  async updateProfile(userId: number, username: string) {
    const user = await this.usersRepository.findOneByUserId(userId);

    if (!user) throw badRequest('인증 정보에 해당하는 사용자가 없습니다.');

    return this.usersRepository.update(user, username);
  }
}
