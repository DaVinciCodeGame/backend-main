import { Router } from 'express';
import UsersController from '../controllers/users.controller';

const usersRouter = Router();

const usersController = new UsersController();

usersRouter
  .get('/me', usersController.getMyInfo)
  .get('/', usersController.getLeaderboard);

export default usersRouter;
