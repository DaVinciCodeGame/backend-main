import { Router } from 'express';
import UsersController from '../controllers/users.controller';
import authorize from '../middlewares/authorize';
import multipartParser from '../middlewares/multipart-parser';

const usersRouter = Router();

const usersController = new UsersController();

usersRouter
  .get('/me', authorize, usersController.getMyInfo)
  .get('/', usersController.getLeaderboard)
  .put('/me', authorize, usersController.updateProfile)
  .post(
    '/test',
    (req, res, next) => {
      res.locals.userId = 1;
      next();
    },
    multipartParser({ fileSize: 10 * 1024 * 1024 }).single('image'),
    usersController.updateProfile
  );

export default usersRouter;
