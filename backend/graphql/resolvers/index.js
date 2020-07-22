const usersResolvers = require('./users')
const postsResolvers = require('./posts')
const commentsResolvers = require('./comments')

module.exports = {
  Post: {
    likeCount: (parent) => {
      return parent.likes.length
    },
    commentCount: (parent) => parent.comments.length,
    challengersCount: (parent) => parent.challengers.length,
  },
  Query: {
    ...postsResolvers.Query
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...postsResolvers.Mutation,
    ...commentsResolvers.Mutation
  },
  Subscription: {
    ...postsResolvers.Subscription
  }
}