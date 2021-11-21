import { Request, Response, NextFunction } from 'express';
import { Router } from 'express';
import { IPost, PostModel } from '../models/post.model';
import { ICommentSchema } from '../schemas/comment.schema';

export const routes = Router();

// get all posts
routes.get('/', async function (req: Request, res: Response, next: NextFunction): Promise<any> {
    const page = req.body.page ? parseInt(req.body.page) : 0;
    const posts = await PostModel.getPosts(page);
    res.status(200).json(posts);
    next();
});

// get single post
routes.get('/:postId', async function (req: Request, res: Response, next: NextFunction): Promise<any> {
    const { postId } = req.params;
    const post = await PostModel.findById(postId);
    res.status(200).json(post);
    next();
});

// post new post
routes.post('/', async function (req: Request, res: Response, next: NextFunction): Promise<any> {
    const postParams = req.body as IPost;
    const userId = req.headers['user-id'] as string;
    if (!userId) {
        res.status(500);
        next();
        return;
    }
    postParams.userId = userId.toObjectId();
    const post = await PostModel.create(postParams);
    res.status(200).json(post);
    next();
});

// delete post
routes.delete('/:postId', async function (req: Request, res: Response, next: NextFunction): Promise<any> {
    const { postId } = req.params;
    await PostModel.findByIdAndDelete(postId);
    res.status(200).json({ success: true });
    next();
});

// get all comments of post
routes.get('/:postId/comments', async function (req: Request, res: Response, next: NextFunction): Promise<any> {
    const { postId } = req.params;

    const comments = await PostModel.findById(postId).projection('comments');

    res.status(200).json(comments);
    next();
});

// get single comment
routes.get(
    '/:postId/comments/:commentId',
    async function (req: Request, res: Response, next: NextFunction): Promise<any> {
        const { postId, commentId } = req.params;

        const comments: ICommentSchema[] = await PostModel.findById(postId).projection('comments');
        const comment = comments.find((x) => x._id.toString() === commentId);

        res.status(200).json(comment);
        next();
    }
);

// post new comment
routes.post('/:postId/comments', async function (req: Request, res: Response, next: NextFunction): Promise<any> {
    const { postId } = req.params;
    const commentParams = req.body as ICommentSchema;
    const userId = req.headers['user-id'] as string;
    if (!userId) {
        res.status(500);
        next();
        return;
    }
    commentParams.userId = userId.toObjectId();
    const post = await PostModel.findByIdAndUpdate(
        { _id: postId },
        { $inc: { commentCount: 1 }, $push: { comments: commentParams } },
        { new: true }
    );

    res.status(200).json(post);
    next();
});

// delete comment
routes.delete(
    '/:postId/comments/:commentId',
    async function (req: Request, res: Response, next: NextFunction): Promise<any> {
        const { postId, commentId } = req.params;
        await PostModel.findOneAndUpdate(
            { _id: postId },
            {
                $inc: { commentCount: -1 },
                $pull: { comments: { _id: commentId.toObjectId() } },
            }
        );
        res.status(200).json({ success: true });
        next();
    }
);

// TODO: upload image
