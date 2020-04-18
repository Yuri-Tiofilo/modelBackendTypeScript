import { Router } from 'express';

import { getCustomRepository } from 'typeorm';
import CreateUserService from '../services/CreateUserService';
import UserRepository from '../repositories/UserRepositories';

// import UserController from '../controllers/UserController';

const UserRouter = Router();

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

// UserRouter.delete('/:id', UserController.delete);

export default UserRouter;
