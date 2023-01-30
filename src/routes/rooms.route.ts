import { Router } from 'express';
import RoomsController from '../controllers/rooms.controller';
import authorize from '../middlewares/authorize';

const roomsRouter = Router();

const rommsController = new RoomsController();

roomsRouter.post('/').get('/').post('/quickstart');

export default roomsRouter;
