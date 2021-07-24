import { Schema } from 'mongoose';

export const userSchema = new Schema({
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
