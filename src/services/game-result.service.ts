import { badRequest } from '@hapi/boom';
import UsersRepository from '../repositories/users.repository';

function getScoreChangeTable(playerCount: number) {
  switch (playerCount) {
    case 2:
      return [30, -10];
    case 3:
      return [70, 40, -20];
    case 4:
      return [100, 50, 30, -30];
    default:
      throw badRequest('배열의 길이가 잘못됐습니다.');
  }
}

export default class GameResultService {
  userRepository: UsersRepository;

  constructor() {
    this.userRepository = new UsersRepository();
  }

  async applyResultToUsers(gameResult: number[]) {
    const table = getScoreChangeTable(gameResult.length);

    const users = await Promise.all(
      gameResult.map((userId) => this.userRepository.findOneByUserId(userId))
    );

    return Promise.all(
      users.map(async (user, index) => {
        if (!user) throw badRequest('해당하는 유저 정보가 없습니다.');

        await this.userRepository.updateScore(user, table[index]);

        const updatedUser = await this.userRepository.findOneByUserId(
          user.userId
        );

        if (!updatedUser) throw Error('수정된 유저 정보를 찾을 수 없음');

        const result = {
          userId: updatedUser.userId,
          username: updatedUser.username,
          prevScore: user.score,
          score: updatedUser.score,
          change: updatedUser.score - user.score,
        };

        return result;
      })
    );
  }
}
