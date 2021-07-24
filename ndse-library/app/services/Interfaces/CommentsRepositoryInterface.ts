import { Comment } from "../../models/Comment";

export abstract class CommentsRepositoryInterface {
  abstract getComments(limit: number, params: { [propertyName: string]: any }): Promise<Comment[]>;
  abstract create(params: Comment): Promise<Comment>;
}
