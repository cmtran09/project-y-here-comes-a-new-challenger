const { model, Schema } = require('mongoose')

const postSchema = new Schema({
  body: String,
  username: String,
  sport: String,
  long: Number,
  lat: Number,
  isAccepted: Boolean, 
  outcome: {
    isComplete: Boolean, 
    finalScore: String, 
    winner: String
  },
  challengers: [
    {
      username: String,
      enteredAt: String,
      isChallenger: Boolean
    }
  ],
  createdAt: String,
  editedAt: String,
  comments: [
    {
      body: String,
      username: String,
      createdAt: String,
      editedAt: String,
    }
  ],
  likes: [
    {
      username: String,
      createdAt: String
    }
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  }
})

module.exports = model('Post', postSchema)