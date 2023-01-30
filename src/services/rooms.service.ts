import RoomsRepository from '../repositories/rooms.repository';

export default class RoomsService {
  roomsRepository: RoomsRepository;

  constructor() {
    this.roomsRepository = new RoomsRepository();
  }
}
