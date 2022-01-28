const createTokenUser = (user) => {
  return {
    name: user.name,
    playerId: user._id,
    nickname: user.nickname,
    status: user.status,
    ranking: user.ranking,
    avatar: user.avatar,
  }
}

module.exports = createTokenUser
