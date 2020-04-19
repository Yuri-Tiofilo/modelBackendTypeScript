import { Router } from 'express';
import AuthenticationUserService from '../services/AuthenticationUserService';

const SessionRouter = Router();

SessionRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authenticateUser = new AuthenticationUserService();

  const { user, token } = await authenticateUser.execute({
    email,
    password,
  });

  delete user.password;

  return response.json({ user, token });
});

export default SessionRouter;
