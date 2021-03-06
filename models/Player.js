const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const PlayerSchema = new mongoose.Schema(
  {
    nickname: {
      type: String,
      required: [true, 'Please provide your nickname'],
      unique: [true, 'Nickname already exists'],
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
      default: 'https://robohash.org/eteosqui.png?size=300x300&set=set1',
    },
    status: {
      type: String,
      enum: ['oro', 'plata', 'bronce'],
      default: 'bronce',
    },
    ranking: {
      type: Number,
    },
  },
  { timestamps: true }
)

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
