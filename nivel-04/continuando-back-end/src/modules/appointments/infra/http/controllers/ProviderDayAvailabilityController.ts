import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderDayAvaliabilityService from '@modules/appointments/services/ListProviderDayAvaliabilityService';

export default class ProvidersControllers {
  public async index(req: Request, res: Response): Promise<Response> {
    const { year, month, day } = req.body;
    const { provider_id } = req.params;

    const listProviderService = container.resolve(
      ListProviderDayAvaliabilityService,
    );
    const listProviders = await listProviderService.execute({
      provider_id,
      year,
      month,
      day,
    });

    return res.json(listProviders);
  }
}
