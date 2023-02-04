import { Router } from 'express';
import GameResultController from '../controllers/game-result.controller';

const gameResultController = new GameResultController();

const gameResultRouter = Router();

export default gameResultRouter;
