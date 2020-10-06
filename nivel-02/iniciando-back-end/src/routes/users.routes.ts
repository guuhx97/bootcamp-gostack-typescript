import { Router, Response, Request } from 'express';
import CreateUserService from '../service/CreateUserService';

const usersRouter = Router();

usersRouter.post('/', async (request: Request, response: Response) => {
  try {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    const { id, updated_at, created_at } = await createUser.execute({
      name,
      email,
      password,
    });

    return response.json({ id, name, email, updated_at, created_at });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default usersRouter;
