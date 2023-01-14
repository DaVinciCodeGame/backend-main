import { badRequest } from '@hapi/boom';
import UsersMySqlRepository from '../repositories/users.my-sql-repository';
import S3Repository from '../repositories/users.s3-repository';

export default class UsersService {
  usersMySqlRepository: UsersMySqlRepository;

  usersS3Repository: S3Repository;

  constructor() {
    this.usersMySqlRepository = new UsersMySqlRepository();
    this.usersS3Repository = new S3Repository();
  }

  async getMyInfo(userId: number) {
    const user = await this.usersMySqlRepository.findOneByUserId(userId);

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
    const users = await this.usersMySqlRepository.find();

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

  async updateProfile(userId: number, username: string, image: Buffer) {
    const user = await this.usersMySqlRepository.findOneByUserId(userId);

    if (!user) throw badRequest('인증 정보에 해당하는 사용자가 없습니다.');

    if (username)
      await this.usersMySqlRepository.updateUsername(user, username);

    if (image) {
      const prevImageUrl = user.profileImageUrl;

      const newImageUrl = await this.usersS3Repository.putProfileImage(image);
      await this.usersMySqlRepository.updateProfileImageUrl(user, newImageUrl);

      if (prevImageUrl)
        await this.usersS3Repository.deleteObjectByUrl(prevImageUrl);
    }
  }
}
