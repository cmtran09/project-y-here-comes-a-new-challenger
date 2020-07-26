const { gql } = require('apollo-server')

module.exports = gql`
  type Comment{
    id: ID!
    createdAt: String!
    editedAt: String!
    username: String!
    body: String!
  }
  type Outcome {
    isComplete: Boolean 
    finalScore: String,
    winner: String
  }
  type Like{
    id: ID!
    createdAt: String!
    username: String!
  }
  type Challenger{
    id: ID!
    enteredAt: String!
    username: String!
    isChallenger: Boolean!
  }
  type Post{
    id: ID!
    body: String!
    sport: String!
    createdAt: String!
    editedAt: String!
    username: String!
    comments: [Comment]!
    likes: [Like]!
    long: Float
    lat: Float
    isAccepted: Boolean
    challengers: [Challenger]
    outcome: Outcome
    likeCount: Int!
    commentCount: Int!
    challengersCount: Int!
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
    getPostsBySport(sport:String!): [Post]
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
    login(username: String!, password: String!): User!
    createPost(body: String!, long: Float, lat: Float, sport: String!): Post!
    editPost(postId: ID!, body: String!): Post!
    deletePost(postId: ID!): String! 
    createComment(postId: ID!, body: String!): Post!
    editComment(postId: ID!, commentId: ID!, body: String!): Post!
    deleteComment(postId: ID!, commentId: ID!): Post!
    likePost(postId: ID!): Post!
    addNewChallenger(postId: ID!): Post!
    acceptChallenger(postId: ID!, challengerId: ID!): Post!
  }
  type Subscription {
    newPost: Post!
    newChallenger(postId: ID!): Post
  }
`
