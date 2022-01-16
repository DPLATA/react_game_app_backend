const Player = require('../models/Player')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')
const createTokenUser = require('../utils/createTokenUser')
const { createJWT } = require('../utils/jwt')

const register = async (req, res) => {
  const { nickname, name, password } = req.body
  if (!nickname || !name || !password) {
    throw new CustomError.BadRequestError('Please provide nickname, name')
  }
  const nicknameExists = await Player.findOne({ nickname })

  if (nicknameExists) {
    throw new CustomError.BadRequestError('Nickname already exists')
  }
  const rankingCount = await Player.estimatedDocumentCount()
  const ranking = rankingCount + 1
  console.log(ranking)
  const player = await Player.create({ nickname, name, password, ranking })

  const tokenUser = createTokenUser(player)
  const token = createJWT({ payload: tokenUser })
  res.status(StatusCodes.CREATED).json({ user: tokenUser, token })
}

const login = async (req, res) => {
  const { nickname, password } = req.body
  if (!nickname || !password) {
    throw new CustomError.BadRequestError(
      'please provide nickname and password'
    )
  }
  const player = await Player.findOne({ nickname })
  const passwordMatch = await player.comparePassword(password)
  if (!passwordMatch) {
    throw new CustomError.UnauthenticatedError('Invalid credentials')
  }
  console.log(passwordMatch)
  const tokenUser = createTokenUser(player)
  const token = createJWT({ payload: tokenUser })
  res.status(StatusCodes.OK).json({ user: tokenUser, token })
}

module.exports = { register, login }
