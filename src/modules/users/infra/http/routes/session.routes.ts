import { Router } from 'express';
import AuthenticationUserService from '@modules/users/services/AuthenticationUserService';

import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepositories';

const SessionRouter = Router();

SessionRouter.post('/', async (request, response) => {
  const { email, password } = request.body;
  const userRepository = new UserRepository();

  const authenticateUser = new AuthenticationUserService(userRepository);

  const { user, token } = await authenticateUser.execute({
    email,
    password,
  });

  delete user.password;

  return response.json({ user, token });
});

export default SessionRouter;
