import { Router } from 'express';
import { routes as postController } from '../controllers/post.controller';

export const routes = Router();

routes.use('/posts', postController);
