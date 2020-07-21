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
          createdAt: new Date().toISOString(),
          editedAt: new Date().toISOString()
        })
        await post.save()
        return post
      } else throw new UserInputError('Post not found')
    },
    async editComment(_, { postId, commentId, body }, context) {
      let updatedComment = {}
      updatedComment.body = body
      updatedComment.editedAt = new Date().toISOString()
      const user = checkAuth(context)
      if (body.trim() === '') {
        throw new UserInputError('Empty comment', {
          errors: {
            body: 'Comment must not be empty'
          }
        })
      }
      try {
        const post = await Post.findById(postId)
        if (post) {
          const commentIndex = post.comments.findIndex(elem => elem.id === commentId)
          if (post.comments[commentIndex].username === user.username) {
            post.comments[commentIndex].body = updatedComment.body
            post.comments[commentIndex].editedAt = updatedComment.editedAt
            post.save()
            return post
          } else {
            // not owner of comment
          throw new AuthenticationError('You can not edit someone else\'s comment')
          }
        }
      } catch (err) {
        throw new Error(err)
      }
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
          throw new AuthenticationError('You can not delete someone else\'s comment')
        }
      }
    }
  }
}