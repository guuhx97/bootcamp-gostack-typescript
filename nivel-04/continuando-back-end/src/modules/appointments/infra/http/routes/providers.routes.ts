import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProvidersControllers from '../controllers/ProvidersController';
import ProviderMonthAvailabilityController from '../controllers/ProviderMonthAvailabilityController';
import ProviderDayAvailabilityController from '../controllers/ProviderDayAvailabilityController';

const providersRoutes = Router();
const providersControllers = new ProvidersControllers();
const providerMonthAvailabilityController = new ProviderMonthAvailabilityController();
const providerDayAvailabilityController = new ProviderDayAvailabilityController();

providersRoutes.use(ensureAuthenticated);

providersRoutes.get('/', providersControllers.index);
providersRoutes.get(
  '/:provider_id/month-availability',
  providerMonthAvailabilityController.index,
);
providersRoutes.get(
  '/:provider_id/day-availability',
  providerDayAvailabilityController.index,
);

export default providersRoutes;
