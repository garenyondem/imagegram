import { Request, Response, NextFunction } from 'express';
import { Router } from 'express';
import { UserModel } from '../models/user.model';

export const routes = Router();

routes.post('/', async function getPosts(req: Request, res: Response, next: NextFunction): Promise<any> {
    const userParams = req.body;
    const user = await UserModel.create(userParams);
    res.status(200).json(user);
    next();
});
