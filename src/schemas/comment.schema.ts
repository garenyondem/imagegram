import { Schema, Types } from 'mongoose';

export interface ICommentSchema {
    _id: Types.ObjectId;
    text: string;
    userId: Types.ObjectId;
    createdAt: Date;
}

const CommentSchema: Schema<ICommentSchema> = new Schema<ICommentSchema>(
    {
        text: String,
        userId: Types.ObjectId,
    },
    { timestamps: true, versionKey: false }
);

export default CommentSchema;
