import dotenv from 'dotenv';

dotenv.config();

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

const config = {
  client: 'postgresql',
  connection: {
    database: 'postgres',
    user: 'postgres',
    password: 'Secret321@',
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
