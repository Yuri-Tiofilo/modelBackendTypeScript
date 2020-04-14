import { Router } from 'express';
import { startOfHour, parseISO } from 'date-fns';
import AppointmentRepositories from '../repositories/AppointmentRepositories';

const appointmentsRouter = Router();
const appointmentRepositories = new AppointmentRepositories();

appointmentsRouter.get('/', (request, response) => {
  const appoinments = appointmentRepositories.all();

  return response.json(appoinments);
});

appointmentsRouter.post('/create', (request, response) => {
  const { provider, date } = request.body;

  const parsedDate = startOfHour(parseISO(date));

  const findAppointmentInSameDate = appointmentRepositories.findByDate(
    parsedDate,
  );

  if (findAppointmentInSameDate) {
    return response
      .status(400)
      .json({ message: 'This appoinment is already booked' });
  }

  const appointment = appointmentRepositories.create({
    provider,
    date: parsedDate,
  });

  return response.json(appointment);
});

export default appointmentsRouter;
