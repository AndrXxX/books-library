import { injectable } from "inversify";
import { User } from "../models/User";
import { UsersRepositoryInterface } from "../services/Interfaces/UsersRepositoryInterface";

@injectable()
export class UsersService {
  constructor(private readonly repo: UsersRepositoryInterface) {}

  getUser(filter: { [propertyName: string]: any }): Promise<User> {
    return this.repo.getUser(filter);
  }
  createUser(params: User): Promise<User> {
    return this.repo.createUser(params);
  }
}
