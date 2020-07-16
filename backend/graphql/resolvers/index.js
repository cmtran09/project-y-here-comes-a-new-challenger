const userResolvers = require('./user')
const postResolvers = require('./post')

module.exports = {
  Query: {
    ...postResolvers.Query
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...postResolvers.Mutation
  }
}