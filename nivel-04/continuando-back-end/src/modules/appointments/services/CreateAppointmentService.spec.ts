import CreateAppointmentService from './CreateAppointmentService';
import FakeAppointmentRepository from '../repositories/fakes/fakeAppointmentsRepository';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '123123123131',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123123123131');
  });

  // it('should not be able to create two appointment on the same time', () => {
  //   expect(1 + 2).toBe(3);
  // });
});
