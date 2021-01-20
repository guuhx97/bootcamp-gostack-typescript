import { Router } from 'express';

import { celebrate, Segments, Joi } from 'celebrate';
import ProfileController from '../controllers/ProfileController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const profileRoutes = Router();
const profileController = new ProfileController();

profileRoutes.use(ensureAuthenticated);
profileRoutes.put('/', profileController.update);
profileRoutes.get(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      emaik: Joi.string().email().required(),
      old_password: Joi.string(),
      password: Joi.string(),
      password_confirmation: Joi.string().valid(Joi.ref('password')),
    },
  }),
  profileController.show,
);

export default profileRoutes;
