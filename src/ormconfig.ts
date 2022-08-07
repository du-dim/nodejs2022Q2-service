import { DataSourceOptions } from 'typeorm';
import 'dotenv/config';

export default {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: +process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: false,
  entities: ['dist/**/*.entity.*js'],
  migrations: ['dist/migrations/*.js'],
} as DataSourceOptions;
