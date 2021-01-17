import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';
import IFindAllInDayProviderDTO from '../dtos/IFindAllInDayFromProviderDTO';
import IFindAllInMonthProviderDTO from '../dtos/IFindAllInMonthFromProvidersDTO';
import Appointment from '../infra/typeorm/entities/Appointment';

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
  findAllInMonthFromProvider(
    data: IFindAllInMonthProviderDTO,
  ): Promise<Appointment[]>;
  findAllInDayFromProvider(
    data: IFindAllInDayProviderDTO,
  ): Promise<Appointment[]>;
}
