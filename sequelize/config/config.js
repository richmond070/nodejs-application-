module.exports = {
  development: {
    url: process.env.DB_DATABASE_URL,
    dialect: 'postgres'
  },
  test: {
    url: process.env.DB_DATABASE_URL,
    dialect: 'postgres'
  },
  production: {
    url: process.env.DB_DATABASE_URL,
    dialect: 'postgres'
  }
}
