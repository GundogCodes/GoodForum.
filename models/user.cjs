const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const SALT_ROUNDS = 6

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    required: true
  },
  password: {
    type: String,
    trim: true,
    minlength: 3,
    required: true
  },
  posts:[{type:mongoose.Schema.Types.ObjectId, ref:'Post'}],
    friends:[{type:mongoose.Schema.Types.ObjectId, ref:'User'}],
    chats:[{type: mongoose.Schema.Types.ObjectId, ref:'privateMessage'}],
    interactions:{type:Array},
    foundedForums:{type:Array}
}, {
  timestamps: true,
  toJSON: {
    transform: function (doc, ret) {
      delete ret.password
      return ret
    }
  }
})

userSchema.pre('save', async function (next) {
  // 'this' is the use document
  if (!this.isModified('password')) return next()
  // update the password with the computed hash
  this.password = await bcrypt.hash(this.password, SALT_ROUNDS)
  return next()
})

const User = mongoose.model('User', userSchema)

module.exports = User
