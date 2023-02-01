import { RequestHandler } from 'express';
import UsersService from '../services/users.service';
import {
  readManyValidator,
  readValidator,
  updateValidator,
} from '../validation/users.validation';

export default class UsersController {
  usersService: UsersService;

  constructor() {
    this.usersService = new UsersService();
  }

  read: RequestHandler = async (req, res, next) => {
    try {
      const { userId } = await readValidator.resLocals(res.locals);

      const userInfo = await this.usersService.getMyInfo(userId);

      await readValidator.resBody(userInfo);

      res.status(200).json(userInfo);
    } catch (err) {
      next(err);
    }
  };

  readMany: RequestHandler = async (req, res, next) => {
    try {
      const leaderboard = await this.usersService.getLeaderboard();

      await readManyValidator.resBody(leaderboard);

      res.status(200).json(leaderboard);
    } catch (err) {
      next(err);
    }
  };

  update: RequestHandler = async (req, res, next) => {
    try {
      const [{ username }, { userId }, image] = await Promise.all([
        updateValidator.reqBody(req.body),
        updateValidator.resLocals(res.locals),
        updateValidator.reqFile(req.file),
      ]);

      await this.usersService.updateProfile(userId, username, image);

      res.status(204).send();
    } catch (err) {
      next(err);
    }
  };
}
