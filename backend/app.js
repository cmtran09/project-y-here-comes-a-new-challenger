const { ApolloServer } = require('apollo-server')
const gql = require('graphql-tag')
const mongoose = require('mongoose')

const { MONGODB } = require('config.js')
const PORT = process.env.PORT || 5000

const typeDefs = gql`
  type Query {
    sayHi: String!
  }
`

const resolvers = {
  Query: {
    sayHi: () => 'Hello World!!!!!'
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

const path = require('path')
const dist = path.join(__dirname, '../dist')

const router = require('./config/router')



// for deployment
// app.use('/', express.static(dist))

// for deployment
// app.get('*', function(req, res) {
//   res.sendFile(path.join(dist, 'index.html'))
// });

mongoose.connect(MONGODB, { useNewUrlParser: true })
  .then(() => {
    return server.listen(PORT, () => console.log(`Server up and running on port ${PORT}`))
  })

