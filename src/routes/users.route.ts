import { Router } from 'express';
import UsersController from '../controllers/users.controller';
import authorize from '../middlewares/authorize';

const usersRouter = Router();

const usersController = new UsersController();

usersRouter
  .get('/me', authorize, usersController.getMyInfo)
  .get('/', usersController.getLeaderboard)
  .put('/me', authorize, usersController.updateUsername);

export default usersRouter;
