import { injectable } from "inversify";
import { CommentsRepositoryInterface } from "../services/Interfaces/CommentsRepositoryInterface";

@injectable()
export class CommentsService {
  constructor(private readonly repo: CommentsRepositoryInterface) {}

  getComments(limit: number, params: { [propertyName: string]: any }): Promise<any[]> {
    return this.repo.getComments(limit, params);
  }
  create(params: any): Promise<any> {
    return this.repo.create(params);
  }
}
