import { Schema } from 'mongoose';

export interface IPhotoSchema {
    original: string;
    converted?: string;
}

const PhotoSchema: Schema<IPhotoSchema> = new Schema<IPhotoSchema>({
    original: {
        type: String,
        required: true,
    },
    converted: {
        type: String,
        required: true,
        default: '',
    },
});

export default PhotoSchema;
