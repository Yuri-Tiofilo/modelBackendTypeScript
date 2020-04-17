import { Router } from 'express';

import CreateUserService from '../services/CreateUserService';

const UserRouter = Router();

UserRouter.get('/', async (request, response) => {
  return response.send({ ok: true });
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

export default UserRouter;
