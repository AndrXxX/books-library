import { injectable } from "inversify";
import { CommentsRepositoryInterface } from "../../services/Interfaces/CommentsRepositoryInterface";
import { Comment } from '../../models/Comment';
import { commentSchema } from "../../services/mongo/schemas/commentSchema";
import { Document, model } from "mongoose";

export type CommentsFilter = {
  refTypeId?: string;
}

const CommentModel = model<Comment & Document>('Comment', commentSchema);

@injectable()
export class CommentsRepository implements CommentsRepositoryInterface {
  async getComments(limit: number, params: CommentsFilter): Promise<Comment[]> {
    return CommentModel.find(params).sort({ 'date': -1, '_id': -1 }).limit(limit).select('-__v');
  }
  async create(params: Comment): Promise<Comment> {
    const comment = new CommentModel(params);
    await comment.save();
    return comment;
  }
}
