const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const PlayerSchema = new mongoose.Schema({
  nickname: {
    type: String,
    required: [true, 'Please provide your nickname'],
  },
  name: {
    type: String,
    required: [true, 'Please provide your name'],
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: [8, 'Password should be at least 8 characters'],
  },
  avatar: {
    type: String,
    enum: ['adwfasdfasd', 'asdfcasdfc'],
    default: 'adwfasdfasd',
  },
  status: {
    type: String,
    enum: ['oro', 'plata', 'bronce'],
    default: 'bronce',
  },
  ranking: {
    type: Number,
  },
})

PlayerSchema.pre('save', async function () {
  if (!this.isModified('password')) return
  const hashedPassword = await bcrypt.hash(this.password, 10)
  this.password = hashedPassword
})

PlayerSchema.methods.comparePassword = async function (providedPassword) {
  const isMatch = await bcrypt.compare(providedPassword, this.password)
  return isMatch
}

module.exports = mongoose.model('Player', PlayerSchema)
