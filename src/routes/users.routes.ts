import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import multer from 'multer';
import uploadConfig from '../config/upload';

import CreateUserService from '../services/CreateUserService';
import UpdateUserService from '../services/UpdateUserService';
import UserRepository from '../repositories/UserRepositories';

import auth from '../middlewares/auth';
// import UserController from '../controllers/UserController';

const UserRouter = Router();
const upload = multer(uploadConfig);

UserRouter.get('/', async (request, response) => {
  const userRepositories = getCustomRepository(UserRepository);

  const users = await userRepositories.find();

  return response.json(users);
});

UserRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    delete user.password;

    return response.json(user);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

UserRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const userRepositories = getCustomRepository(UserRepository);

  const user = await userRepositories.findOne({
    where: { id },
  });

  if (!user) {
    return response.status(401).json({ message: 'User not exist' });
  }

  await userRepositories.delete(user.id);

  return response.json({ message: 'User deleted' });
});

UserRouter.patch(
  '/avatar',
  auth,
  upload.single('avatar'),
  async (request, response) => {
    try {
      const uploadUserAvatar = new UpdateUserService();

      const user = await uploadUserAvatar.execute({
        user_id: request.user.id,
        avatarFilename: request.file.filename,
      });

      delete user.password;

      return response.json(user);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  },
);

export default UserRouter;
