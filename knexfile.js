// Update with your config settings.
import "dotenv/config"
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
export default {

  development: {
    client: 'mysql2',
    connection: {
      host: process.env.DATABASE_HOST || "127.0.0.1",
      port: Number(process.env.DATABASE_PORT),
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME
    },
    migrations:{
      directory : "./db/migrations"
    },
    seeds : {
      directory : "./db/seeds"
    }
  }
};
