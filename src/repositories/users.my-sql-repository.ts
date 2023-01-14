import { User, UserConstructorArguments } from '../entity/User';
import MySqlRepository from '../libs/my-sql-repository';

export default class UsersMySqlRepository extends MySqlRepository<User> {
  constructor() {
    super(User);
  }

  findOneByKakaoId(kakaoId: number) {
    return this.repository.findOne({ where: { kakaoId } });
  }

  create(userData: UserConstructorArguments) {
    return this.repository.save(new User(userData));
  }

  findOneByUserId(userId: number) {
    return this.repository.findOne({ where: { userId } });
  }

  find() {
    return this.repository.find();
  }

  updateUsername(user: User, username: string) {
    return this.repository.update(user.userId, { username });
  }

  updateProfileImageUrl(user: User, profileImageUrl: string) {
    return this.repository.update(user.userId, { profileImageUrl });
  }
}
