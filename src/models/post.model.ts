import { Schema, Document, model, Model, Types } from 'mongoose';
import * as PhotoSchema from '../schemas/photo.schema';
import * as CommentSchema from '../schemas/comment.schema';
import { IUser } from './user.model';

export interface IPost extends Document {
    _id: Types.ObjectId;
    text: string;
    photo?: PhotoSchema.IPhotoSchema;
    createdAt: Date;
    author: IUser;
    comments?: CommentSchema.ICommentSchema[];
    commentCount: number;
    userId: IUser['_id'];
}

export interface IPostModel extends Model<IPost> {
    insertPost(text: string, photo: PhotoSchema.IPhotoSchema): Promise<IPost>;
    getPosts(page: number): Promise<IPost[]>;
}

const PostSchema = new Schema(
    {
        text: String,
        photo: PhotoSchema.default,
        comments: [CommentSchema.default],
        commentCount: {
            type: Number,
            default: 0,
        },
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
    },
    { timestamps: true, versionKey: false, toObject: { virtuals: true }, toJSON: { virtuals: true } }
);

PostSchema.virtual('author', {
    ref: 'User',
    localField: 'userId',
    foreignField: '_id',
    justOne: true,
});

class PostClass {
    static async insertPost(text: string, photo: PhotoSchema.IPhotoSchema): Promise<IPost> {
        const post = new PostModel();
        post.text = text;
        post.photo = photo;
        return post.save();
    }

    static async getPosts(page: number): Promise<IPost[]> {
        const pageSize = 15;
        const skip = page * pageSize;
        const posts = await PostModel.find()
            .sort({ commentCount: -1 })
            .skip(skip)
            .limit(pageSize)
            .populate('author', 'name -_id');

        for (const post of posts) {
            post.comments?.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
            post.comments?.splice(0, 2);
        }
        return posts;
    }
}

PostSchema.loadClass(PostClass);

export const PostModel = model<IPost>('Post', PostSchema) as IPostModel;
