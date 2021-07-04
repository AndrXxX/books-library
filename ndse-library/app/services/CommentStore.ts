import { Comment, CommentModel } from '../models/Comment';

export type CommentsFilter = {
  refTypeId?: string;
}

const store = {
  async find(limit: number, params: CommentsFilter, cb: (err?: Error, comments?: Comment[]) => void) {
    try {
      cb(null, await CommentModel.find(params).sort({ 'date': -1, '_id': -1 }).limit(limit).select('-__v'));
    } catch (e) {
      cb(e);
    }
  },
  async create(params: Comment, cb: (err?: Error, comment?: Comment) => void) {
    const comment = new CommentModel(params);
    try {
      await comment.save();
      cb(null, comment);
    } catch (e) {
      cb(e, comment);
    }
  },
};

export default store;
