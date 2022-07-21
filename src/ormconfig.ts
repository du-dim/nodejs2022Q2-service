import { DataSourceOptions } from 'typeorm';
import { UserEntity } from './users/users.entity';

export default {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'user',
  password: 'postgres123',
  database: 'rest-db',
  entities: [UserEntity],
  synchronize: true,
  migrations: [],
  migrationsRun: true,
} as DataSourceOptions;
