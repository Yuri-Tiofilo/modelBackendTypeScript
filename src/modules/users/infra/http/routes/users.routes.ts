import { Router } from 'express';
import { container } from 'tsyringe';

import multer from 'multer';
import CreateUserService from '@modules/users/services/CreateUserService';
import uploadConfig from '@config/upload';

import UpdateUserService from '@modules/users/services/UpdateUserService';

import auth from '@modules/users/infra/http/middlewares/auth';

const UserRouter = Router();
const upload = multer(uploadConfig);

// UserRouter.get('/', async (request, response) => {
//   const userRepositories = getCustomRepository(UserRepository);

//   const users = await userRepositories.find();

//   return response.json(users);
// });

UserRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  const createUser = container.resolve(CreateUserService);

  const user = await createUser.execute({
    name,
    email,
    password,
  });

  delete user.password;

  return response.json(user);
});

// UserRouter.delete('/:id', async (request, response) => {
//   const { id } = request.params;

//   const userRepositories = getCustomRepository(UserRepository);

//   const user = await userRepositories.findOne({
//     where: { id },
//   });

//   if (!user) {
//     return response.status(401).json({ message: 'User not exist' });
//   }

//   await userRepositories.delete(user.id);

//   return response.json({ message: 'User deleted' });
// });

UserRouter.patch(
  '/avatar',
  auth,
  upload.single('avatar'),
  async (request, response) => {
    const uploadUserAvatar = container.resolve(UpdateUserService);

    const user = await uploadUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });

    delete user.password;

    return response.json(user);
  },
);

export default UserRouter;
