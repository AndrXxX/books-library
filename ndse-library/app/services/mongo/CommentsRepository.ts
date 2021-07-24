import { injectable } from "inversify";
import { CommentsRepositoryInterface } from "../../services/Interfaces/CommentsRepositoryInterface";
import { Comment, CommentModel } from '../../models/Comment';

export type CommentsFilter = {
  refTypeId?: string;
}

@injectable()
export class CommentsRepository implements CommentsRepositoryInterface {
  async getComments(limit: number, params: CommentsFilter) {
    return CommentModel.find(params).sort({ 'date': -1, '_id': -1 }).limit(limit).select('-__v');
  }
  async create(params: Comment): Promise<Comment> {
    const comment = new CommentModel(params);
    await comment.save();
    return comment;
  }
}

export const commentsRepository = new CommentsRepository();
