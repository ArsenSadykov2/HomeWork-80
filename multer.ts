import multer from "multer";
import { promises as fs } from 'fs';
import path from 'path';
import config from "./config";
import { randomUUID } from "node:crypto";

const imageStorage = multer.diskStorage({
    destination: async (_req: Express.Request, _file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
        const destDir = path.join(config.publicPath, 'images');
        await fs.mkdir(destDir, { recursive: true });
        cb(null, destDir);
    },
    filename: (_req: Express.Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
        const extension = path.extname(file.originalname);
        cb(null, randomUUID() + extension);
    }
});

export const imagesUpload = multer({ storage: imageStorage });