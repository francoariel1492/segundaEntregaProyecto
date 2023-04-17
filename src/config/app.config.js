const dotenv = require('dotenv')


const config = {
  port: process.env.PORT || 3000,
  persistence: process.env.PERSISTENCE || 'memory'
}

module.exports = config