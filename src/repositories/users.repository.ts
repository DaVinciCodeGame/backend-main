import { User } from '../entity/User';
import Repository from '../libs/base-repository';

type UserParams = {
  kakaoId: number;
  username: string;
  profileImageUrl: string;
};

export default class UsersRepository extends Repository<User> {
  constructor() {
    super(User);
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
    return this.repository.find();
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

  updateScore({ userId }: User, change: number) {
    return this.repository.increment({ userId }, 'score', change);
  }
}
