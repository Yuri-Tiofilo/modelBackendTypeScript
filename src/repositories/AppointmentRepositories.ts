import { isEqual } from 'date-fns';
import Appointment from '../models/Appointment';

class AppointmentRepositories {
  private appoinment: Appointment[];

  constructor() {
    this.appoinment = [];
  }

  public findByDate(date: Date): Appointment | null {
    const findAppointment = this.appoinment.find(appointment =>
      isEqual(date, appointment.date),
    );

    return findAppointment || null;
  }

  public create(provider: string, date: Date): Appointment {
    const appointment = new Appointment(provider, date);

    this.appoinment.push(appointment);

    return appointment;
  }
}

export default AppointmentRepositories;
