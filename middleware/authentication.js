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
    console.log('enter here')
    const payload = isTokenValid(token)

    // Attach the user and his permissions to the req object
    req.user = {
      user: 'payload',
    }

    next()
  } catch (error) {
    throw new CustomError.UnauthenticatedError('Authentication invalid')
  }
}

module.exports = authenticateUser
