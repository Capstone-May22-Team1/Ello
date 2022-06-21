const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  text: {
    type: String,
    required: [true, 'The Comment text is required']
  },
  cardId: {
    type: Schema.Types.ObjectId,
    ref: 'Board',
    required: [true, 'The CardId is required']
  },
  createdAt: {
    type: Schema.Types.Date,
    default: Date.now,
  },
  updatedAt: {
    type: Schema.Types.Date,
    default: Date.now,
  },
})

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;