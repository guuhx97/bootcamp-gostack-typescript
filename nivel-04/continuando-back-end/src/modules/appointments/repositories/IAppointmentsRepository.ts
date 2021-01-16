import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';
import IFindAllInMonthProviderDTO from '../dtos/IFindAllInMonthFromProvidersDTO';
import Appointment from '../infra/typeorm/entities/Appointment';

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
  findAllInMonthFromProvider(
    data: IFindAllInMonthProviderDTO,
  ): Promise<Appointment[]>;
}
