import AppError from '@shared/errors/appError';
import FakeAppointemnetsRepository from '../repositories/fakes/FakeAppoitmnetsrepository';
import CreateAppointmentService from './CreateAppointmentService';

// teste unitario

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointemnetsRepository = new FakeAppointemnetsRepository();

    const createAppointment = new CreateAppointmentService(
      fakeAppointemnetsRepository,
    );

    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '123456',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123456');
  });
  it('should note be able to create a two appointments on the same time date', async () => {
    const fakeAppointemnetsRepository = new FakeAppointemnetsRepository();

    const createAppointment = new CreateAppointmentService(
      fakeAppointemnetsRepository,
    );

    const appointmentDate = new Date(2020, 4, 10, 11);

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: '123456',
    });

    expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
