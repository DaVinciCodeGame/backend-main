import { RequestHandler } from 'express';
import RoomsService from '../services/rooms.service';
import schema from '../validation/rooms.validation';

export default class RoomsController {
  roomsService: RoomsService;

  constructor() {
    this.roomsService = new RoomsService();
  }
}
