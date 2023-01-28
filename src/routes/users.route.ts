import { Router } from 'express';
import UsersController from '../controllers/users.controller';
import authorize from '../middlewares/authorize';
import { single } from '../middlewares/multipart-parser';

const usersRouter = Router();

const usersController = new UsersController();

usersRouter
  .get('/me', authorize, usersController.getMyInfo)
  .get('/', usersController.getLeaderboard)
  .put(
    '/me',
    authorize,
    single({ field: 'image', fileSize: 500 * 1024 }),
    usersController.updateProfile
  )
  .delete('/me', authorize, usersController.unregister);

export default usersRouter;
