const Post = require('../../models/Post')
const checkAuth = require('../../utils/checkAuth')
const { AuthenticationError, UserInputError } = require('apollo-server')

module.exports = {
  Mutation: {
    async createComment(_, { postId, body }, context) {
      const user = checkAuth(context)
      if (body.trim() === '') {
        throw new UserInputError('Empty comment', {
          errors: {
            body: 'Comment must not be empty'
          }
        })
      }
      const post = await Post.findById(postId)
      if (post) {
        post.comments.unshift({
          body,
          username: user.username,
          createdAt: new Date().toISOString()
        })
        await post.save()
        return post
      } else throw new UserInputError('Post not found')
    },
    async deleteComment(_, { postId, commentId }, context) {
      const user = checkAuth(context)
      const post = await Post.findById(postId)
      if (post) {
        const commentIndex = post.comments.findIndex(elem => elem.id === commentId)
        //check if user trying to delete created the comment
        if (post.comments[commentIndex].username === user.username) {
          //remove the comment if user made that comment
          post.comments.splice(commentIndex, 1)
          await post.save()
          return post
        } else {
          // not owner of comment
          throw new AuthenticationError('You can not delete someone elses comment')
        }
      }
    }
    // async likeComment(_, { postId, commentId }) {
    //   const post = await Post.findById(postId)
    //   post.likes
    // }
  }
}