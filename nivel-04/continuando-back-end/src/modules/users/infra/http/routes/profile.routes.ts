import { Router } from 'express';

import ProfileController from '../controllers/ProfileController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const profileRoutes = Router();
const profileController = new ProfileController();

profileRoutes.use(ensureAuthenticated);
profileRoutes.put('/', profileController.update);
profileRoutes.get('/', profileController.show);

export default profileRoutes;
