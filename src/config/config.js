require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DUSERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    host: process.env.HOST,
    port: process.env.PORT,
    dialect: process.env.DIALECT,
    secreat: process.env.SEC,
    mailUser: process.env.mailUser,
    mailPass: process.env.mailPass

  },
  test: {
    username: process.env.DUSERNAME_TEST,
    password: process.env.PASSWORD_TEST,
    database: process.env.DATABASE_TEST,
    host: process.env.HOST_TEST,
    port: process.env.PORT_TEST,
    dialect: process.env.DIALECT_TEST,
    secreat: process.env.SEC,
    mailUser: process.env.mailUser,
    mailPass: process.env.mailPass
  },
  production: {
    username: process.env.DUSERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    host: process.env.HOST,
    port: process.env.PORT,
    dialect: process.env.DIALECT,
    secreat: process.env.SEC,
    mailUser: process.env.mailUser,
    mailPass: process.env.mailPass
  }
};
