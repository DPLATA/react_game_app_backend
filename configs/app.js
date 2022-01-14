const dotenv = require('dotenv')
dotenv.config()

const appConfig = {
  express_port: process.env.EXPRESS_PORT || 5001
}

module.exports = appConfig