const db = require('dotenv').config();

module.exports = {
  development: {
    //url:'postgres://username:password@localhost:5432/eddy',
    username: 'postgres',
    password: 'richard031',
    database: 'eddy',
    host: 'localhost',
    dialect: 'postgres'
  },
  test: {
    //url: process.env.DB_DATABASE_URL,
    username: 'postgres',
    password: 'richard031',
    database: 'eddy',
    host: 'localhost',
    dialect: 'postgres'
  },
  production: {
    //url: process.env.DB_DATABASE_URL,
    username: 'postgres',
    password: 'richard031',
    database: 'eddy',
    host: 'localhost',
    dialect: 'postgres'
  }
}
