module.exports = {
  dbConfig: {
    mysql: {
      host: 'localhost',
      dialect: 'mysql',
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
      /**
       * DB Timezone setting
       */
      // timezone: '+09:00',
      logging: false,
      production: {
        username: 'dbid',
        password: 'dbpass',
        database: 'production',
      },
      development: {
        username: 'dbid',
        password: 'dbpass',
        database: 'development',
      },
      test: {
        username: 'dbid',
        password: 'dbpass',
        database: 'test',
      },
    },
    mongo: {
      // TODO: Set Mongodb path to collect db URL.
      production: 'mongodb://localhost',
      development: 'mongodb://localhost',
      test: 'mongodb://localhost',
    },
  },
};
