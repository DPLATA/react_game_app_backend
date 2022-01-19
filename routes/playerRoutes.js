const express = require('express')
const router = express.Router()
const {
  getTopPlayers,
  getPlayers,
  getSinglePlayer,
  updatePlayer,
  searchPlayers,
} = require('../controllers/playerController')
const authenticateUser = require('../middleware/authentication')

router.get('/', getPlayers)
router.get('/top-players', getTopPlayers)
router.get('/search', searchPlayers)
router.route('/:id').get(getSinglePlayer).patch(authenticateUser, updatePlayer)

module.exports = router
