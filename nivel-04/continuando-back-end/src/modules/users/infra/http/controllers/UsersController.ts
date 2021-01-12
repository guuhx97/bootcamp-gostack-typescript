import { Response, Request } from 'express';
import CreateUserService from '@modules/users/services/CreateUserService';
import { container } from 'tsyringe';

export default class UsersController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;
    const createUser = container.resolve(CreateUserService);
    const { id, updated_at, created_at } = await createUser.execute({
      name,
      email,
      password,
    });

    return res.json({ id, name, email, updated_at, created_at });
  }
}
