const express = require('express')
const router = express.Router()
const {
  getTopPlayers,
  getPlayers,
  getSinglePlayer,
  updatePlayer,
} = require('../controllers/playerController')
const authenticateUser = require('../middleware/authentication')

router.get('/', getPlayers)
router.get('/top-players', getTopPlayers)
router.route('/:id').get(getSinglePlayer).patch(authenticateUser, updatePlayer)

module.exports = router
