import { UserModel, User } from '../models/User';
import generator from '../services/HashGenerator';

export type UserFilter = {
  id?: string;
  username?: string;
}

const store = {
  async getUser(filter: UserFilter) {
    if (filter.id) {
      return UserModel.findById(filter.id).select('-__v');
    }
   return UserModel.findOne(filter).select('-__v');
  },
  async createUser(params: User) {
    const user = new UserModel(params);
    user.password = generator.generate(user.password);
    await user.save();
    return user;
  },
};

export default store;
