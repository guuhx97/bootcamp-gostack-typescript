import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProvidersControllers from '../controllers/ProvidersController';

const providersRoutes = Router();
const providersControllers = new ProvidersControllers();

providersRoutes.use(ensureAuthenticated);

providersRoutes.get('/', providersControllers.index);

export default providersRoutes;
