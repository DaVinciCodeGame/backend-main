import { Router } from 'express';

export default abstract class BaseRoute {
  protected readonly router: Router;

  constructor() {
    this.router = Router();
  }
}
