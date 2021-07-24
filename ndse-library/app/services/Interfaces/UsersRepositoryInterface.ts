export abstract class UsersRepositoryInterface {
  abstract getUser(filter: { [propertyName: string]: any }): Promise<any>;
  abstract createUser(params: any): Promise<any>;
}
