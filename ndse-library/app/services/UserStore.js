const {User} = require('../models');

const store = {
  async findById(id, cb) {
    try {
      cb(null, await User.findById(id).select('-__v'));
    } catch (e) {
      cb(e, null);
    }
  },
  async findByUsername(username, cb) {
    try {
      cb(null, await User.findOne({username: username}).select('-__v'));
    } catch (e) {
      e.message
      cb(e, null);
    }
  },
  async update(id, params) {
    try {
      await User.findByIdAndUpdate(id, params).select('-__v');
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  },
  async create(params, cb) {
    const user = new User(params);
    try {
      await user.save();
      cb(null, user);
    } catch (e) {
      cb(e, user);
    }
  },
  verifyPassword(user, password) {
    // todo: use hash
    return user.password === password;
  }
};

module.exports = store;
