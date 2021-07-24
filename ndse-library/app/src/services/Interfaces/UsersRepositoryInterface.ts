import { User } from "../../models/User";

export abstract class UsersRepositoryInterface {
  abstract getUser(filter: { [propertyName: string]: any }): Promise<User>;
  abstract createUser(params: User): Promise<User>;
}
