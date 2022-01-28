const CustomError = require('../errors')
const { isTokenValid } = require('../utils/jwt')

const authenticateUser = async (req, res, next) => {
  let token
  // check header
  const authHeader = req.headers.authorization

  if (authHeader && authHeader.startsWith('Bearer')) {
    token = authHeader.split(' ')[1]
  }

  if (!token) {
    throw new CustomError.UnauthenticatedError('Authentication invalid')
  }
  try {
    const payload = isTokenValid(token)
    // Attach the user and his permissions to the req object
    req.user = {
      nickname: payload.name,
      id: payload.playerId,
      status: payload.status,
      ranking: payload.ranking,
    }

    next()
  } catch (error) {
    throw new CustomError.UnauthenticatedError('Authentication invalid')
  }
}

module.exports = authenticateUser
