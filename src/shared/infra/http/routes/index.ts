import { Router } from 'express';
import appointmentsRouter from '@modules/apppointments/infra/http/routes/appointments.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionRouter from '@modules/users/infra/http/routes/session.routes';

const routes = Router();

routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRouter);
routes.use('/session', sessionRouter);

export default routes;
