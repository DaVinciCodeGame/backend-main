import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from '../entity/User';
import { UserView } from '../entity/UserView';
import env from './env';

const mysqlDataSource = new DataSource({
  type: 'mysql',
  url: env.MYSQL_URL,
  synchronize: env.NODE_ENV === 'development',
  entities: [User, UserView],
  connectTimeout: 10000,
});

export default mysqlDataSource;
