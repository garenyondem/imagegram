import mongoose from 'mongoose';
import config from '../config';
import { NODE_ENV } from '../utils/enums';

if (config.nodeEnv == NODE_ENV.DEVELOPMENT) {
    mongoose.set('debug', true);
}

const init = async () => {
    await mongoose.connect(config.mongoDB);
};

export default init;
