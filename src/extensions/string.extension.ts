import { Types } from 'mongoose';

declare global {
    interface String {
        /**
         * Convert valid string to ObjectId
         */
        toObjectId(this: string): Types.ObjectId;
    }
}
String.prototype.toObjectId = function (this: string): Types.ObjectId {
    if (!Types.ObjectId.isValid(this)) {
        throw new Error('Invalid ObjectId value');
    }
    return new Types.ObjectId(this);
};
