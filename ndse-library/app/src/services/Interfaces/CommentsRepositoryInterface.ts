import { Comment } from "../../comments/comment";

export abstract class CommentsRepositoryInterface {
  abstract getComments(limit: number, params: { [propertyName: string]: any }): Promise<Comment[]>;
  abstract create(params: Comment): Promise<Comment>;
}
