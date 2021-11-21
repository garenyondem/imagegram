import dotenv from 'dotenv';
import { NODE_ENV } from '../utils/enums';

const envFound = dotenv.config();
if (!envFound) {
    console.error("Couldn't find .env file or is not specified");
    process.exit();
}

process.env.NODE_ENV = process.env.NODE_ENV || NODE_ENV.DEVELOPMENT;

export default {
    nodeEnv: process.env.NODE_ENV,
    servicePort: process.env.PORT || '8989',
    mongoDB: process.env.MONGO_URI || '',
};
