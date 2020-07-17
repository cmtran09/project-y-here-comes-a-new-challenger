const Post = require('../../models/Post')
const checkAuth = require('../../utils/checkAuth')
const { AuthenticationError, UserInputError } = require('apollo-server')

module.exports = {
  Query: {
    getPosts: async () => {
      try {
        const posts = await Post.find().sort({ createdAt: -1 })
        return posts
      } catch (err) {
        throw new Error(err)
      }
    },
    async getPost(_, { postId }) {
      try {
        const post = await Post.findById(postId)
        if (post) {
          return post
        } else {
          throw new Error('Post not found')
        }
      } catch (err) {
        throw new Error(err)
      }
    },
  },
  Mutation: {
    async createPost(_, { body }, context) {
      const user = checkAuth(context)
      // passes authorisation
      const newPost = new Post({
        body,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString()
      })
      const post = await newPost.save()
      // PUBSUB EVENT WEBSOCKET notifaction that new post made
      context.pubSub.publish('NEW_POST', {
        newPost: post
      })
      return post
    },
    async deletePost(_, { postId }, context) {
      const user = checkAuth(context)
      try {
        const post = await Post.findById(postId)
        if (user.username === post.username) {
          await post.delete()
          return 'Post successfully deleted'
        } else {
          throw new AuthenticationError('You are not authorised to delete this post')
        }
      } catch (err) {
        // console.log(user.username, 'user')
        // console.log(post.username, 'post')
        throw new Error(err)
      }
    },
    async likePost(_, { postId }, context) {
      const user = checkAuth(context)
      const post = await Post.findById(postId)
      if (post) {
        //check if user likes contains user's username (have you already liked?)
        if (post.likes.find(elem => elem.username === user.username)) {
          //already liked, remove like.  (filter and remove instance of current user)
          post.likes = post.likes.filter(elem => elem.username !== user.username)
        } else {
          // user has not liked, so set like
          post.likes.push({
            username: user.username,
            createdAt: new Date().toISOString()
          })
        }
        await post.save()
        return post
      } else throw new UserInputError('Post not found')
    }
  },
  Subscription: {
    newPost: {
      subscribe(_, __, { pubSub }) { return pubSub.asyncIterator('NEW_POST') } // convention for events to be all CAPs
    }
  }
}
