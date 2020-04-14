import { Router } from 'express';
import { parseISO } from 'date-fns';

import AppointmentRepositories from '../repositories/AppointmentRepositories';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();
const appointmentRepositories = new AppointmentRepositories();

appointmentsRouter.get('/', (request, response) => {
  const appoinments = appointmentRepositories.all();

  return response.json(appoinments);
});

appointmentsRouter.post('/create', (request, response) => {
  try {
    const { provider, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppointment = new CreateAppointmentService(
      appointmentRepositories,
    );

    const appointment = createAppointment.execute({
      date: parsedDate,
      provider,
    });

    return response.json(appointment);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default appointmentsRouter;
