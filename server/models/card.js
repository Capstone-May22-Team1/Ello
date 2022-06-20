const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CardSchema = new Schema({
  title: {
    type: String,
    required: [true, 'The Card title is required']
  },
  description: {
    type: String
  },
  labels: [
    {
      type: String
    }
  ],
  listId: {
    type: Schema.Types.ObjectId,
    ref: 'List',
    required: [true, 'The ListId is required']
  },
  position: {
    type: Schema.Types.Decimal128
  },
  archived: {
    type: Boolean,
  },
  createdAt: {
    type: Schema.Types.Date,
    default: Date.now,
  },
  updatedAt: {
    type: Schema.Types.Date,
    default: Date.now,
  },
  dueDate: {
    type: Schema.Types.Date,
  },
  completed: {
    type: Boolean,
  },
  boardId: {
    type: Schema.Types.ObjectId,
    required: [true, 'The Board Id is required']
  },
  comments: [
    {
      type: String
    }
  ],
  actions: {
    type: Array,
  },
  commentsCount: {
    type: Schema.Types.Number
  }
})

const Card = mongoose.model('Card', CardSchema);

module.exports = Card;