import Appointmnet from '../infra/typeorm/entities/Appointment';

import ICreateAppointmentDTO from '../dtos/ICreateAppointmentsDTO';

export default interface IAppointments {
  create(data: ICreateAppointmentDTO): Promise<Appointmnet>;
  findByDate(date: Date): Promise<Appointmnet | undefined>;
}
