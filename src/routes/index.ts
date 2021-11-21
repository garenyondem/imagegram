import { Router } from 'express';
import { routes as postController } from '../controllers/post.controller';
import { routes as userController } from '../controllers/user.controller';
import { routes as fileController } from '../controllers/file.controller';

export const routes = Router();

routes.use('/posts', postController);
routes.use('/users', userController);
routes.use('/files', fileController);
