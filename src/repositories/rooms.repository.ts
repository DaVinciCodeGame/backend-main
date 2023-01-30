import { Room } from '../entity/Room';
import Repository from '../libs/base-repository';

export default class RoomsRepository extends Repository<Room> {
  constructor() {
    super(Room);
  }
}
