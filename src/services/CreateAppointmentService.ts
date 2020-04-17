import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import Appointment from '../models/Appointment';
import AppointmentRepositories from '../repositories/AppointmentRepositories';

interface RequestDTO {
  provider_id: string;
  date: Date;
}

class CreateAppointmentService {
  public async execute({
    provider_id,
    date,
  }: RequestDTO): Promise<Appointment> {
    const appointementRepository = getCustomRepository(AppointmentRepositories);
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await appointementRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw new Error('This appoinment is already booked');
    }

    const appointment = appointementRepository.create({
      provider_id,
      date: appointmentDate,
    });

    await appointementRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
