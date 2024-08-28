import dotenv from 'dotenv';
import { config as envConfig } from '../envConfig.js';

dotenv.config();

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
const config: { [s: string]: import('knex').Knex.Config } = {
  development: {
    client: envConfig.database_client as string,
    connection: {
      database: envConfig.database_name as string,
      user: envConfig.database_user as string,
      password: envConfig.database_pass as string,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
  staging: {
    client: envConfig.database_client as string,
    connection: {
      database: envConfig.database_name as string,
      user: envConfig.database_user as string,
      password: envConfig.database_pass as string,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
  production: {
    client: envConfig.database_client as string,
    connection: {
      database: envConfig.database_name as string,
      user: envConfig.database_user as string,
      password: envConfig.database_pass as string,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
};

export default config;
