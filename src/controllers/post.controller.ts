import { Request, Response, NextFunction } from 'express';
import { Router } from 'express';
import { PostModel } from '../models/post.model';
import { ICommentSchema } from '../schemas/comment.schema';

export const routes = Router();

routes.get('/', async function getPosts(req: Request, res: Response, next: NextFunction): Promise<any> {
    const page = req.body.page ? parseInt(req.body.page) : 0;

    const posts = await PostModel.getPosts(page);

    res.status(200).json(posts);
    next();
});

routes.get('/:postId', async function getPosts(req: Request, res: Response, next: NextFunction): Promise<any> {
    const { postId } = req.params;

    const post = await PostModel.findById(postId);

    res.status(200).json(post);
    next();
});

routes.get('/:postId/comments', async function getPosts(req: Request, res: Response, next: NextFunction): Promise<any> {
    const { postId } = req.params;

    const comments = await PostModel.findById(postId).projection('comments');

    res.status(200).json(comments);
    next();
});

routes.get(
    '/:postId/comments/:commentId',
    async function getPosts(req: Request, res: Response, next: NextFunction): Promise<any> {
        const { postId, commentId } = req.params;

        const comments: ICommentSchema[] = await PostModel.findById(postId).projection('comments');
        const comment = comments.find((x) => x._id.toString() === commentId);

        res.status(200).json(comment);
        next();
    }
);

// TODO: delete comment
// TODO: delete post
// TODO: upload image
// TODO: post / comment pagination
// TODO: mongo implementation
