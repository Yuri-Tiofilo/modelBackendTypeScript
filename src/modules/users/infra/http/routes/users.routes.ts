import { Router } from 'express';

import multer from 'multer';
import uploadConfig from '@config/upload';

import auth from '@modules/users/infra/http/middlewares/auth';

import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';

const UserRouter = Router();

const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

const upload = multer(uploadConfig);

UserRouter.post('/', usersController.create);

UserRouter.patch(
  '/avatar',
  auth,
  upload.single('avatar'),
  userAvatarController.update,
);

export default UserRouter;
