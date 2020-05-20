import { container } from 'tsyringe';

import IAppointmentsRepository from '@modules/apppointments/repositories/IAppointments';
import AppointmentsRepository from '@modules/apppointments/infra/typeorm/repositories/AppointmentRepositories';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UserRepositories';

container.registerSingleton<IAppointmentsRepository>(
  'AppointmentsRepository',
  AppointmentsRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);
