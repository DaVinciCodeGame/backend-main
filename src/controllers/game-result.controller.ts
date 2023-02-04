import { RequestHandler } from 'express';
import GameResultService from '../services/game-result.service';

export default class GameResultController {
  private readonly gameResultService: GameResultService;

  constructor() {
    this.gameResultService = new GameResultService();
  }

  create: RequestHandler = async (req, res, next) => {
    try {
      const gameResult = req.body;

      const updateResult = await this.gameResultService.applyResultToUsers(
        gameResult
      );

      res.status(200).json(updateResult);
    } catch (err) {
      next(err);
    }
  };
}
