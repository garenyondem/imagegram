import { Schema, Document, model, Model, Types } from 'mongoose';
import * as PhotoSchema from '../schemas/photo.schema';
import { IUser } from './user.model';

export interface IPost extends Document {
    _id: Types.ObjectId;
    text: string;
    photo?: PhotoSchema.IPhotoSchema;
    createdAt: Date;
    author: IUser;
}

export interface IPostModel extends Model<IPost> {
    insertPost(text: string, photo: PhotoSchema.IPhotoSchema): Promise<IPost>;
    getPosts(page: number): Promise<IPost[]>;
}

const PostSchema = new Schema(
    {
        text: {
            type: String,
        },
        photo: {
            type: PhotoSchema.default,
        },
    },
    { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } }
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
        return PostModel.find().sort({ _id: -1 }).skip(skip).limit(pageSize).populate('author', 'name -_id');
    }
}

PostSchema.loadClass(PostClass);

export const PostModel = model<IPost>('Post', PostSchema) as IPostModel;
