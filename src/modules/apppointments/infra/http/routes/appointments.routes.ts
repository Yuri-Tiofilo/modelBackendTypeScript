import { Router } from 'express';

import { container } from 'tsyringe';
import { parseISO } from 'date-fns';

import CreateAppointmentService from '@modules/apppointments/services/CreateAppointmentService';
import auth from '@modules/users/infra/http/middlewares/auth';

const appointmentsRouter = Router();

appointmentsRouter.use(auth);

// appointmentsRouter.get('/', async (request, response) => {
//   const appoinments = await appoinmentsRepository.find();

//   return response.json(appoinments);
// });

appointmentsRouter.post('/create', async (request, response) => {
  const { provider_id, date } = request.body;

  const parsedDate = parseISO(date);

  const createAppointment = container.resolve(CreateAppointmentService);

  const appointment = await createAppointment.execute({
    date: parsedDate,
    provider_id,
  });

  return response.json(appointment);
});

export default appointmentsRouter;
