import { Router } from 'express';
import GameResultController from '../controllers/game-result.controller';
import UsersController from '../controllers/users.controller';

const privateRouter = Router();

const usersController = new UsersController();
const gameResultController = new GameResultController();

privateRouter
  .get('/users/:userId', usersController.read)
  .post('/game-result', gameResultController.create);

export default privateRouter;
