import { Router } from 'express';
import RoomsController from '../controllers/rooms.controller';
import authorize from '../middlewares/authorize';

const roomsRouter = Router();

const roomsController = new RoomsController();

roomsRouter.post('/').get('/').post('/quickstart');

export default roomsRouter;
