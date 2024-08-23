import dotenv from 'dotenv';

dotenv.config();

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
const config = {
  development: {
    client: process.env.DEV_DB_CLIENT || 'postgresql',
    connection: {
      database: "postgres",
      user: "postgres",
      password: 'Secret321@'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
  staging: {
    client: process.env.STAGING_DB_CLIENT,
    connection: {
      database: process.env.STAGING_DB_NAME,
      user: process.env.STAGING_DB_USER,
      password: process.env.STAGING_DB_PASS
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },
  production: {
    client: process.env.PROD_DB_CLIENT,
    connection: {
      database: process.env.PROD_DB_NAME,
      user: process.env.PROD_DB_USER,
      password: process.env.PROD_DB_PASS
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
}

export default config;
