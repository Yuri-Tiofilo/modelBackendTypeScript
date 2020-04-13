import { Router } from 'express';
import appointmentsRouter from './appointments.routes';
import usersRouter from './users.routes';

const routes = Router();

routes.use('/appointments', appointmentsRouter);

routes.post('/users', (request, response) => {
  console.log(request);

  const { name, email } = request.body;

  const user = {
    name,
    email,
  };

  return response.json(request.body);
});

export default routes;
