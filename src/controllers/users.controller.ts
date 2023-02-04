import { RequestHandler } from 'express';
import UsersService from '../services/users.service';
import {
  readManyValidator,
  readValidator,
  updateValidator,
} from '../validation/users.validation';

export default class UsersController {
  private readonly usersService: UsersService;

  constructor() {
    this.usersService = new UsersService();
  }

  read: RequestHandler = async (req, res, next) => {
    try {
      const { userId } = req.params;

      if (!userId) throw new Error();

      const userInfo = await this.usersService.getUserInfo(Number(userId));

      res.status(200).json(userInfo);
    } catch (err) {
      next(err);
    }
  };

  readMyInfo: RequestHandler = async (req, res, next) => {
    try {
      const { userId } = await readValidator.resLocals.validateAsync(
        res.locals
      );

      const userInfo = await this.usersService.getUserInfo(userId);

      await readValidator.resBody.validateAsync(userInfo);

      res.status(200).json(userInfo);
    } catch (err) {
      next(err);
    }
  };

  readMany: RequestHandler = async (req, res, next) => {
    try {
      const leaderboard = await this.usersService.getLeaderboard();

      await readManyValidator.resBody.validateAsync(leaderboard);

      res.status(200).json(leaderboard);
    } catch (err) {
      next(err);
    }
  };

  update: RequestHandler = async (req, res, next) => {
    try {
      const [{ username }, { userId }, image] = await Promise.all([
        updateValidator.reqBody.validateAsync(req.body),
        updateValidator.resLocals.validateAsync(res.locals),
        updateValidator.reqFile.validateAsync(req.file),
      ]);

      await this.usersService.updateProfile(userId, username, image);

      res.status(204).send();
    } catch (err) {
      next(err);
    }
  };
}
