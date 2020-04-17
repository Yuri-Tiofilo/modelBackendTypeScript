import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns';

import AppointmentRepositories from '../repositories/AppointmentRepositories';
import CreateAppointmentService from '../services/CreateAppointmentService';

import auth from '../middlewares/auth';

const appointmentsRouter = Router();

appointmentsRouter.use(auth);

appointmentsRouter.get('/', async (request, response) => {
  const appointmentRepositories = getCustomRepository(AppointmentRepositories);
  const appoinments = await appointmentRepositories.find();

  return response.json(appoinments);
});

appointmentsRouter.post('/create', async (request, response) => {
  try {
    const { provider_id, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppointment = new CreateAppointmentService();

    const appointment = await createAppointment.execute({
      date: parsedDate,
      provider_id,
    });

    return response.json(appointment);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default appointmentsRouter;
