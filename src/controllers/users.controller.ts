import { RequestHandler } from 'express';
import UsersService from '../services/users.service';
import { getMyInfoSchema } from '../validation/users.validation';

export default class UsersController {
  usersService: UsersService;

  constructor() {
    this.usersService = new UsersService();
  }

  getMyInfo: RequestHandler = async (req, res, next) => {
    try {
      const { userId } = await getMyInfoSchema.input.locals.validateAsync(
        res.locals
      );

      const userInfo = await this.usersService.getMyInfo(userId);

      await getMyInfoSchema.output.body.validateAsync(userInfo);

      res.status(200).json(userInfo);
    } catch (err) {
      next(err);
    }
  };

  getLeaderboard: RequestHandler = async (req, res, next) => {
    try {
      const leaderboard = await this.usersService.getLeaderboard();

      res.status(200).json(leaderboard);
    } catch (err) {
      next(err);
    }
  };
}
