import { badRequest } from '@hapi/boom';
import UsersRepository from '../repositories/users.repository';
import { putObject } from '../utils/s3Manager';

export default class UsersService {
  private readonly usersRepository: UsersRepository;

  constructor() {
    this.usersRepository = new UsersRepository();
  }

  async getUserInfo(userId: number) {
    const user = await this.usersRepository.findOneByUserId(userId);

    if (!user) throw badRequest('인증 정보에 해당하는 사용자가 없습니다.');

    return user;
  }

  async getUserInfoWithRanking(userId: number) {
    const user = await this.usersRepository.findOneByUserIdWithRanking(userId);

    if (!user) throw badRequest('인증 정보에 해당하는 사용자가 없습니다.');

    return user;
  }

  getLeaderboard() {
    return this.usersRepository.findAllWithRanking();
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
