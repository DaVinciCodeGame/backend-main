import { RequestHandler } from 'express';
import RoomsService from '../services/rooms.service';
import schema from '../validation/rooms.validation';

export default class RoomsController {
  roomsService: RoomsService;

  constructor() {
    this.roomsService = new RoomsService();
  }

  createRoom: RequestHandler = async (req, res, next) => {
    try {
      const { roomName, maxMembers, password } =
        await schema.createRoom.reqBody.validateAsync(req.body);

      const roomId = await this.roomsService.createRoom(
        roomName,
        maxMembers,
        password
      );

      await schema.createRoom.resBody.validateAsync({ roomId });

      res.status(201).json({ roomId });
    } catch (err) {
      next(err);
    }
  };
}
