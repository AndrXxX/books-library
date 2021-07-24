import { User } from "./user";

export abstract class AbstractUsersRepository {
  abstract getUser(filter: { [propertyName: string]: any }): Promise<User>;
  abstract createUser(params: User): Promise<User>;
}
