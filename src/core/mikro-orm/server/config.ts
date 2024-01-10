import { Options } from '@mikro-orm/core';
import { TSMigrationGenerator } from '@mikro-orm/migrations';
import entities from './../shared/entities';

const config: Options = {
  entities,
  type: process.env.DB_TYPE as ("mongo" | "mysql" | "mariadb" | "postgresql" | "sqlite" | "better-sqlite"),
  timezone: process.env.DB_TIMEZONE,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  dbName: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,

  migrations: {
    path: './src/core/mikro-orm/server/migrations',
    glob: '!(*.d).{js,ts}',
    transactional: true,
    disableForeignKeys: true,
    allOrNothing: true,
    dropTables: true,
    safe: false, 
    snapshot: false,
    emit: 'ts',
    generator: TSMigrationGenerator
  },
}

export default config;