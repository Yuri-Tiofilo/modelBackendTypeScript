import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import Appointment from '../models/Appointment';
import AppointmentRepositories from '../repositories/AppointmentRepositories';

interface RequestDTO {
  provider: string;
  date: Date;
}

class CreateAppointmentService {
  public async execute({ provider, date }: RequestDTO): Promise<Appointment> {
    const appointementRepository = getCustomRepository(AppointmentRepositories);
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await appointementRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw Error('This appoinment is already booked');
    }

    const appointment = appointementRepository.create({
      provider,
      date: appointmentDate,
    });

    await appointementRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
