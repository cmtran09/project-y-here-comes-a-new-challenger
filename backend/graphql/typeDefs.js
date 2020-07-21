const { gql } = require('apollo-server')

module.exports = gql`
  type Comment{
    id: ID!
    createdAt: String!
    username: String!
    body: String!
  }
  type Like{
    id: ID!
    createdAt: String!
    username: String!
  }
  type Post{
    id: ID!
    body: String!
    createdAt: String!
    username: String!
    comments: [Comment]!
    likes: [Like]!
  }
  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
  }
  type Query {
    getPosts: [Post]
    getPost(postId:ID!): Post
  }
  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!,password:String!): User!
    createPost(body: String!): Post!
    editPost(postId: ID!, body: String!): Post!
    deletePost(postId: ID!): String! 
    createComment(postId: ID!, body: String!): Post!
    deleteComment(postId: ID!, commentId: ID!): Post!
    likePost(postId: ID!): Post!
  }
  type Subscription {
    newPost: Post!
  }
`