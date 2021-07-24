import { injectable } from "inversify";
import { Comment } from "./comment";
import { AbstractCommentsRepository } from "./AbstractCommentsRepository";

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
