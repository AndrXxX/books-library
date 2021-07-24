import { injectable } from "inversify";
import { AbstractCommentsRepository } from "./AbstractCommentsRepository";
import { Comment } from "./comment";

@injectable()
export class CommentsService {
  constructor(private readonly repo: AbstractCommentsRepository) {}

  getComments(limit: number, params: { [propertyName: string]: any }): Promise<Comment[]> {
    return this.repo.getComments(limit, params);
  }
  create(params: Comment): Promise<Comment> {
    return this.repo.create(params);
  }
}
