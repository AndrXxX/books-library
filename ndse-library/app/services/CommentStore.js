const { Comment } = require('../models');

const store = {
  async find(limit, params, cb) {
    try {
      cb(null, await Comment.find(params).sort({ 'date': -1, '_id': -1 }).limit(limit).select('-__v'));
    } catch (e) {
      cb(e, null);
    }
  },
  async create(params, cb) {
    const comment = new Comment(params);
    try {
      await comment.save();
      cb(null, comment);
    } catch (e) {
      cb(e, comment);
    }
  },
};

module.exports = store;
