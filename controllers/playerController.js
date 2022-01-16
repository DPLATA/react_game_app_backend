const Player = require('../models/Player')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')

const getPlayers = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: 'player routes' })
}

module.exports = { getPlayers }
