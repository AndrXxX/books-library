import { Comment, CommentModel } from '../models/Comment';

export type CommentsFilter = {
  refTypeId?: string;
}

const store = {
  async getComments(limit: number, params: CommentsFilter) {
    return CommentModel.find(params).sort({ 'date': -1, '_id': -1 }).limit(limit).select('-__v');
  },
  async create(params: Comment): Promise<Comment> {
    const comment = new CommentModel(params);
    await comment.save();
    return comment;
  },
};

export default store;
