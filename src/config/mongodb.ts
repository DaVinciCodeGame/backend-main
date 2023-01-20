import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from '../entity/User';
import env from './env';

const dataSource = new DataSource({
  type: 'mongodb',
  host: env.MONGO_HOST,
  port: Number(env.MONGO_PORT),
  database: env.MONGO_DATABASE,
  synchronize: true,
  logging: false,
  entities: [User],
  migrations: [],
  subscribers: [],
});

export default dataSource;
