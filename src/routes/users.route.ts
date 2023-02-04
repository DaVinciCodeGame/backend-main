import { Router } from 'express';
import UsersController from '../controllers/users.controller';
import { single } from '../middlewares/multipart-parser';

const usersRouter = Router();

const usersController = new UsersController();

usersRouter
  .get('/me', authorize, usersController.readMyInfo)
  .get('/', usersController.readMany)
  .put(
    '/me',
    single({ field: 'image', fileSize: 500 * 1024 }),
    usersController.update
  );

export default usersRouter;
