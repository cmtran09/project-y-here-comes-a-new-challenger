const { ApolloServer, PubSub } = require('apollo-server')
const gql = require('graphql-tag')
const mongoose = require('mongoose')

const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')

const Post = require('./models/Post')
const Users = require('./models/Users')

const { MONGODB } = require('../config.js')
const PORT = process.env.PORT || 5000

const pubSub = new PubSub()

const server = new ApolloServer({
  typeDefs,
  resolvers,
  // authentication middleware from apollo server
  // request and responce from express, forward body to context
  context: ({ req }) => ({ req, pubSub })
})

const path = require('path')
const dist = path.join(__dirname, '../dist')

// for deployment
// app.use('/', express.static(dist))

// for deployment
// app.get('*', function(req, res) {
//   res.sendFile(path.join(dist, 'index.html'))
// });

// mongoose
//   .connect(MONGODB, { useNewUrlParser: true })
//   .then(() => {
//     return server.listen(PORT, () => console.log(`Server up and running on port ${PORT}`))
//   })

mongoose
  .connect(MONGODB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('MongoDB Connected')
    return server.listen({ port: PORT })
  })
  .then((res) => console.log(`Server up and running on port ${res.url}`))
  .catch(err => {
    console.log(`DB Connection Error: ${err.message}`);
  });
