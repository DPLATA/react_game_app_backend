require('dotenv').config()

const connectDB = require('../db/connect')
const Player = require('../models/Player')

const jsonPlayers = require('../data/players.json').slice(0, 230)

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    await Player.deleteMany()
    await Player.create(jsonPlayers)
    console.log('Success!!!!')
    process.exit(0)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

//start()
