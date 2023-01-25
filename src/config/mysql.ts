import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from '../entity/User';
import env from './env';

const mysqlDataSource = new DataSource({
  type: 'mysql',
  url: env.MYSQL_URL,
  synchronize: env.NODE_ENV === 'development',
  entities: [User],
});

export default mysqlDataSource;
