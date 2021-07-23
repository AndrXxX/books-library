import { Document, Schema, model } from 'mongoose';

export interface Comment {
  text: string;
  type: string;
  refTypeId: string;
  username: string;
  date: Date;
}

const commentSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  refTypeId: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: new Date(),
  },
});

export const CommentModel = model<Comment & Document>('Comment', commentSchema);
