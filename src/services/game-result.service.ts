import UsersRepository from '../repositories/users.repository';

export default class GameResultService {
  userRepository: UsersRepository;

  constructor() {
    this.userRepository = new UsersRepository();
  }
}
