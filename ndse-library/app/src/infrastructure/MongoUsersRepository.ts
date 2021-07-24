import { injectable } from "inversify";
import { Document, model } from "mongoose";
import { User } from '../users/user';
import generator from '../services/HashGenerator';
import { AbstractUsersRepository } from "../users/AbstractUsersRepository";
import { userSchema } from "./mongo.schemas/user.schema";

const UserModel = model<User & Document>("User", userSchema)

export type UserFilter = {
  [propertyName: string]: any;
  id?: string;
  username?: string;
}

@injectable()
export class MongoUsersRepository implements AbstractUsersRepository {
  async getUser(filter: UserFilter): Promise<any> {
    if (filter.id) {
      return UserModel.findById(filter.id).select('-__v');
    }
   return UserModel.findOne(filter).select('-__v');
  }
  async createUser(params: User) {
    const user = new UserModel(params);
    user.password = generator.generate(user.password);
    await user.save();
    return user;
  }
}
