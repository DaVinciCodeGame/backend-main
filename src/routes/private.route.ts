import { Router } from 'express';
import UsersController from '../controllers/users.controller';

const privateRouter = Router();

const usersController = new UsersController();

privateRouter.get('/users/:userId', usersController.read);

export default privateRouter;
