import { startOfHour } from 'date-fns';
import Appointment from '../models/Appointment';
import AppointmentRepositories from '../repositories/AppointmentRepositories';

interface RequestDTO {
  provider: string;
  date: Date;
}

class CreateAppointmentService {
  private appointementRepository: AppointmentRepositories;

  constructor(appointementRepository: AppointmentRepositories) {
    this.appointementRepository = appointementRepository;
  }

  public execute({ provider, date }: RequestDTO): Appointment {
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = this.appointementRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw Error('This appoinment is already booked');
    }

    const appointment = this.appointementRepository.create({
      provider,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
