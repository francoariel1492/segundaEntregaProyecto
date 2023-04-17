const dotenv = require('dotenv')

dotenv.config({
    path: `./.env.${process.env.NODE_ENV}`
  })

module.exports = {
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASS,
    dbHost: process.env.DB_HOST,
    dbName: process.env.DB_NAME
}