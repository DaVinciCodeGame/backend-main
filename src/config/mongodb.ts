import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from '../entity/User';
import env from './env';

const dataSource = new DataSource({
  type: 'mongodb',
  url: env.MONGO_URL,
  synchronize: true,
  logging: false,
  entities: [User],
  useUnifiedTopology: true,
});

export default dataSource;
