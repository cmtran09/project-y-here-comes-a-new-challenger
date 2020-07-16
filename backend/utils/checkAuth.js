const { AuthenticationError } = require('apollo-server')

const jwt = require('jsonwebtoken')
const { SECRET_KEY } = require('../../config')

module.exports = (context) => {
  //context = {...headers}
  const authHeader = context.req.headers.authorization
  if (authHeader) {
    // convention that bearer token send in 'Bearer [token]' format
    //splits to two length array
    const token = authHeader.split('Bearer ')[1]
    if (token) {
      try {
        const user = jwt.verify(token, SECRET_KEY);
        return user
      } catch (err) {
        throw new AuthenticationError('Invalid/Expired token')
      }
    } 
    throw new Error('Authorization token must be in \'Bearer [token]\' format')
  }
  throw new Error('Authorization header must be provided')
} 