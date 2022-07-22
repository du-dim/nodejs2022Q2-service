import { DataSource } from 'typeorm';
import 'dotenv/config';

const datasource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: +process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: true,
  entities: ['dist/**/*.entity.*js'],
  migrations: ['dist/migration/*.js'],
  migrationsRun: true,
});

datasource.initialize();

export default datasource;
