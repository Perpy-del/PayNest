import dotenv from 'dotenv';
import env from '../env.js';

dotenv.config();

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
const config: any = {
  client: env.database_client as string,
  connection: {
    database: env.database_name as string,
    user: env.database_user as string,
    password: env.database_pass as string,
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: 'knex_migrations',
  },
};

export default config;
