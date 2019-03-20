const localPgConnection = {
    host: 'localhost',
    database: 'app',
    user: 'admin',
    password: 'password'
  }
  const prodDbConnection = process.env.DATABASE_URL || localPgConnection;


module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/intercomAppDevelopmentDB.sqlite3'
    },
    useNullAsDefault: true,
    migrations: { 
      directory: './data/migrations'
    },
    seeds: { 
      directory: './data/seeds'
    }
  },

  testing: {
    client: 'sqlite3',
    connection: {
      filename: './data/intercomAppTestDB.sqlite3',
    },
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds',
    },
  },

  production: {
    client: 'pg',
    connection: prodDbConnection,
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds',
    },
  }

};