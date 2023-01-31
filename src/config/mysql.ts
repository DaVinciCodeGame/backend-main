import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Room } from '../entity/Room';
import { User } from '../entity/User';
import env from './env';

const mysqlDataSource = new DataSource({
  type: 'mysql',
  url: env.MYSQL_URL,
  synchronize: env.NODE_ENV === 'development',
  entities: [User, Room],
  connectTimeout: 10000,
});

export default mysqlDataSource;
