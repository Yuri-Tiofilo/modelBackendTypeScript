import path from 'path';
import crypto from 'crypto';
import multer from 'multer';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

export default {
  tmpFolder,
  uploadFolder: path.resolve(tmpFolder, 'uploads'),

  storage: multer.diskStorage({
    destination: tmpFolder,
    filename(req, file, cab) {
      const filehash = crypto.randomBytes(10).toString('HEX');

      const fileName = `${filehash}-${file.originalname}`;

      return cab(null, fileName);
    },
  }),
};
