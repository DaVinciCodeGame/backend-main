import { ILike } from 'typeorm';
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

  async getPagedList(page: number, limit: number) {
    const offset = (page - 1) * limit;

    return Promise.all([
      this.repository.count({
        order: { createdAt: 'DESC' },
      }),
      this.repository.find({
        order: { createdAt: 'DESC' },
        skip: offset,
        take: limit,
      }),
    ]);
  }

  getPagedListFilteredByName(page: number, limit: number, name: string) {
    const offset = (page - 1) * limit;

    return Promise.all([
      this.repository.count({
        where: { roomName: ILike(`%${name}%`) },
        order: { createdAt: 'DESC' },
      }),
      this.repository.find({
        where: { roomName: ILike(`%${name}%`) },
        order: { createdAt: 'DESC' },
        skip: offset,
        take: limit,
      }),
    ]);
  }

  async getPagedListFilteredById(page: number, limit: number, id: number) {
    const offset = (page - 1) * limit;

    return Promise.all([
      this.repository.count({
        where: { roomId: id },
        order: { createdAt: 'DESC' },
      }),
      this.repository.find({
        where: { roomId: id },
        order: { createdAt: 'DESC' },
        skip: offset,
        take: limit,
      }),
    ]);
  }
}
