import 'reflect-metadata';
import { DataSource } from 'typeorm';
import env from './env';

const dataSource = new DataSource({
  type: 'mysql',
  host: env.RDS_HOST,
  port: Number(env.RDS_PORT),
  username: env.RDS_USERNAME,
  password: env.RDS_PASSWORD,
  database: env.RDS_DATABASE,
  synchronize: true,
  logging: false,
  entities: [],
  migrations: [],
  subscribers: [],
});

export default dataSource;
