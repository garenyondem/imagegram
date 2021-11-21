import { Schema, Document, Model, model, Types } from 'mongoose';

export interface IUser extends Document {
    _id: Types.ObjectId;
    name: string;
}

export interface IUserModel extends Model<IUser> {}

const UserSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
    },
    { timestamps: true, versionKey: false }
);

class UserClass {}

UserSchema.loadClass(UserClass);

export const UserModel = model<IUser>('User', UserSchema) as IUserModel;
