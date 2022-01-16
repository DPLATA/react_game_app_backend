require('express-async-errors')

const express = require('express')
const appConfig = require('./configs/app')
const server = express()
//db
const connectDB = require('./db/connect')

//packages
const morgan = require('morgan')
const cors = require('cors')

//middleware
const notFoundMiddleWare = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')
const authMiddleware = require('./middleware/authentication')
const { StatusCodes } = require('http-status-codes')
//routers
const authRouter = require('./routes/authRoutes')
const playerRouter = require('./routes/playerRoutes')

server.use(morgan('tiny'))
server.use(express.json())
server.use(cors())

server.get('/', (req, res) => {
  res.status(StatusCodes.OK).json({ message: 'hello world' })
})

server.use('/api/auth', authRouter)
server.use('/api/players', authMiddleware, playerRouter)

server.use(notFoundMiddleWare)
server.use(errorHandlerMiddleware)

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    server.listen(appConfig.express_port, () => {
      console.log(`App is listening on port ${appConfig.express_port}`)
    })
  } catch (error) {
    console.log(error)
  }
}

start()

module.exports = server
