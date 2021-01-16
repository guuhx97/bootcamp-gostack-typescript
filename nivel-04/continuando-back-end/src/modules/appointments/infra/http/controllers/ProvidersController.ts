import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProvidersService from '@modules/appointments/services/ListProvidersService';

export default class ProvidersControllers {
  public async index(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;
    const listProviderService = container.resolve(ListProvidersService);
    const listProviders = await listProviderService.execute({
      user_id,
    });

    return res.json(listProviders);
  }
}
