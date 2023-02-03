import { RequestHandler } from 'express';
import GameResultService from '../services/game-result.service';

export default class GameResultController {
  gameResultService: GameResultService;

  constructor() {
    this.gameResultService = new GameResultService();
  }
}
