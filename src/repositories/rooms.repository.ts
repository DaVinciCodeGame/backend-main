import { Room } from '../entity/Room';
import Repository from '../libs/base-repository';

export default class RoomsRepository extends Repository<Room> {
  constructor() {
    super(Room);
  }

  create(
    roomId: number,
    roomName: string,
    maxMembers: number,
    password?: string
  ) {
    const room = new Room();

    room.roomId = roomId;
    room.roomName = roomName;
    room.maxMembers = maxMembers;
    if (password) room.password = password;

    return this.repository.save(room);
  }

  findOneByRoomId(roomId: number) {
    return this.repository.findOne({ where: { roomId } });
  }
}
