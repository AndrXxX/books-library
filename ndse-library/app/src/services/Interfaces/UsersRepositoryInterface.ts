import { User } from "../../users/user";

export abstract class UsersRepositoryInterface {
  abstract getUser(filter: { [propertyName: string]: any }): Promise<User>;
  abstract createUser(params: User): Promise<User>;
}
