import { Comment } from "./comment";

export abstract class AbstractCommentsRepository {
  abstract getComments(limit: number, params: { [propertyName: string]: any }): Promise<Comment[]>;
  abstract create(params: Comment): Promise<Comment>;
}
