import { Request, Response, NextFunction } from 'express';
import { Router } from 'express';
import multer from 'multer';
import { nanoid } from 'nanoid';
import { em } from '../utils/events';

export const routes = Router();

function storage() {
    return multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, process.cwd() + '/src/public/uploads');
        },
        filename: (req, file, cb) => {
            const fileFormat = file.mimetype.split('/');
            const fileExt = fileFormat[fileFormat.length - 1];
            cb(null, `${file.fieldname}-${nanoid(5)}.${fileExt}`);
        },
    });
}

const upload = multer({
    storage: storage(),
    limits: { fileSize: 100000000 }, // 100 MB
    fileFilter: (req, file, cb) => {
        const allowedFileTypes = /jpeg|jpg|png|bmp/;
        const isMimeTypeAllowed = allowedFileTypes.test(file.mimetype);
        const fileExt = file.mimetype.split('/').pop();
        if (!fileExt) {
            return cb(null, false);
        }
        const isFileNameCorrect = allowedFileTypes.test(fileExt);
        if (!isMimeTypeAllowed || !isFileNameCorrect) {
            return cb(new Error('Invalid file'));
        }
        cb(null, true);
    },
});

routes.post(
    '/post-image',
    upload.single('file'),
    async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        const userId = req.headers['user-id'] as string;
        if (!userId) {
            res.status(500);
            next();
            return;
        }

        const file = req.file;
        em.emit('convert-image', file?.path);

        res.status(200).json({ url: file?.path });
        next();
    }
);
