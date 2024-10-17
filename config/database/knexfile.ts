import dotenv from 'dotenv'

dotenv.config({ path: '../../.env' })

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

console.log(process.env.DB_CONNECTION_STRING)

const config: any = {
  client: process.env.DB_CLIENT,
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    ssl: {
      require: true, // Ensure SSL is required
      rejectUnauthorized: false, // Set this to true in production if you have a valid certificate
    },
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: 'knex_migrations',
  },
}

export default config
