import { injectable } from "inversify";
import { Comment } from "../comments/comment";
import { CommentsRepositoryInterface } from "../services/Interfaces/CommentsRepositoryInterface";

@injectable()
export class CommentsService {
  constructor(private readonly repo: CommentsRepositoryInterface) {}

  getComments(limit: number, params: { [propertyName: string]: any }): Promise<Comment[]> {
    return this.repo.getComments(limit, params);
  }
  create(params: Comment): Promise<Comment> {
    return this.repo.create(params);
  }
}
