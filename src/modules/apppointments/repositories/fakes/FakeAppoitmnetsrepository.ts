import { uuid } from 'uuidv4';
import { isEqual } from 'date-fns';

import ICreateAppointmentDTO from '@modules/apppointments/dtos/ICreateAppointmentsDTO';
import IAppointments from '@modules/apppointments/repositories/IAppointments';
import Appointment from '../../infra/typeorm/entities/Appointment';

class AppointmentRepositories implements IAppointments {
  private appointments: Appointment[] = [];

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointments = this.appointments.find(appointment =>
      isEqual(appointment.date, date),
    );
    return findAppointments;
  }

  public async create({
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, { id: uuid(), date, provider_id });

    appointment.id = uuid();
    appointment.date = date;
    appointment.provider_id = provider_id;

    this.appointments.push(appointment);

    return appointment;
  }
}

export default AppointmentRepositories;
