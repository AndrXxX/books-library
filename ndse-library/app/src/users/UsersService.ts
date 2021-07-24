import { injectable } from "inversify";
import { User } from "./user";
import { AbstractUsersRepository } from "./AbstractUsersRepository";

@injectable()
export class UsersService {
  constructor(private readonly repo: AbstractUsersRepository) {}

  getUser(filter: { [propertyName: string]: any }): Promise<User> {
    return this.repo.getUser(filter);
  }
  createUser(params: User): Promise<User> {
    return this.repo.createUser(params);
  }
}
