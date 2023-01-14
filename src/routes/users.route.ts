import { Router } from 'express';
import UsersController from '../controllers/users.controller';
import authorize from '../middlewares/authorize';
import imageResizer from '../middlewares/image-resizer';
import multipartParser from '../middlewares/multipart-parser';

const usersRouter = Router();

const usersController = new UsersController();

usersRouter
  .get('/me', authorize, usersController.getMyInfo)
  .get('/', usersController.getLeaderboard)
  .put(
    '/me',
    authorize,
    multipartParser({ fileSize: 10 * 1024 * 1024 }).single('image'),
    imageResizer(110),
    usersController.updateProfile
  );

export default usersRouter;
