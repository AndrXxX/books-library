import { injectable } from "inversify";
import { UsersRepositoryInterface } from "../services/Interfaces/UsersRepositoryInterface";

@injectable()
export class UsersService {
  constructor(private readonly repo: UsersRepositoryInterface) {}

  getUser(filter: { [propertyName: string]: any }): Promise<any> {
    return this.repo.getUser(filter);
  }
  createUser(params: any): Promise<any> {
    return this.repo.createUser(params);
  }
}
