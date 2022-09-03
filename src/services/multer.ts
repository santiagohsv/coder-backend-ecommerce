import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';
import env from '../config';

const mongoURL= env.MONGO_ATLAS_SRV as string;

const storage = new GridFsStorage({
    url: mongoURL,
    file: (_req, file) => {
        if (file.mimetype === 'image/jpeg') {
          return {
            bucketName: 'images'
          };
        } else {
          return null;
        }
    }
});

export default multer({storage});