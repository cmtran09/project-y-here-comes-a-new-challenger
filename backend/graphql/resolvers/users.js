const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { UserInputError } = require('apollo-server')
const { validateRegisterInput, validateLoginInput } = require('../../utils/validators')

const { SECRET_KEY } = require('../../../config')
const User = require('../../models/Users')

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username
    },
    SECRET_KEY,
    { expiresIn: '1h' }
  )
}

module.exports = {
  Mutation: {
    async login(_, { username, password }, context, info) {
      const { valid, errors } = validateLoginInput(username, password)
      // check login validators
      if (!valid) {
        throw new UserInputError('Errors', { errors })
      }
      const user = await User.findOne({ username })
      if (!user) {
        errors.loginUser = 'Username not found'
        throw new UserInputError('Username not found', { errors })
      }
      // now compare with hashed password on database
      const match = await bcrypt.compare(password, user.password)
      if (!match) {
        errors.general = "Password does not match"
        throw new UserInputError('Password does not match', { errors })
      }
      // user successfuly validated, provide token
      const token = generateToken(user)

      return {
        ...user._doc,
        id: user._id,
        token
      }
    },
    async register(_, { registerInput: { username, email, password, confirmPassword } }, context, info) {
      //  Validate user data
      const { valid, errors } = validateRegisterInput(username, email, password, confirmPassword)
      if (!valid) {
        throw new UserInputError('Errors', { errors })
      }
      //  make sure user doesnt already exist
      const user = await User.findOne({ username })
      // if user exist 
      if (user) {
        throw new UserInputError('Username is taken', {
          // error payload for client 
          errors: {
            username: 'This username is already taken'
          }
        })
      }
      // Hash user password before we save and create auth token
      password = await bcrypt.hash(password, 12)
      const newUser = new User({
        email,
        username,
        password,
        createdAt: new Date().toISOString()
      })
      const res = await newUser.save()
      const token = generateToken(res)

      return {
        ...res._doc,
        id: res._id,
        token
      }
    }
  }
}