import 'reflect-metadata';
import { DataSource } from 'typeorm';

const dataSource = new DataSource({
  type: 'mysql',
  host: process.env.RDS_HOST,
  port: Number(process.env.RDS_PORT),
  username: process.env.RDS_USERNAME,
  password: process.env.RDS_PASSWORD,
  database: process.env.RDS_DATABASE,
  synchronize: true,
  logging: false,
  entities: [],
  migrations: [],
  subscribers: [],
});

export default dataSource;
