import { User, UserConstructorArguments } from '../entity/User';
import MySqlRepository from '../libs/my-sql-repository';

export default class UsersRepository extends MySqlRepository<User> {
  constructor() {
    super(User);
  }

  findByKakaoId(kakaoId: number) {
    return this.repository.findOne({ where: { kakaoId } });
  }

  create(userData: UserConstructorArguments) {
    return this.repository.save(new User(userData));
  }

  findByUserId(userId: number) {
    return this.repository.findOne({ where: { userId } });
  }
}
