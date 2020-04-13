import { Request, Response } from 'express';
import { uuid } from 'uuidv4';
import { startOfHour, parseISO, isEqual } from 'date-fns';

interface Appointment {
  id: string;
  provider: string;
  date: Date;
}

const appointments: Appointment[] = [];

export default {
  async create(req: Request, res: Response) {
    const { provider, date } = req.body;

    const parsedDate = startOfHour(parseISO(date));

    const findAppointmentInSameDate = appointments.find(appointment =>
      isEqual(parsedDate, appointment.date),
    );

    if (findAppointmentInSameDate) {
      return res
        .status(400)
        .json({ message: 'This appoinment is already booked' });
    }

    const appointment = {
      id: uuid(),
      provider,
      date: parsedDate,
    };
    appointments.push(appointment);

    return res.json(appointment);
  },
};
