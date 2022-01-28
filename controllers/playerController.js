const Player = require('../models/Player')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')
const createTokenUser = require('../utils/createTokenUser')
const { createJWT } = require('../utils/jwt')
const { isValidObjectId } = require('../utils/checkForValidId')

const getTopPlayers = async (req, res) => {
  const players = await Player.find({})
    .sort({ ranking: 1 })
    .select('-password')
    .limit(10)
  res.status(StatusCodes.OK).json({ players })
}

const getPlayers = async (req, res) => {
  let { page } = req.query
  if (!page) {
    page = 1
  }
  page = page - 1

  const totalCount = await Player.estimatedDocumentCount()
  const players = await Player.find({})
    .select('-password')
    .sort({ ranking: 1 })
    .skip(page * 100)
    .limit(100)
  res.status(StatusCodes.OK).json({ players, totalCount })
}

const getSinglePlayer = async (req, res) => {
  const { id } = req.params
  const player = await Player.find({ _id: id }).select('-password')
  if (!player) {
    throw new CustomError.NotFoundError('No player found with given id')
  }
  res.status(StatusCodes.OK).json({ player })
}

const updatePlayer = async (req, res) => {
  const { id } = req.params
  const { nickname, name, avatar } = req.body

  if (!nickname || !name) {
    throw new CustomError.BadRequestError('Please provide nickname and name')
  }

  const player = await Player.findOne({ _id: id })
  if (!player) {
    throw new CustomError.NotFoundError('Player not found')
  }
  if (!req.user.id == player._id) {
    throw new CustomError.UnauthorizedError('You cannot update this user')
  }
  player.name = name
  player.nickname = nickname
  player.avatar = avatar
  await player.save()
  const tokenUser = createTokenUser(player)
  const token = createJWT({ payload: tokenUser })
  res.status(StatusCodes.CREATED).json({ user: tokenUser, token })
}

const searchPlayers = async (req, res) => {
  const { status, value } = req.query

  let { page } = req.query

  if (!page) {
    page = 1
  }
  page = page - 1

  if (isValidObjectId(value)) {
    console.log('search por id')
    const idPlayer = await Player.findOne({ _id: value })
    if (!idPlayer) {
      throw new CustomError.NotFoundError(`No player mached for value ${value}`)
    }
    return res
      .status(StatusCodes.OK)
      .json({ players: [idPlayer], totalCount: 1 })
  }

  let queryObject = {}
  if (status) {
    queryObject.status = status
  }
  if (value) {
    queryObject.nickname = { $regex: value, $options: 'i' }
  }
  console.log(queryObject)
  const countSearchedPlayers = await Player.countDocuments(queryObject)
  const searchedPlayers = await Player.find(queryObject)
    .select('-password')
    .sort({ ranking: 1 })
    .limit(100)
    .skip(page * 100)

  res
    .status(StatusCodes.OK)
    .json({ players: searchedPlayers, totalCount: countSearchedPlayers })
}

module.exports = {
  getTopPlayers,
  getPlayers,
  getSinglePlayer,
  updatePlayer,
  searchPlayers,
}
