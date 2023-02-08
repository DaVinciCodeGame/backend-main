import { IsNull, Not } from 'typeorm';
import { User } from '../entity/User';
import { UserView } from '../entity/UserView';
import Repository from '../libs/base-repository';
import mysqlDataSource from '../config/mysql';

type UserParams = {
  kakaoId: number;
  username: string;
  profileImageUrl: string;
};

export default class UsersRepository extends Repository<User> {
  private readonly viewRepository;

  constructor() {
    super(User);

    this.viewRepository = mysqlDataSource.getRepository(UserView);
  }

  findOneByKakaoId(kakaoId: number) {
    return this.repository.findOne({ where: { kakaoId } });
  }

  create({ kakaoId, username, profileImageUrl }: UserParams) {
    const user = new User();

    user.kakaoId = kakaoId;
    user.username = username;
    user.profileImageUrl = profileImageUrl;

    return this.repository.save(user);
  }

  findOneByUserId(userId: number) {
    return this.repository.findOne({
      where: { userId },
    });
  }

  findAll() {
    return this.repository.find({});
  }

  findAllWithRanking() {
    return this.viewRepository.find({
      where: { scoreUpdatedAt: Not(IsNull()) },
    });
  }

  updateUsername(user: User, username: string) {
    return this.repository.update(user.userId, { username });
  }

  updateProfileImageUrl(user: User, profileImageUrl: string) {
    return this.repository.update(user.userId, { profileImageUrl });
  }

  delete(user: User) {
    return this.repository.remove(user);
  }

  updateRefreshToken(user: User, refreshToken: string | null) {
    return this.repository.update(user.userId, { refreshToken });
  }

  updateScore({ userId }: User, change: number, updatedAt: Date) {
    return this.repository
      .createQueryBuilder()
      .update()
      .set({
        score: () => `GREATEST(score + ${change}, 0)`,
        scoreUpdatedAt: updatedAt,
      })
      .where('userId = :userId', { userId })
      .execute();
  }
}
