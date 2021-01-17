import ListProviderMonthAvalabilityService from '@modules/appointments/services/ListProviderMonthAvalabilityService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class ProviderMonthAvailabilityController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { month, year } = req.body;
    const { provider_id } = req.params;

    const listProviderMonthAvailabilityService = container.resolve(
      ListProviderMonthAvalabilityService,
    );
    const listProviderMonthAvailability = await listProviderMonthAvailabilityService.execute(
      {
        provider_id,
        month,
        year,
      },
    );

    return res.json(listProviderMonthAvailability);
  }
}
