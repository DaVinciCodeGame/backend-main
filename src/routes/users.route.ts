import { Router } from 'express';
import UsersController from '../controllers/users.controller';
import authorize from '../middlewares/authorize';
import { single } from '../middlewares/multipart-parser';
import verifyApiKey from '../middlewares/verify-api-key';

const usersRouter = Router();

const usersController = new UsersController();

usersRouter
  .get('/me', authorize, usersController.readMyInfo)
  .get('/:userId', verifyApiKey, usersController.read)
  .get('/', usersController.readMany)
  .put(
    '/me',
    authorize,
    single({ field: 'image', fileSize: 500 * 1024 }),
    usersController.update
  );

export default usersRouter;
