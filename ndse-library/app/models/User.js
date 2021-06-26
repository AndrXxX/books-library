const {Schema, model} = require('mongoose');

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Не указан логин'],
  },
  password: {
    type: String,
    required: [true, 'Не указан пароль'],
  },
  email: {
    type: String,
    required: [true, 'Не указан email'],
  }
});

module.exports = model('User', userSchema);