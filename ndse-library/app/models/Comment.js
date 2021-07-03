const { Schema, model } = require('mongoose');

const commentSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  refTypeId: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: new Date(),
  },
});

module.exports = model('Comment', commentSchema);
