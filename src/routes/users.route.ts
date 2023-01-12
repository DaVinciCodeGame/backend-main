import { Router } from 'express';
import UsersController from '../controllers/users.controller';

const usersRouter = Router();

const usersController = new UsersController();

usersRouter.get('/me', usersController.getMyInfo);

export default usersRouter;
