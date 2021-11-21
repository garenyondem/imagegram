import { Request, Response, NextFunction } from 'express';
import { Router } from 'express';

export const routes = Router();

import mockPosts from '../test/mock.posts.json';

routes.get('/', async function getPosts(req: Request, res: Response, next: NextFunction): Promise<any> {
    res.status(200).json(mockPosts);
    next();
});

routes.get('/:postId', async function getPosts(req: Request, res: Response, next: NextFunction): Promise<any> {
    const { postId } = req.params;

    const retVal = mockPosts.find((x) => x._id === postId);

    res.status(200).json(retVal);
    next();
});

routes.get('/:postId/comments', async function getPosts(req: Request, res: Response, next: NextFunction): Promise<any> {
    const { postId } = req.params;

    const retVal = mockPosts.find((x) => x._id === postId)?.comments;

    res.status(200).json(retVal);
    next();
});

routes.get(
    '/:postId/comments/:commentId',
    async function getPosts(req: Request, res: Response, next: NextFunction): Promise<any> {
        const { postId, commentId } = req.params;

        const retVal = mockPosts.find((x) => x._id === postId)?.comments.find((x) => x._id === commentId);

        res.status(200).json(retVal);
        next();
    }
);

// TODO: delete comment
// TODO: delete post
// TODO: upload image
// TODO: post / comment pagination
// TODO: mongo implementation
