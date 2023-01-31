import bcrypt from 'bcrypt';
import env from '../config/env';
import { Room } from '../entity/Room';
import RoomsRepository from '../repositories/rooms.repository';

const LIMIT_PER_PAGE = 12;

export default class RoomsService {
  roomsRepository: RoomsRepository;

  constructor() {
    this.roomsRepository = new RoomsRepository();
  }

  async createRoom(roomName: string, maxMembers: number, password?: string) {
    const roomId = await this.getUnoccupiedRoomId();

    let newRoom: Room;

    if (password) {
      const hashedPassword = await bcrypt.hash(
        password,
        env.ROOM_PASSWORD_SALT
      );
      newRoom = await this.roomsRepository.create(
        roomId,
        roomName,
        maxMembers,
        hashedPassword
      );
    } else {
      newRoom = await this.roomsRepository.create(roomId, roomName, maxMembers);
    }

    return newRoom.roomId;
  }

  private async getUnoccupiedRoomId() {
    const randomGeneratedNumber = Math.floor(Math.random() * 100000 + 1);

    const existRoom = await this.roomsRepository.findOneByRoomId(
      randomGeneratedNumber
    );

    if (existRoom) {
      const retried: number = await this.getUnoccupiedRoomId();
      return retried;
    }
    return randomGeneratedNumber;
  }

  async getPagedList(
    page: number,
    searchType: 'number' | 'name' | undefined,
    search: string | undefined
  ) {
    let list: [number, Room[]];

    if (searchType && search) {
      if (searchType === 'number') {
        const roomId = Number(search);

        list = await this.roomsRepository.getPagedListFilteredById(
          page,
          LIMIT_PER_PAGE,
          roomId
        );
      } else {
        list = await this.roomsRepository.getPagedListFilteredByName(
          page,
          LIMIT_PER_PAGE,
          search
        );
      }
    } else {
      list = await this.roomsRepository.getPagedList(page, LIMIT_PER_PAGE);
    }

    const [totalCount, rooms] = list;

    const totalPage = Math.ceil(totalCount / LIMIT_PER_PAGE);

    return { totalPage, rooms };
  }
}
