import FakeAppointmentRepository from '../repositories/fakes/fakeAppointmentsRepository';
import ListProviderAppointmentsService from './ListProviderAppointmentsService';

let fakeAppointmentsRepository: FakeAppointmentRepository;
let listProvidersAppointments: ListProviderAppointmentsService;

describe('ListProviderAppointments', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentRepository();
    listProvidersAppointments = new ListProviderAppointmentsService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list the appointments on a specific day', async () => {
    const appointmentOne = await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      date: new Date(2020, 4, 20, 14, 0, 0),
      user_id: 'user',
    });

    const appointmentTwo = await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      date: new Date(2020, 4, 20, 15, 0, 0),
      user_id: 'user',
    });

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 20, 11).getTime();
    });

    const appoitments = await listProvidersAppointments.execute({
      provider_id: 'provider',
      year: 2020,
      month: 5,
      day: 20,
    });

    expect(appoitments).toEqual([appointmentOne, appointmentTwo]);
  });
});
